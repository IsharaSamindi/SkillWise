const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async create({ username, password, role }) {
    const hashed = await bcrypt.hash(password, 10);
    const res = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [username, hashed, role]
    );
    return res.rows[0];
  }

  static async findByUsername(username) {
    const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return res.rows[0];
  }
}

module.exports = User;