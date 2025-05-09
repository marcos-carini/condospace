const db = require('../db/connection');

const listarEspacos = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM espaco WHERE status = "A"';
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  listarEspacos
};
