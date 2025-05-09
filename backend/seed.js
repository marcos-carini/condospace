const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Função para limpar a tabela antes de inserir novos dados
const limparTabela = () => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM Usuario';  // Limpa todos os dados da tabela Usuario
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      console.log('Tabela Usuario limpa!');
      resolve();
    });
  });
};

// Função para inserir os dados de carga inicial
const inserirUsuarios = () => {
  return new Promise((resolve, reject) => {
    const users = [
      { nome: 'Administrador', cpf: '12345678901', email: 'admin@condominio.com', senha: 'admin123', telefone: '999999999', tipo_usuario: 'A', status: 'A' },
      { nome: 'Funcionário 1', cpf: '98765432100', email: 'func1@condominio.com', senha: 'func123', telefone: '888888888', tipo_usuario: 'F', status: 'A' },
      { nome: 'Morador 1', cpf: '10293847560', email: 'morador1@condominio.com', senha: 'morador123', telefone: '777777777', tipo_usuario: 'M', status: 'A' }
    ];

    users.forEach(user => {
      const sql = 'INSERT INTO Usuario (nome, cpf, email, senha, telefone, tipo_usuario, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(sql, [user.nome, user.cpf, user.email, user.senha, user.telefone, user.tipo_usuario, user.status], (err, results) => {
        if (err) return reject(err);
        console.log(`Usuário ${user.nome} inserido com sucesso!`);
      });
    });

    resolve();
  });
};

// Executando o script
const carregarDados = async () => {
  try {
    await limparTabela(); // Limpar a tabela antes de inserir os dados
    await inserirUsuarios(); // Inserir dados de carga inicial
    console.log('Carga inicial realizada com sucesso!');
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
  } finally {
    db.end(); // Fechar a conexão com o banco
  }
};

carregarDados();
