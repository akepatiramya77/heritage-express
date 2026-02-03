import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123',
  database: 'heritage_express',
  port: 5432
})

export default pool
