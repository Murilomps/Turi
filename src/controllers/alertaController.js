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

// CONTROLLER BRUNA

function contarComponente(req, res) {

    // const limite_linhas = 7;

    var idComputador = req.params.idComputador;

    console.log(`Recuperando os últimos chamados.`);

    alertaModel.contarComponente(idComputador).then(function (resultado) {
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

function inserirAlerta(req, res) {
    var id_leitura = req.body.idServer;
    var componente = req.body.componenteServer;

    // Faça as validações dos valores
    if (id_leitura == undefined) {
        res.status(400).send("O id está undefined!");
    } else if (componente == undefined) {
        res.status(400).send("O componente está undefined!");
    }
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        alertaModel.inserirAlerta(id_leitura,componente)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao inserir o alerta! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    function contarSat(req, res) {

        var idEmpresa = req.params.idEmpresa;
    
        console.log(`Recuperando chamados em tempo real`);
    
        alertaModel.contarSat(idEmpresa).then(function (resultado) {
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
    contarChamadosEmTempoReal,
    inserirAlerta,
    contarSat,
    contarComponente
}