import express from 'express'
import db from '../config/db.js'

const router = express.Router()

// 🔎 Test route (VERY IMPORTANT)
router.get('/test', (req, res) => {
  res.send('Admin routes working')
})

// -------- CLASS FARES --------
router.get('/packages/:id/fares', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM class_fares WHERE package_id = $1',
    [req.params.id]
  )
  res.json(result.rows)
})

// -------- ADD ONS --------
router.get('/packages/:id/addons', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM addons WHERE package_id = $1',
    [req.params.id]
  )
  res.json(result.rows)
})

export default router
