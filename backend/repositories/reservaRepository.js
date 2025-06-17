const db = require('../db/connection');

const listarReservas = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM reserva WHERE status = "A"';
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const listarReservasDoUsuario = (id_usuario) => {
  const sql = `
    SELECT 
      r.*, 
      e.nome AS nome_espaco, 
      e.descricao,
      e.imagem
    FROM 
      reserva r
    JOIN 
      espaco e ON r.id_espaco = e.id_espaco
    WHERE 
      r.id_usuario = ?
      AND r.status = "A" OR r.status = "P"
    ORDER BY 
      r.data DESC
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [id_usuario], (err, resultados) => {
      if (err) {
        console.error('Erro ao buscar reservas do usuário:', err);
        reject(err);
      } else {
        resolve(resultados);
      }
    });
  });
};

const adicionarReserva = (id_usuario, id_espaco, data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO reserva (id_usuario, id_espaco, data, status) VALUES (?, ?, ?, "A")';
    db.query(sql, [id_usuario, id_espaco, data], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  listarReservas,
  adicionarReserva,
  listarReservasDoUsuario,
};
