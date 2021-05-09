import {userService} from "../services/user-service";

export const createNewUser = async (req,res) => {   
   const {error,token} = await userService.createUser(req);
   
   if(error != null) {
     res.status(error.status).json({error});
   }else{
     res.status(200).json({token})
   }
}

export const getUsersByQuery = async (req,res) => {
  const {error,user} = await userService.getUsers(req);
  
  if(error != null) {
    res.status(error.status).json({error});
  }else{
    res.status(200).json({user});
  }
}

export const updateUser = async (req,res) => {
  const user = await userService.updateUser(req);
  res.status(200).json({user}); 
}
