var processoModel = require("../models/processoModel");

function buscarUltimosProcessos(req, res) {

    var idComputador = req.params.idComputador;

    console.log(`Recuperando as ultimas medidas`);

    processoModel.buscarUltimosProcessos(idComputador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarProcessosEmTempoReal(req, res) {

    var idComputador = req.params.idComputador;

    console.log(`Recuperando medidas em tempo real`);

    processoModel.buscarProcessosEmTempoReal(idComputador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarProcessosEstaticos(req, res) {

    var idComputador = req.params.idComputador;

    console.log(`Recuperando medidas estáticas.`);

    processoModel.buscarProcessosEstaticos(idComputador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarUltimosProcessos,
    buscarProcessosEmTempoReal,
    buscarProcessosEstaticos
}