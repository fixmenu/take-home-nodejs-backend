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
    }).catch(err => {
      console.log(err)
      return next(err);
    })
    req.user = user;
    
    next();
  })


}
