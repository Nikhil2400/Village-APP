const db = require('../config/db');

const Farmer = {
  getAll: (callback) => {
    db.query('SELECT * FROM farmers', callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO farmers SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE farmers SET ? WHERE id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM farmers WHERE id = ?', [id], callback);
  }
};

module.exports = Farmer;
