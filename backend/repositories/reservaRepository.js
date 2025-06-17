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

const listarReservasDoUsuario = (id_usuario, incluirCanceladas = false) => {
  const sqlBase = `
    SELECT r.*, e.nome AS nome_espaco, e.descricao , e.imagem
    FROM reserva r 
    JOIN espaco e ON r.id_espaco = e.id_espaco 
    WHERE r.id_usuario = ? 
  `;

  const condicaoStatus = incluirCanceladas 
    ? "AND (r.status = 'I' OR r.status = 'C')"
    : "AND (r.status = 'A' OR r.status = 'P')";

  const sql = `${sqlBase} ${condicaoStatus}`;

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

const cancelarReserva = (id_reserva, status) => {
  const sql = `
    UPDATE reserva
    SET status = ?
    WHERE id_reserva = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [status, id_reserva], (err, result) => {
      if (err) {
        console.error('Erro ao cancelar reserva:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  listarReservas,
  adicionarReserva,
  listarReservasDoUsuario,
  cancelarReserva,
  
};
