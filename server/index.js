import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnect from './config/db.js'
const app = express()
const port = process.env.PORT || 8080
dbConnect()
app.listen(port, () => {
  console.log(`server is listen at ${port}`)
})
