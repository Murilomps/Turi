import { Router } from "express";
import MiddlewareAuth from '../services/middleware/middlewareAuth.js';


const router = Router();

router
    .route('/perfil')
    .get(MiddlewareAuth.autenticarTokenUsuario, (req,res) => res.json({teste: "teste"}));

export default router;