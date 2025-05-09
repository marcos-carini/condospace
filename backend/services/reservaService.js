const reservaRepository = require('../repositories/reservaRepository');

const listarReservas = async () => {
  try {
    const reservas = await reservaRepository.listarReservas();
    return reservas;
  } catch (error) {
    throw new Error('Erro ao listar reservas: ' + error.message);
  }
}

module.exports = {
  listarReservas,
}