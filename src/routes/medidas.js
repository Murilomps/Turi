var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idComputador", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})



router.get("/")

module.exports = router;