const usuarioRepository = require('../repositories/usuarioRepository');

const listarTodosUsuarios = async () => {
  try {
    const usuarios = await usuarioRepository.listarTodosUsuarios();
    return usuarios;
  } catch (error) {
    throw new Error('Erro ao listar usuários: ' + error.message);
  }
};

module.exports = {
  listarTodosUsuarios,
};
