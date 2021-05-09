import {User} from "../models/users";
import jwt from "jsonwebtoken";
import {tokenSecret} from "../settings";
import bcrypt from "bcrypt";
import {Op} from "sequelize";

export const userService = {
  createUser:createUser,
  getUsers:getUsers,
  updateUser:updateUser
}

async function createUser(req) {
  let error;
  try{  
    const {body} = req;
    const isExist = await User.count({where: {username:body.username}});
    
    if (isExist) {
      error = {
        message: "Username exists",
        status: 400
      }
      return {error};
    }

    const user = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
      role: body.role
    }).catch(err => error = {
      message: "Internal Error",
      status: 500
    });

    const token = jwt.sign(user.userId,tokenSecret);

    return {token};
  } catch (err) {
    console.log(err);
    error = {
      message: "Internal Error",
      status: 500
    }
    return {error};
  }
}

async function getUsers(req) {
  let error;
  const {body} = req;
  const user = await User.findAll({
    attributes:{
      exclude:'password'
    },
    where:{
      [Op.or]: [
        {
          username: {
            [Op.like]: `%${body.value}%`
          }
        },
        {
          email:{
            [Op.like]: `%${body.value}%`
          }
        }
      ],
      [Op.and]: [
        {
          role:{
          [Op.not]: "A"
          }
        }
      ]
    }
  }).catch(err => {
    console.log(err);
    error = {
      message: "Internal Error",
      status: 500
    }
    
    return {error};
  });
  
  return {user};
}


async function updateUser(req) {
  const user = req.body;
  console.log(user);
  
  const userModel = await User.update({
    ...user
  },{
    where:{
      userId:user.userId
    }
  });
  
  return userModel;
}
