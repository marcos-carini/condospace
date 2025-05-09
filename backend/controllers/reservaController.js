const reservaService = require('../services/reservaService');

const listarReservas = async (req, res) => {
  try {
    const reservas = await reservaService.listarReservas();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports= {
  listarReservas,
}