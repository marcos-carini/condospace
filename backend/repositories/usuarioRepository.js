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
    const sqlUsuario = 'SELECT id_usuario, email, telefone, bloco, apartamento FROM usuario WHERE id_usuario = ?';
    const sqlVisitantes = `
      SELECT v.id_visitante, u.email 
      FROM visitantes v
      JOIN usuario u ON v.id_visitante = u.id_usuario
      WHERE v.id_morador = ?
    `;

    // Executar as duas queries em paralelo
    db.query(sqlUsuario, [id], (err, usuarioResults) => {
      if (err) return reject(err);
      const usuario = usuarioResults[0];

      db.query(sqlVisitantes, [id], (err, visitantesResults) => {
        if (err) return reject(err);

        // Anexa os visitantes ao objeto do usuário
        usuario.visitantes = visitantesResults;
        resolve(usuario);
      });
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

const verificarVinculoExistente = (idMorador, idVisitante) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM visitantes WHERE id_morador = ? AND id_visitante = ?';
    db.query(sql, [idMorador, idVisitante], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0);
    });
  });
};

const vincularVisitante = (idMorador, idVisitante) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO visitantes (id_morador, id_visitante, status_vinculo) VALUES (?, ?, ?)';
    db.query(sql, [idMorador, idVisitante, "A"], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const removerVisitante = (idVisitante, idMorador) => {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM visitantes
      WHERE id_visitante = ? AND id_morador = ?
    `;
    db.query(sql, [idVisitante, idMorador], (err, result) => {
      if (err) return reject(err);
      resolve(result);
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
  verificarVinculoExistente,
  vincularVisitante,
  removerVisitante,
};
