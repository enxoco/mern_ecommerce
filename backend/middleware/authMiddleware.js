import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  const { authorization } = req.headers

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const { id } = decoded
      req.user = await User.findById(id).select('-password')
      next()
    } catch (error) {
      console.error(`${error}`.red.bold)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }
