var database = require("../database/config");

function buscarUltimasMedidas(idComputador, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP (7) id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel FROM Leitura where fk_computador = ${idComputador} order by id desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select id, fk_computador, data_hora, cpu_porcentagem, disco_usado,memoria_usada,memoria_disponivel
        from Leitura
        where fk_computador = ${idComputador} order by id desc limit 7;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idComputador) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP (1) id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel FROM Leitura where fk_computador = ${idComputador} order by id desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel
         FROM Leitura 
         where fk_computador = ${idComputador} order by id desc limit 1`;
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
