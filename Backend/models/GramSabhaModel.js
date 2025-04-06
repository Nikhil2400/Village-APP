const db = require("../config/db");

const GramSabha = {
    getAll: callback => db.query("SELECT * FROM gram_sabha", callback),
    getById: (id, callback) => db.query("SELECT * FROM gram_sabha WHERE id = ?", [id], callback),
    add: (data, callback) => db.query("INSERT INTO gram_sabha SET ?", data, callback),
    update: (id, data, callback) => db.query("UPDATE gram_sabha SET ? WHERE id = ?", [data, id], callback),
    delete: (id, callback) => db.query("DELETE FROM gram_sabha WHERE id = ?", [id], callback)
};

module.exports = GramSabha;
