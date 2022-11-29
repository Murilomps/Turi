var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/ultimas/:idComputador", function (req, res) {
    alertaController.contarChamados(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    alertaController.contarChamadosEmTempoReal(req, res);
})

router.post("/inserirAlerta",function(req,res) {
    alertaController.inserirAlerta(req,res);
})

module.exports = router;