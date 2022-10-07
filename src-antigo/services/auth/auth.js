import passport from 'passport';
import * as PassportLocal from 'passport-local';
import Usuario from '../../model/Usuario.js';
import * as PassportCookie from 'passport-cookie';
import jsonwebtoken from 'jsonwebtoken';
import { compare } from 'bcrypt';
// import Blacklist from '../../database/redis/blacklist.js';
import { InvalidArgumentError, InternalServerError } from '../err/err.js';

class AutenticacaoLogin {

    #email;
    #senhaInput;
    #infoUsuario;

    constructor(email, senhaInput)  {
        
        this.#email = email;
        this.#senhaInput = senhaInput;
    }

    get infoUsuario () {

        return this.#infoUsuario;
    }

    async validar () {
        
        const usuario = await Usuario.buscarUsuarioPorEmail(this.#email);
        this.#infoUsuario = usuario[0];
        this.#verificarSeUsuarioExiste(this.#infoUsuario); 
        await this.#validarSenhaUsuario(this.#senhaInput, this.#infoUsuario.senha);
    }

    #verificarSeUsuarioExiste (usuarioExiste) {
        
        if(!usuarioExiste)
            throw new InvalidArgumentError('Usuario inválido');
    };

    async #validarSenhaUsuario (senha, senhaHash) {

        const senhaValida = await compare(senha, senhaHash)

        if(!senhaValida)
            throw new InvalidArgumentError('Usuario inválido');
    }
}

class AutenticacaoToken {

    #token;
    #payload;

    constructor(token) {
        
        this.#token = token;
    }

    get payload() {
        
        return this.#payload;
    }

    async validarToken () {

        // const tokenEstaNaBlackList = await Blacklist.tokenEstaNaBlackList(this.#token);
        const payload = jsonwebtoken.verify(this.#token, process.env.CHAVE_JWT);
        this.#payload = payload; 

    //     if(!this.#token || tokenEstaNaBlackList)
    //         throw new InvalidArgumentError('Token inválido');
    }
}

passport.use(
    new PassportLocal.Strategy({
        
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    },async(email, senhaInput, done) => {

            try {
 
                    const usuario = new AutenticacaoLogin(email, senhaInput);
                    await usuario.validar()
                    done(null, usuario.infoUsuario);           
            }

            catch(erro) {

                    done(erro);
            }
        }
    )
)

passport.use(
    new PassportCookie.Strategy({},
    async (token, done) => {
    
        try {
            
            const autenticacaoToken = new AutenticacaoToken(token);
            await autenticacaoToken.validarToken();
            const usuario = await Usuario.buscarUsuarioPorId(autenticacaoToken.payload.id_usuario);

            done(null, usuario, {token: token});     
        }

        catch (erro) {

            done(erro);
        }
    })    
)