const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createAdmin = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const findAdminByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM admins WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) reject(err);
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

module.exports = { createAdmin, findAdminByEmail };
