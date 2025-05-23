import { Link, useNavigate } from 'react-router-dom';
import './LoginCadastro.css';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/login', {
        email,
        senha,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Email ou senha inválidos');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>

          <button type="submit">Entrar</button>
        </form>

        <p className="signup-text">
          Não possui uma conta de morador e deseja criar uma?
          <Link to={"/cadastro"} className="signup-link"> Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;