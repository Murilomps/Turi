import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController.js';
import MiddlewareAuth from '../services/middleware/middlewareAuth.js';

const router = Router();

router
    .route('/cadastrar-usuario')
    .post(UsuarioController.cadastraUsuario);


router
    .route('/logar-usuario')
    .post(MiddlewareAuth.autenticarUsuarioLogin, UsuarioController.logar);

router
    .route('/deslogar-usuario')
    .post(MiddlewareAuth.autenticarTokenUsuario, UsuarioController.deslogar);

export default router;