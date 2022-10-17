var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/autenticarUsuario", function (req, res) {
    usuarioController.entrarUsuario(req, res);
});

router.post("/autenticarEmpresa", function (req, res) {
    usuarioController.entrarEmpresa(req, res);
});

module.exports = router;