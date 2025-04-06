const GramSabha = require("../models/GramSabhaModel");

exports.getAllGramSabha = (req, res) => {
    GramSabha.getAll((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.addGramSabha = (req, res) => {
    const { name, date, time, description } = req.body;
    const data = { name, date, time, description };
    GramSabha.add(data, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Gram Sabha Added", id: result.insertId });
    });
};

exports.updateGramSabha = (req, res) => {
    const { name, date, time, description } = req.body;
    GramSabha.update(req.params.id, { name, date, time, description }, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Gram Sabha Updated" });
    });
};

exports.deleteGramSabha = (req, res) => {
    GramSabha.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Gram Sabha Deleted" });
    });
};
