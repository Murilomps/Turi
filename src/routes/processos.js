var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");

router.get("/ultimos/:idComputador", function (req, res) {
    processoController.buscarUltimosProcessos(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    processoController.buscarProcessosEmTempoReal(req, res);
})

module.exports = router;