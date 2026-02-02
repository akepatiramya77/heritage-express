const db = require('../config/db');

// GET /api/packages
exports.getAllPackages = async (req, res) => {
  const result = await db.query(
    'SELECT id, name, running_day, duration FROM packages ORDER BY id'
  );
  res.json(result.rows);
};

// GET /api/packages/:id
exports.getPackageById = async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    'SELECT id, name, running_day, duration FROM packages WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: 'Package not found' });
  }

  res.json(result.rows[0]);
};

// GET /api/packages/:id/routes
exports.getPackageRoutes = async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    `
    SELECT direction, station, arrival, departure, day_no
    FROM routes
    WHERE package_id = $1
    ORDER BY direction, day_no
    `,
    [id]
  );

  res.json(result.rows);
};
