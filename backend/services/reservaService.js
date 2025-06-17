const reservaRepository = require('../repositories/reservaRepository');

const listarReservas = async () => {
  try {
    const reservas = await reservaRepository.listarReservas();
    return reservas;
  } catch (error) {
    throw new Error('Erro ao listar reservas: ' + error.message);
  }
}

const listarReservasDoUsuario = async (id_usuario) => {
  return await reservaRepository.listarReservasDoUsuario(id_usuario);
};

const adicionarReserva = async (id_usuario, id_espaco, data) => {
  return await reservaRepository.adicionarReserva(id_usuario, id_espaco, data);
};

module.exports = {
  listarReservas,
  adicionarReserva,
  listarReservasDoUsuario,
}