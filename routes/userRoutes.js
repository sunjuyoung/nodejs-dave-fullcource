import express from 'express'
import path from 'path'
const router = express.Router()
import {getAllUsers,updateUser,deleteUser,createUser} from '../controllers/userController.js'

router.route('/')
.get(getAllUsers)
.post(createUser)
.patch(updateUser)
.delete(deleteUser)

export default router