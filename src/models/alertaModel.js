var database = require("../database/config");

function contarOciosidade(respostaOcio) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(respostaOcio.id) as quantidadeOcio from respostaOcio where resposta = ${respostaOcio};`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select count(respostaOcio.id) as quantidadeOcio from [dbo].[respostaOcio] where resposta = ${respostaOcio};`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarChamados(idComputador) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(alerta.id) as quantidade, CAST( GETDATE() AS Date ) as diaData from Alerta Join leitura on fk_leitura = leitura.id where fk_computador = ${idComputador} and CAST(data_hora as Date) = CAST( GETDATE() AS Date );`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select count(alerta.id) as quantidade, CAST( GETDATE() AS Date ) as diaData from Alerta Join leitura on fk_leitura = leitura.id where fk_computador = ${idComputador} and CAST(data_hora as Date) = CAST( GETDATE() AS Date );`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// MODEL BRUNA

function contarComponente(idComputador) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(alerta.id) as quantidade, componente from Alerta Join leitura on fk_leitura = leitura.id where fk_computador = ${idComputador} and CAST(data_hora as Date) = CAST( GETDATE() AS Date ) group by componente`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select count(alerta.id) as quantidade, componente from Alerta Join leitura on fk_leitura = leitura.id where fk_computador = ${idComputador} and CAST(data_hora as Date) = CAST( GETDATE() AS Date ) group by componente`;

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
        instrucaoSql = ``
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirAlerta(id_leitura,componente) {
    console.log("ACESSEI O ALERTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserirAlerta():", id_leitura,componente);

    var instrucao = `
        INSERT INTO alerta (fk_leitura,componente) VALUES ('${id_leitura}', '${componente}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contarSat(idEmpresa) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP (6) count(alerta.id) as quantidade, CAST(data_hora AS DATE) as DataDia FROM alerta join leitura on fk_leitura = leitura.id join computador on fk_computador = computador.id where fk_empresa = ${idEmpresa} group by CAST(data_hora AS DATE) order by CAST(data_hora AS DATE) desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `SELECT count(alerta.id) as quantidade, CAST(data_hora AS DATE) as DataDia FROM alerta join leitura on fk_leitura = leitura.id join computador on fk_computador = computador.id where fk_empresa = ${idEmpresa} group by CAST(data_hora AS DATE) order by CAST(data_hora AS DATE)`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    contarChamados,
    contarChamadosEmTempoReal,
    inserirAlerta,
    contarSat,
    contarComponente, contarOciosidade
}
