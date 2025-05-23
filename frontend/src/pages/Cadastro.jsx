import './LoginCadastro.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    cpf: '',
    senha: '',
    confirmar_senha: '',
    bloco: '',
    apartamento: ''
  });

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmar_senha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/usuarios", {
        nome: "Usuário",
        email: formData.email,
        cpf: formData.cpf,
        senha: formData.senha,
        bloco: formData.bloco,
        apartamento: formData.apartamento
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.response.data.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Cadastre-se</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Digite seu email" value={formData.email} onChange={handleChange} />

          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" placeholder="Digite seu CPF" value={formData.cpf} onChange={handleChange}/>

          <div style={{display: 'flex', gap: "2rem"}}>
            <label htmlFor="bloco">
              Bloco
              <input type="text" id="bloco" placeholder="Digite o Bloco"  value={formData.bloco} onChange={handleChange}/> 
            </label>
            

            <label htmlFor="apartamento">
                Apto
               <input type="text" id="apartamento" placeholder="Digite o Apto" value={formData.apartamento} onChange={handleChange} />
            </label>
           
          </div>

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="Digite sua senha" value={formData.senha} onChange={handleChange}/>

          <label htmlFor="confirmar_senha">Confirmar Senha</label>
          <input type="password" id="confirmar_senha" placeholder="Digite sua senha novamente" value={formData.confirmar_senha} onChange={handleChange}/>

          <button type="submit">Cadastrar</button>
        </form>

      
      </div>
    </div>
  );
};

export default Cadastro;