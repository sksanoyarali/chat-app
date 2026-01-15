import express from 'express'
import { getUserInfo, login, signup } from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const authRouter = express.Router()
authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/user-info', verifyToken, getUserInfo)
export default authRouter
