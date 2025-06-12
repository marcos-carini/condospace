import './LoginCadastro.css';
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    cpf: '',
    senha: '',
    confirmar_senha: '',
    bloco: '',
    apartamento: '',
    telefone: ''
  });

   const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "telefone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        telefone: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmar_senha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    if (!formData.email || !formData.cpf || !formData.senha || !formData.bloco || !formData.apartamento) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    if(true){
      console.log("Formulário enviado com os seguintes dados:", formData);
    }

    try {
      await axios.post("http://localhost:3001/usuarios", {
        nome: "Usuário",
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, ''),
        senha: formData.senha,
        telefone: formData.telefone,
        bloco: formData.bloco,
        apartamento: formData.apartamento
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.response.data.message);
    }
  };

  const formatTelefone = (value) => {
    if (!value) return "";
    const numeric = value.replace(/\D/g, "");

    if (numeric.length <= 2) return `(${numeric}`;
    if (numeric.length <= 6)
      return `(${numeric.slice(0, 2)}) ${numeric.slice(2)}`;
    if (numeric.length <= 10)
      return `(${numeric.slice(0, 2)}) ${numeric.slice(2, 6)}-${numeric.slice(
        6
      )}`;
    return `(${numeric.slice(0, 2)}) ${numeric.slice(2, 7)}-${numeric.slice(
      7,
      11
    )}`;
  };

  const handleCpfChange = (e) => {
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }

    setFormData(prev => ({
      ...prev,
      cpf: value
    }));
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Cadastre-se</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Digite seu email" value={formData.email} onChange={handleChange} />

          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            placeholder="Digite seu CPF"
            value={formData.cpf}
            onChange={handleCpfChange}
            maxLength={14} 
          />

          <div style={{display: 'flex', gap: "2rem"}}>
            <label htmlFor="bloco">
              Bloco
              <input type="text" id="bloco" placeholder="Digite o Bloco"  value={formData.bloco} onChange={handleChange}/> 
            </label>
            

            <label htmlFor="apartamento">
                Apto
               <input type="text" id="apartamento" placeholder="Digite o Apartamento"  value={formData.apartamento} onChange={handleChange}/> 
            </label>
          </div>

          <label htmlFor="telefone">Telefone</label>
         <input
            type="text"
            id="telefone"
            placeholder="Digite seu Telefone"
            value={formatTelefone(formData.telefone)}
            onChange={handleChange}
            maxLength={15}
          />

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="Digite sua senha" value={formData.senha} onChange={handleChange}/>

          <label htmlFor="confirmar_senha">Confirmar Senha</label>
          <input type="password" id="confirmar_senha" placeholder="Digite sua senha novamente" value={formData.confirmar_senha} onChange={handleChange}/>

          <button type="submit">Cadastrar</button>
        </form>

        <p className="signup-text">
          Já possui uma conta de morador?
          <Link to={"/login"} className="signup-link"> Faça o login</Link>
        </p>

      
      </div>
    </div>
  );
};

export default Cadastro;