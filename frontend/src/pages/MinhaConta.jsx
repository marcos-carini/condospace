import React from 'react'
import Layout from '../components/Layout'
import "./MinhaConta.css"
import Divisoria from '../components/Divisoria'
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"

import { useEffect, useState } from 'react';
import axios from 'axios';

const MinhaConta = () => {
  const [usuario, setUsuario] = useState(null);
  const [emailVisitante, setEmailVisitante] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [senhaAnterior, setSenhaAnterior] = useState('');
  const [novaSenha, setNovaSenha] = useState('');



  useEffect(() => {
    const fetchUsuario = async () => {
      const id = localStorage.getItem('id_usuario');

      try {
        const response = await axios.get(`http://localhost:3001/usuarios/${id}`); // troque o ID dinamicamente se necessário
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUsuario();
  }, []);


  const handleSenhaUpdate = async () => {
    const id = localStorage.getItem('id_usuario');
    try {
      const response = await axios.put(`http://localhost:3001/usuarios/${id}/senha`, {
        senhaAnterior,
        novaSenha
      });
      toast.success(response.data.message);
      setIsChangingPassword(false);
      setSenhaAnterior('');
      setNovaSenha('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar senha');
    }
  };

  const handleAdicionarVisitante = async () => {
  const id = localStorage.getItem('id_usuario');

  try {
    const response = await axios.post(`http://localhost:3001/usuarios/${id}/visitantes`, {
      email: emailVisitante
    });

    toast.success(response.data.message);
    setEmailVisitante('');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao adicionar visitante');
  }
};
  
  return (
    <Layout activePage="minhaconta">
      <Divisoria titulo="Minha Conta"/>
      <div className="minhaconta-wrapper">
        

        <form className="minhaconta-form">

          {/* Seção: Dados do usuário */}
          <div className="form-section">
            <h3 style={{borderBottom: "1px solid #f1f1f1", paddingBottom: 5, color: "#928bff"}}>Seus Dados</h3>

            <label>
              Email:
              <input type="email" value={usuario?.email || ""} readOnly />
            </label>

            <label>
              Telefone:
              <input type="text" value={usuario?.telefone || ""} readOnly />
            </label>

            <div className="senha-area">
              { isChangingPassword && 
              <>
              <label>
                Senha anterior:
                <input type="password" value={senhaAnterior} onChange={(e) => setSenhaAnterior(e.target.value)}/>
              </label>
              <label>
                Nova Senha:
                <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)}/>
              </label>

              <button type="button" className="btn-comum" onClick={handleSenhaUpdate}>
                Confirmar
              </button>

              </>
              }
              <button type="button" className="btn-comum" style={{backgroundColor: isChangingPassword ? "#cf142b" : ""}} onClick={() => setIsChangingPassword(!isChangingPassword)}>
                {isChangingPassword ? "Cancelar" : "Mudar Senha"}
              </button>
            </div>

            <h3 style={{borderBottom: "1px solid #f1f1f1", paddingBottom: 5, color: "#928bff", marginTop: 20}}>Moradia</h3>
            {usuario && (usuario.bloco !== "" || usuario.apartamento !== "") ? 
            <div className="apartamento-info">
              <label>
                Bloco:
                <input type="text" value={usuario?.bloco} placeholder="Digite o bloco" readOnly/>
              </label>

              <label>
                Apartamento:
                <input type="text" value={usuario?.apartamento} placeholder="Digite o apartamento" readOnly/>
              </label>
             
            </div> : 
            <h3 style={{color: "#928bff"}}>Você é visitante de:</h3>

            }
          </div>

          
          {usuario && (usuario.bloco !== "" || usuario.apartamento !== "") &&
          <div className="form-section" style={{gap: 0}}>
            <h3 style={{color: "#928bff"}}>Adicionar Visitante</h3>
            <small style={{color: "#666", marginBottom: 15}}>Adicione um visitante para conseguir realizar reservas também!</small>
            <div className="apartamento-info">
              <label>
                Email do Visitante:
                <input type="email" placeholder="usuario@exemplo.com" value={emailVisitante} onChange={(e) => setEmailVisitante(e.target.value)} />
              </label>
              <button type="button" className="btn-comum" onClick={handleAdicionarVisitante}>
                Adicionar
              </button>
            </div>

            <p style={{marginTop: 20, marginBottom: 5}}>Seus visitantes ativos: </p>
            <div style={{display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap"}}>
            </div>
          </div>}

        </form>
      </div>  
    </Layout>
  )
}

export default MinhaConta