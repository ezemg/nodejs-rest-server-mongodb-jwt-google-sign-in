const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/authController.js');
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
router.post(
  '/google',
  [check('id_token', 'id_token es necesario').notEmpty(), validarCampos],
  googleSignIn
);

module.exports = router;
