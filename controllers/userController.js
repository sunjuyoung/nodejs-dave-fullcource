import User from "../models/User.js";
import Note from "../models/Note.js";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

/**
 * @dec  all users
 * @route GET /users
 */
const getAllUsers = asyncHandler(async (req,res)=>{
   const users = await User.find().select('-password').lean()
   if(!users?.length){
        return res.status(400).json({message:"no users"})
   }
   res.json(users)

})

/**
 * @dec  create users
 * @route POST /users
 */
const createUser = asyncHandler(async (req,res)=>{
    const{username,password,roles} = req.body
    //confirm data
    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({message:"error fields input"})
    }

    //check dupulicate
    const duplicate = await User.findOne({username}).lean().exec()
    /**
     *  find, findOne, findById, findOneAndUpdate 등의 메서드의 리턴값은 Query
     *  Mongoose Query는 프로미스가 아니고, then을 사용할 수 있는 일종의 유사 프로미스라고 할 수 있다.
     * exec()을 사용하면 유사 프로미스가 아닌 온전한 프로미스를 반환값으로 얻을 수 있으며
     * 에러가 났을 때 stack trace에 오류가 발생한 코드의 위치가 포함되기 때문에 공식 문서에서도 exec()을 사용할 것을 권장하고 있다.
     */
    if(duplicate){
        return res.status(400).json({message:"already exist username"})
    }
    //hash password,
    const hashPwd = await bcrypt.hash(password,10) //salt rounds

    const userObject = {username,password:hashPwd,roles}

    const newUser = await User.create(userObject)
    if(newUser){
        return res.status(201).json({message:"create newUser"})
    }else{
        return res.status(400).json({message:"faild create user"})
    }
})

/**
 * @dec  update users
 * @route PUT /users
 */
const updateUser = asyncHandler(async (req,res)=>{
    const{id,username,roles,active,password} = req.body
    if(!id || !username || !Array.isArray(roles) || typeof active !== 'boolean'){
        return res.status(400).json({message:"erro field input"})
    }
    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message:"not found user"})   
    }

    //check username duplicated
    const duplicate = await User.findOne({username}).lean().exec()
    if(duplicate._id.toString() !== id){
        return res.status(400).json({message:"already exist username"})   
    }

    //update
    user.username = username;
    user.roles = roles;
    user.active = active
    if(password){
        user.password = await bcrypt.hash(password,10)
    }
  

    const updatedUser = await user.save()
    res.json({message:`${updatedUser.username} updated` })
    
})

/**
 * @dec  delete users
 * @route DLETE /users
 */
const deleteUser = asyncHandler(async (req,res)=>{
    const {id} = req.body;
    if(!id){
        return res.status(400).json({message:"id required!"})   
    }

    //note delete
    // const notes = Note.findOne({user:id}).lean().exec()
    // if(notes?.length){

    // }

    const user = await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:"user not found"})   
    }
    const result = await user.deleteOne()
    res.json({message:`username : ${result.username} deleted`})
    
    
})

export {getAllUsers,updateUser,deleteUser,createUser};