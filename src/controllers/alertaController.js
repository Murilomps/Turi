var alertaModel = require("../models/alertaModel");

function contarChamados(req, res) {

    const limite_linhas = 7;

    var idComputador = req.params.idComputador;

    console.log(`Recuperando os últimos ${limite_linhas} chamados.`);

    alertaModel.contarChamados(idComputador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos chamados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function contarChamadosEmTempoReal(req, res) {

    var idComputador = req.params.idComputador;

    console.log(`Recuperando chamados em tempo real`);

    alertaModel.contarChamadosEmTempoReal(idComputador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos chamados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    contarChamados,
    contarChamadosEmTempoReal

}