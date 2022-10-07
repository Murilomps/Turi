var database = require("../database/config");

function buscarUltimasMedidas(caracteristica) {

    instrucaoSql = ''

    /* if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        CONVERT(varchar, momento, 108) as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else */ if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (caracteristica == 1) {
            instrucaoSql = `SELECT olho, count(idVoto) FROM Voto GROUP BY olho ORDER BY olho;`;
        } else if (caracteristica == 2){
            instrucaoSql = `SELECT boca, count(idVoto) FROM Voto GROUP BY boca ORDER BY boca;`;
        } else if (caracteristica == 3){
            instrucaoSql = `SELECT anatomia, count(idVoto) FROM Voto GROUP BY anatomia ORDER BY anatomia;`;
        } else {
            instrucaoSql = `SELECT cor, count(idVoto) FROM Voto GROUP BY cor ORDER BY cor;`;
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function buscarMedidasEmTempoReal(idAquario) {

//     instrucaoSql = ''

//     /* if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top 1
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         CONVERT(varchar, momento, 108) as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idAquario} 
//                     order by id desc`;

//     } else */ if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idAquario} 
//                     order by id desc limit 1`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


module.exports = {
    buscarUltimasMedidas,
    // buscarMedidasEmTempoReal
}
