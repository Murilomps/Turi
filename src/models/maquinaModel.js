var database = require("../database/config")

    function SearchMac(idMaquina) {

        instrucaoSql = ''

        if(process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql = `select memoria_total, disco_total from [dbo].[computador] where fk_empresa = 1 and id = ${idMaquina};`

        } else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

            instrucaoSql = `select memoria_total, disco_total from computador where fk_empresa = 1 and id =  ${idMaquina}`
        } else {
            console.log("\nO AMBIENTE (producao ou desenvolvimento) NÃO FOI DEFINIDO EM app.js\n")
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql)
    }

module.exports = {
    SearchMac
}