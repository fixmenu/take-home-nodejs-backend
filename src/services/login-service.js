import bcrypt from "bcrypt";
import {User} from "../models/users";
import {tokenSecret} from "../settings";
import * as jwt from "jsonwebtoken";

export const signIn = async (req,res) => {
  const {username,password} = req.body;
  
  const user = await User.findOne({
    where: {
      username: username
    }
  })
  
  if(!user) {
    return res.status(400).send({error: 'Invalid password or username'});
  }
  
  try{
    await comparePassword(password,user.password);
    const token = jwt.sign({userId: user.userId},tokenSecret);
    const role = user.role;
    return res.status(200).send({token,role});
  }catch (e){
    return res.status(422).send({error: 'Invalid password or username'});
  }
}

function comparePassword(password,userPassword) {
  return new Promise((resolve,reject) => {
    bcrypt.compare(password,userPassword,(err,isMatch) => {
      if(err) {
        return reject(err);
      }

      if(!isMatch){
        return reject(err);
      }

      resolve(true);
    })
  })
}
