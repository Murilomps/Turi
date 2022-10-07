import mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

class BancoDeDados {
   
    static configuracaoBanco = {
        user: process.env.USER_DATABASE,
        password: process.env.PASSWORD_DATABASE,
        database: process.env.NAME_DATABASE,
        server: process.env.NAME_SERVER,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: true
        }
    };

    static async ConectarBanco(config) {
        
        try {

            return await mssql.connect(config);
        }
        catch (erro) {
            
            console.log("Houve um erro na conexão com o banco: ", erro);
        }
    }   
 
    static async ExecutarQuery(instrucao) {
        
        return new Promise( async (resolve, reject) => {

            try {
                await this.ConectarBanco(this.configuracaoBanco);
                const result = await mssql.query(instrucao);
                console.log(result.recordset);
                resolve(result.recordset);
            }
            catch (erro) {
                console.log(erro);
                reject(erro);
            }
        })
    }
}

export default BancoDeDados;