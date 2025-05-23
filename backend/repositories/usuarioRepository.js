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

module.exports = {
  listarUsuarios,
  buscarPorEmail,
  cadastrarUsuario
};
