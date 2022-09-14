import usuario from './usuarioRoutes.js';
import pages from './pageRoutes.js';

const routes = app => {

    app.use(
        usuario,
        pages
    )
}

export default routes;