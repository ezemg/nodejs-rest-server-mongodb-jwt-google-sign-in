const { response } = require('express');
const path = require('path');
const { subirArchivo } = require('../helpers');

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: 'No hay archivos en la peticion.' });
  }

  try {
    const nombre = await subirArchivo(req.files, undefined, 'imgs');

    res.json({ nombre });
  } catch (error) {
    res.json({ msg: error });
  }
};

module.exports = {
  cargarArchivo,
};
