const express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController")

router.get("/empresa/:idMaquina", function (req, res) {
    maquinaController.SearchMac(req, res);
})

module.exports = router