const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/authController.js');
const { validarCampos } = require('../middlewares/validarCampos.js');

const router = Router();

router.post(
  '/login',
  [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'password es obligatorio').notEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
