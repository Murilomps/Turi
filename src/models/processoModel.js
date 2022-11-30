var database = require("../database/config");

function buscarUltimosProcessos(idComputador) {

    let instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP (3) id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel FROM Leitura where fk_computador = ${idComputador} order by id desc;`;

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

function buscarProcessosEmTempoReal(idComputador) {

    let instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP (1) id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel FROM Leitura where fk_computador = ${idComputador} order by id desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel FROM Leitura 
         where fk_computador = ${idComputador} order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarProcessosEstaticos(idComputador) {

    let instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT memoria_total, disco_total FROM computador where id = ${idComputador};`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT memoria_total, disco_total FROM computador where id = ${idComputador};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosProcessos,
    buscarProcessosEmTempoReal,
    buscarProcessosEstaticos
}
