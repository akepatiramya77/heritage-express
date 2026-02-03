import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import packageRoutes from './routes/packageRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send('Heritage Express API Running')
})

app.listen(5000, () => {
  console.log('✅ Backend running on http://localhost:5000')
})
