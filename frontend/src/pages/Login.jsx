import './Login.css';

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>

        <form>
          <label htmlFor="usuario">Usuário</label>
          <input type="text" id="usuario" placeholder="Digite seu usuário" />

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="Digite sua senha" />

          <button type="submit">Entrar</button>
        </form>

        <p className="signup-text">
          Não possui uma conta de morador e deseja criar uma?
          <a href="#" className="signup-link"> Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;