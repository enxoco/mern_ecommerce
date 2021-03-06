import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
const app = express()

app.use(express.json())
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

connectDB()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//Register middleware for error/route handling
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.green.bold
  )
)
