import { Link } from 'react-router-dom';
import './LoginCadastro.css';

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>

        <form>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Digite seu email" />

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="Digite sua senha" />

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