import express from 'express'
import pool from '../config/db.js'

const router = express.Router()

/**
 * GET all packages
 * URL: /api/packages
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM packages ORDER BY id'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch packages' })
  }
})

/**
 * GET single package by ID
 * URL: /api/packages/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM packages WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Package not found' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch package' })
  }
})

/**
 * GET routes for a package
 * URL: /api/packages/:id/routes
 */
router.get('/:id/routes', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      `
      SELECT *
      FROM package_routes
      WHERE package_id = $1
      ORDER BY day_no, direction
      `,
      [id]
    )

    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch routes' })
  }
})

/**
 * ✅ THIS IS THE IMPORTANT FIX
 * DEFAULT EXPORT (matches app.js import)
 */
export default router
