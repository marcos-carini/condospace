const db = require('../db/connection');

const listarTodosUsuarios = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuario WHERE status = "A"';
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  listarTodosUsuarios
};
