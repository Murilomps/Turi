var database = require("../database/config");

function buscarUltimasMedidas(idComputador, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP (7) id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel FROM Leitura where fk_computador = ${idComputador} order by id desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select idCaptura, fkSensor, temperatura, umidade, momento 
        from captura 
        where fkSensor = 1 limit ${limite_linhas};`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP (1) idCaptura, fkSensor, temperatura, umidade, momento FROM Captura where fkSensor = 1 order by idCaptura desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select temperatura, umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento, 
        fkSensor from captura where fkSensor = 1 
             order by idCaptura desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
