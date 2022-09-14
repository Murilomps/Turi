import passport from "passport";

class MiddlewareAuth {

    static autenticarUsuarioLogin = (req, res, next) => {
        
        passport.authenticate(
            
            'local',
            { session: false },
            (erro, usuario, info) => {
                
                if(erro)
                    return res.status(401).send();

                req.user = usuario;
                return next();
            }
        )(req, res, next)
    }

    static autenticarTokenUsuario = (req, res, next) => {

        passport.authenticate(

            'cookie',
            { session: false },
            (erro, usuario, info) => {
                
                if(erro || !usuario)
                    return res.status(401).send();

                req.token = info.token;
                req.user = usuario;
                return next();
            }
        )(req, res, next)
    }
}

export default MiddlewareAuth;