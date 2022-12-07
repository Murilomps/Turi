var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/ultimas/:idComputador", function (req, res) {
    alertaController.contarChamados(req, res);
});

// ROTA BRUNA 

router.get("/componente/:idComputador", function (req, res) {
    alertaController.contarComponente(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    alertaController.contarChamadosEmTempoReal(req, res);
})

router.post("/inserirAlerta",function(req,res) {
    alertaController.inserirAlerta(req,res);
})

router.get("/contarSat/:idEmpresa",function(req,res) {
    alertaController.contarSat(req,res);
})

router.get("/contarOciosidade/:respostaOcio",function(req,res) {
    alertaController.contarOciosidade(req,res);
})

module.exports = router;