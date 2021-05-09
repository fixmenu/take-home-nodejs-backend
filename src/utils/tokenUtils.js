import jwt from 'jsonwebtoken';
import {tokenSecret} from "../settings";

export const generate = (userId) => {
  return jwt.sign(userId, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

export const verify = (req,res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if(token == null) return res.sendStatus(401);
  
  jwt.verify(token,tokenSecret, (err, user) => {
    console.log(err);
    if(err) return res.sendStatus(403);
    
    req.user = user
  })
}
