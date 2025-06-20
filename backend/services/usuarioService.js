
const usuarioRepository = require('../repositories/usuarioRepository');

const listarUsuarios = async () => {
  try {
    const usuarios = await usuarioRepository.listarUsuarios();
    return usuarios;
  } catch (error) {
    throw new Error('Erro ao listar usuários: ' + error.message);
  }
};

const listarMoradores = async () => {
  try {
    const usuarios = await usuarioRepository.listarMoradores();
    return usuarios;
  } catch (error) {
    throw new Error('Erro ao listar moradores: ' + error.message);
  }
};

const buscarUsuarioPorId = async (id) => {
  return await usuarioRepository.buscarUsuarioPorId(id);
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

const atualizarSenha = async (id, senhaAnterior, novaSenha) => {
  const usuario = await usuarioRepository.buscarTodosDadosPorId(id);
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  if (usuario.senha !== senhaAnterior) {
    throw new Error('Senha anterior incorreta');
  }
  await usuarioRepository.atualizarSenha(id, novaSenha);
};

const adicionarVisitante = async (idMorador, emailVisitante) => {
  const [visitante] = await usuarioRepository.buscarPorEmail(emailVisitante);
  if (!visitante) {
    throw new Error('Usuário visitante não encontrado');
  }
  if (visitante.id_usuario === parseInt(idMorador)) {
    throw new Error('Você não pode se adicionar como visitante');
  }
  const vinculoExiste = await usuarioRepository.verificarVinculoExistente(idMorador, visitante.id_usuario);
  if (vinculoExiste) {
    throw new Error('Este visitante já está vinculado a você');
  }
  await usuarioRepository.vincularVisitante(idMorador, visitante.id_usuario);
  return { message: 'Visitante vinculado com sucesso' };
};

const removerVisitante = async (idVisitante, idMorador) => {
  if (!idVisitante || !idMorador) {
    throw new Error("ID do visitante e do morador são obrigatórios.");
  }

  const resultado = await usuarioRepository.removerVisitante(idVisitante, idMorador);

  if (resultado.affectedRows === 0) {
    throw new Error("Nenhum visitante encontrado com esse ID para o morador informado.");
  }

  return { message: "Visitante removido com sucesso." };
};

module.exports = {
  listarUsuarios,
  listarMoradores,
  cadastrarUsuario,
  buscarUsuarioPorId,
  atualizarSenha,
  adicionarVisitante,
  removerVisitante,
  
};
