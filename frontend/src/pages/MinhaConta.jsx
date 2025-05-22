import React from 'react'
import Layout from '../components/Layout'
import "./MinhaConta.css"
import Divisoria from '../components/Divisoria'

const MinhaConta = () => {
  return (
    <Layout activePage="minhaconta">
      <Divisoria titulo="Minha Conta"/>
      <div className="minhaconta-wrapper">
        

        <form className="minhaconta-form">

          {/* Seção: Dados do usuário */}
          <div className="form-section">
            <h2>Seus Dados</h2>

            <label>
              Email:
              <input type="email" value="usuario@exemplo.com" readOnly />
            </label>

            <label>
              Telefone:
              <input type="text" value="(11) 91234-5678" readOnly />
            </label>

            <div className="senha-area">
              <label>
                Senha:
                <input type="password" value="********" readOnly />
              </label>
              <button type="button" className="btn-comum">
                Mudar Senha
              </button>
            </div>
          </div>

          {/* Seção: Informações do Apartamento */}
          <div className="form-section">
            <h2>Informações do Apartamento</h2>
            <div className="apartamento-info">
              <label>
                Bloco:
                <input type="text" placeholder="Digite o bloco" />
              </label>

              <label>
                Apartamento:
                <input type="text" placeholder="Digite o apartamento" />
              </label>
              <button type="button" className="btn-comum">
                  Confirmar
              </button>
            </div>
          </div>
          <div className="form-section" style={{gap: 0}}>
            <h2 >Adicionar Visitante</h2>
            <p style={{color: "#666", marginBottom: 16}}>Adicione um visitante para conseguir realizar reservas também!</p>
            <div className="apartamento-info">
              <label>
                Email do Visitante:
                <input type="email" placeholder="usuario@exemplo.com" />
              </label>
              <button type="button" className="btn-comum">
                Adicionar
              </button>
            </div>
          </div>

        </form>
      </div>  
    </Layout>
  )
}

export default MinhaConta