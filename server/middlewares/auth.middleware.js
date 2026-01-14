import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.jwt

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Please login',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY)

    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired token',
    })
  }
}
