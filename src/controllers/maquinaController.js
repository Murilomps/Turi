var maquinaModel = require("../models/maquinaModel")

function SearchMac(req, res) {


    console.log(`Buscando maquinas da empresa`);

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando ultimos dados da maquina ${idMaquina}`)

    maquinaModel.SearchMac(idMaquina).then(function (resultado) {
        if (resultado.lenght > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
    });
}

module.exports = {
    SearchMac
}