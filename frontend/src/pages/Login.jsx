import { Link, useNavigate } from 'react-router-dom';
import './LoginCadastro.css';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        senha,
      });

      const { token, nome, id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('nome', nome);
      localStorage.setItem('id_usuario', id);


      const payload = JSON.parse(atob(token.split('.')[1]));
      const tipo = payload.tipo;


      if (tipo === "A" || tipo === "F") {
        navigate('/dashboard');
      } else {
        navigate('/');
      }

      toast.success('Login realizado com sucesso!');
    } catch (err) {
      console.log(err);
      toast.error('Email ou senha inválidos');
      setSenha('');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Label>Email</Label>
          <Input type="text" id="email" placeholder="c@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <Label>Senha</Label>
          <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>

          <button type="submit" className='btnSubmit'>Entrar</button>
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