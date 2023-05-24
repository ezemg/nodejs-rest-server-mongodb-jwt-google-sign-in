const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.js');

const { generarJWT } = require('../helpers/generarJWT.js');

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo',
      });
    }

    // Verificar si el usuario esta activo en DB
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false',
      });
    }

    // Verificar password
    const validPassowrd = bcryptjs.compareSync(password, usuario.password);
    if (!validPassowrd) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      });
    }

    const token = await generarJWT(usuario.id);

    // Generar el JWT
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el admin',
    });
  }
};

module.exports = {
  login,
};
