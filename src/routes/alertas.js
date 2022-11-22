var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/ultimas/:idComputador", function (req, res) {
    alertaController.contarChamados(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    alertaController.contarChamadosEmTempoReal(req, res);
})

module.exports = router;