import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../config/db.js'

const router = express.Router()

// ✅ LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await db.query(
      'SELECT id, name, email, password, role FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      'SECRET_KEY',
      { expiresIn: '1d' }
    )

    // 🔥 THIS MUST BE JSON — ALWAYS
    return res.status(200).json({
      token,
      role: user.role,
      name: user.name
    })
  } catch (err) {
    console.error('LOGIN ERROR:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// ✅ REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existing = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)

    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)',
      [name, email, hashed, role]
    )

    return res.status(201).json({ message: 'Registered successfully' })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default router
