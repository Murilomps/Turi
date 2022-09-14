import BancoDeDados from "../database/sql/configDatabase.js";
import bcrypt from 'bcrypt';

class Usuario {

    #id;
    #nome;
    #sobrenome;
    #email;
    #senhaHash;

    constructor(usuario) {

        this.#id = usuario[0].id_usuario;
        this.#nome = usuario[0].nome;
        this.#sobrenome = usuario[0].sobrenome;
        this.#email = usuario[0].email;
        this.#senhaHash = Usuario.gerarSenhaHash(usuario[0].senhaHash);
    }

    get id() {
        
        return this.#id;
    }

    get nome() {
        
        return this.#nome; 
    }

    get sobrenome() {

        return this.#sobrenome;
    }

    get email() {

        return this.#email;
    }

    get senha() {

        return this.#senhaHash;
    }


    static async verificarSeEmailJaFoiUtilizado(email) {

        try {
                const query = `
                    SELECT count(id_usuario) AS quantidade_usuarios
                        FROM usuario_sprint
                            WHERE email = '${email}'
                `
                const resultado_query = await BancoDeDados.ExecutarQuery(query);
        
                if(resultado_query[0].quantidade_usuarios > 0)
                    return true;
                
                return false;
        }

        catch (erro) {

                console.log(erro);
        }
    }

    static async cadastrarUsuario(usuario) {

        try {

                const query = `
                    INSERT INTO usuario_sprint (nome, sobrenome, email, senha) VALUES
                        ('${usuario.nome}', '${usuario.sobrenome}', '${usuario.email}', '${await this.gerarSenhaHash(usuario.senha)}');
                `

                return await BancoDeDados.ExecutarQuery(query);
        }

        catch (erro){

            console.log(erro)
        }
    }

    static gerarSenhaHash(senha) {

        const custoHash = 12;

        return bcrypt.hash(senha, custoHash);
    }

    static buscarUsuarioPorEmail(email) {

        const query = `
            SELECT * 
                FROM usuario_sprint
                    WHERE email = '${email}'
        `;

        return BancoDeDados.ExecutarQuery(query);
    }

    static buscarUsuarioPorId(idUsuario) {

        const query = `
            SELECT *
                FROM usuario_sprint
                    WHERE id_usuario = ${idUsuario}
        `;

        return BancoDeDados.ExecutarQuery(query);
    }

}

export default Usuario;