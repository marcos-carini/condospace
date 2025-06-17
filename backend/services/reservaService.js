const reservaRepository = require('../repositories/reservaRepository');

const listarReservas = async () => {
  try {
    const reservas = await reservaRepository.listarReservas();
    return reservas;
  } catch (error) {
    throw new Error('Erro ao listar reservas: ' + error.message);
  }
}

const listarReservasDoUsuario = async (id_usuario, incluirCanceladas = false) => {
  return await reservaRepository.listarReservasDoUsuario(id_usuario, incluirCanceladas);
};

const adicionarReserva = async (id_usuario, id_espaco, data) => {
  return await reservaRepository.adicionarReserva(id_usuario, id_espaco, data);
};

const cancelarReserva = async (id_reserva) => {
  return await reservaRepository.cancelarReserva(id_reserva, 'C');
};

module.exports = {
  listarReservas,
  adicionarReserva,
  listarReservasDoUsuario,
  cancelarReserva,
}