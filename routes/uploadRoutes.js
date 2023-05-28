const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos.js');
const { cargarArchivo } = require('../controllers/uploadController.js');

const router = Router();

router.post('/', cargarArchivo);

module.exports = router;
