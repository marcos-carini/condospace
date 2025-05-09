const usuarioRepository = require('../repositories/usuarioRepository');

const listarUsuarios = async () => {
  try {
    const usuarios = await usuarioRepository.listarUsuarios();
    return usuarios;
  } catch (error) {
    throw new Error('Erro ao listar usuários: ' + error.message);
  }
};

module.exports = {
  listarUsuarios,
};
