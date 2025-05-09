const espacoService = require('../services/espacoService');

const listarEspacos = async (req, res) => {
  try{
    const espacos  = await espacoService.listarEspacos();
    res.status(200).json(espacos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  listarEspacos,
}