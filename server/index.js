import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnect from './config/db.js'
import authRouter from './routes/auth.routes.js'
const app = express()
const port = process.env.PORT || 8080

dbConnect()

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
)
app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.listen(port, () => {
  console.log(`server is listen at ${port}`)
})
