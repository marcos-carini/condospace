
const usuarioRepository = require('../repositories/usuarioRepository');

const listarUsuarios = async () => {
  try {
    const usuarios = await usuarioRepository.listarUsuarios();
    return usuarios;
  } catch (error) {
    throw new Error('Erro ao listar usuários: ' + error.message);
  }
};

const cadastrarUsuario = async ({ nome, email, cpf, senha, telefone, bloco, apartamento }) => {
  const existente = await usuarioRepository.buscarPorEmail(email);
  if (existente.length > 0) {
    throw new Error('Email já cadastrado');
  }

  await usuarioRepository.cadastrarUsuario({
    nome,
    email,
    cpf,
    senha,
    telefone,
    bloco,
    apartamento,
    tipo_usuario: 'M',
    status: 'A'
  });
};

module.exports = {
  listarUsuarios,
  cadastrarUsuario,
};
