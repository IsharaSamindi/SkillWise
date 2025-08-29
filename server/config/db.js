const { Pool } = require('pg');
const pool = new Pool({
  user: 'your_pg_user',
  host: 'localhost',
  database: 'skillwise',
  password: 'your_pg_password',
  port: 5432,
});
module.exports = pool;