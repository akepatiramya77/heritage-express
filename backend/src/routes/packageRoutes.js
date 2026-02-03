import express from 'express'
import db from '../config/db.js'

const router = express.Router()

// 🔹 Get all active packages (User side)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM packages WHERE active = true ORDER BY id'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// 🔹 Admin: Add package
router.post('/admin/packages', async (req, res) => {
  try {
    const { name, running_day, duration } = req.body

    const result = await db.query(
      `INSERT INTO packages (name, running_day, duration, active)
       VALUES ($1, $2, $3, true)
       RETURNING *`,
      [name, running_day, duration]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// 🔹 Admin: Delete package
router.delete('/admin/packages/:id', async (req, res) => {
  try {
    await db.query(
      'DELETE FROM packages WHERE id = $1',
      [req.params.id]
    )
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})
// 🔹 Admin: Update package
router.put('/admin/packages/:id', async (req, res) => {
  try {
    const { name, running_day, duration } = req.body

    const result = await db.query(
      `UPDATE packages
       SET name=$1, running_day=$2, duration=$3
       WHERE id=$4
       RETURNING *`,
      [name, running_day, duration, req.params.id]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})
// 🔹 Get routes for a package
router.get('/:id/routes', async (req, res) => {
  const result = await db.query(
    `SELECT * FROM package_routes
     WHERE package_id = $1
     ORDER BY day_no, id`,
    [req.params.id]
  )
  res.json(result.rows)
})

// 🔹 Admin: Add route stop
router.post('/admin/packages/:id/routes', async (req, res) => {
  const { day_no, direction, station, arrival, departure } = req.body

  const result = await db.query(
    `INSERT INTO package_routes
     (package_id, day_no, direction, station, arrival, departure)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [req.params.id, day_no, direction, station, arrival, departure]
  )

  res.json(result.rows[0])
})

// 🔹 Admin: Delete route stop
router.delete('/admin/routes/:routeId', async (req, res) => {
  await db.query(
    'DELETE FROM package_routes WHERE id=$1',
    [req.params.routeId]
  )
  res.json({ success: true })
})



export default router   // ✅ THIS IS THE FIX
