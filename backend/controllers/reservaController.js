const reservaService = require('../services/reservaService');

const listarReservas = async (req, res) => {
  try {
    const reservas = await reservaService.listarReservas();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const listarReservasDoUsuario = async (req, res) => {
  const { id } = req.params;
  const { historico } = req.query;
  try {
    const reservas = await reservaService.listarReservasDoUsuario(id, historico === 'true');
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const adicionarReserva = async (req, res) => {
  const { id_usuario, id_espaco, data } = req.body;

  try {
    await reservaService.adicionarReserva(id_usuario, id_espaco, data);
    res.status(201).json({ message: 'Reserva criada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    await reservaService.cancelarReserva(id);
    res.status(200).json({ message: 'Reserva cancelada com sucesso.' });
  } catch (error) {
    console.error('Erro ao cancelar reserva:', error);
    res.status(500).json({ message: error.message });
  }
};


module.exports= {
  listarReservas,
  adicionarReserva,
  listarReservasDoUsuario,
  cancelarReserva,
}