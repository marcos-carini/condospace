const db = require('../db/connection');

const listarUsuarios = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuario WHERE status = "A"';
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const buscarUsuarioPorId = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id_usuario, email, telefone, bloco, apartamento FROM usuario WHERE id_usuario = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};


const buscarPorEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuario WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const cadastrarUsuario = async (usuario) => {
  return new Promise((resolve, reject) => {
    const {
      nome,
      email,
      cpf,
      senha,
      telefone,
      tipo_usuario,
      status,
      bloco,
      apartamento
    } = usuario;

    const sql = `
      INSERT INTO usuario 
      (nome, email, cpf, senha, telefone, tipo_usuario, status, bloco, apartamento)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [nome, email, cpf, senha, telefone, tipo_usuario, status, bloco, apartamento], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


const buscarTodosDadosPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]); 
    });
  });
};

const atualizarSenha = (id, novaSenha) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE usuario SET senha = ? WHERE id_usuario = ?', [novaSenha, id], (err, results) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports = {
  listarUsuarios,
  buscarPorEmail,
  cadastrarUsuario,
  buscarUsuarioPorId,
  buscarTodosDadosPorId,
  atualizarSenha,
};
