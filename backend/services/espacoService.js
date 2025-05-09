const espacoRepository = require('../repositories/espacoRepository');

const listarEspacos = async () => {
  try {
    const espacos = await espacoRepository.listarEspacos();
    return espacos;
  } catch (error) {
    throw new Error('Erro ao listar espaços: ' + error.message);
  }
};

module.exports = {
  listarEspacos,
};
