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

module.exports = {
  listarReservas
};
