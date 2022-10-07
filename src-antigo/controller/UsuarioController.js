import Usuario from '../model/Usuario.js';
import jsonwebtoken from 'jsonwebtoken';
// import Blacklist from '../database/redis/blacklist.js';
// import { blacklist } from '../database/redis/configRedis.js';

class UsuarioController {

    static cadastraUsuario = async (req, res) => {

        try {

                const usuario_req = req.body;    
                const emailJaFoiUtilizado = await Usuario.verificarSeEmailJaFoiUtilizado(usuario_req.email);
                

                if(emailJaFoiUtilizado)
                    return res.json({mensagem: "Email já está sendo utilizado."});


                await Usuario.cadastrarUsuario(usuario_req);    
                res.json({mensagem: `Usuario ${usuario_req.nome} ${usuario_req.sobrenome} cadastrado com sucesso`});
        }
        catch (erro) {
            
                console.log(erro);
                res.status(401).json({"erro": erro});
        }
    }

    static logar = async (req, res) => {

        const token = this.criarToken(req.user);
        
        res.set('Set-Cookie', `token=${token}; Path=/`);
        res.send("Usuario Logado");
    }

    static deslogar = async (req, res) => {
        // Adicionar um modo de limpar o token

        
        // Blacklist.adicionarTokenNaBlackList(req.token);
        // res.status(201).json({ mensagem: "Usuario deslogado" });
    }

    static criarToken(usuario) {

        const payload = {
            id_usuario: usuario.id_usuario
        }
        const token = jsonwebtoken.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' });
        
        return token;
    }

}

export default UsuarioController;