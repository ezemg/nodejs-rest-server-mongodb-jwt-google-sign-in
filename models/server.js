const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      categorias: '/api/categorias',
      productos: '/api/productos',
    };

    // Conectar a DB
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio public
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/authPathRoutes.js'));

    this.app.use(this.paths.usuarios, require('../routes/usuariosRoutes.js'));

    this.app.use(
      this.paths.categorias,
      require('../routes/categoriasRoutes.js')
    );

    this.app.use(this.paths.productos, require('../routes/productosRoutes.js'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}

module.exports = Server;
