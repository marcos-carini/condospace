import './LoginCadastro.css';

const Cadastro = () => {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Cadastre-se</h2>

        <form>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Digite seu email" />

          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" placeholder="Digite seu CPF" />

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="Digite sua senha" />

          <label htmlFor="confirmar_senha">Confirmar Senha</label>
          <input type="password" id="confirmar_senha" placeholder="Digite sua senha novamente" />

          <button type="submit">Cadastrar</button>
        </form>

      
      </div>
    </div>
  );
};

export default Cadastro;