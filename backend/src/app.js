import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import packageRoutes from './routes/packageRoutes.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/packages', packageRoutes)

app.listen(5000, () => {
  console.log('✅ Backend running on http://localhost:5000')
})
