import {tokenSecret} from "../settings";
import * as jwt from "jsonwebtoken";
import {User} from "../models/users";

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).send({error: 'You must login'});
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, tokenSecret, async (err, payload) => {
    if (err) {
      return res.status(401).send({
        error: 'you must log in.'
      });
    }
    const user = await User.findOne({
      where:{
        userId:payload.userId
      }
    }).catch(error => {
      console.log(error)
      next(error);
    })

    if(user != null) {
      if(!user.role || user.role !== 'A'){
        return res.status(403).send({
          error: 'unauthorized'
        });
      }

      req.user = user;

      next();
    }else{
      return res.status(403).send({
        error: 'User not found. Please Sign up.'
      });
    }
   
  
  })


}
