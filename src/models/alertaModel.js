var database = require("../database/config");

function contarChamados(idComputador) {

    instrucaoSql = 'select count(id) from Alerta Join computador on fk_computador = ${idComputador}';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select count(alerta.id) from Alerta Join computador on fk_computador = ${idComputador}
        and data_hora =  `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarChamadosEmTempoReal(idComputador) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP (1) id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel,temperatura,temperaturaMax FROM Leitura where fk_computador = ${idComputador} order by id desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT id, fk_computador, data_hora, cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel, temperatura,temperaturaMax
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
    contarChamados,
    contarChamadosEmTempoReal
}
