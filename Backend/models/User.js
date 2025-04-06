const db = require('../config/db');

const createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) reject(err);
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

module.exports = { createUser, findUserByEmail };
