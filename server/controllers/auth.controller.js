import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge })
}
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password in required',
        success: false,
      })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exist',
        success: false,
      })
    }

    const user = await User.create({ email, password })
    const jwtToken = createToken(email, user.id)

    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      maxAge,
      secure: false,
      sameSite: 'lax',
    })
    return res.status(200).json({
      success: true,
      message: 'user registered successfully',
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password in required',
        success: false,
      })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User dont exist with this email',
      })
    }
    const isMatched = await bcrypt.compare(password, user.password)

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect',
      })
    }
    const jwtToken = createToken(email, user.id)

    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      maxAge,
      secure: false,
      sameSite: 'lax',
    })
    return res.status(200).json({
      success: true,
      message: 'user logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
        color: user.color,
      },
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId
    const userData = await User.findById(userId).select('-password')
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
      color: userData.color,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Internal Server error',
    })
  }
}
