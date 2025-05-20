import "./Reserva.css"
import Modal from "react-modal";
import Layout from "../components/Layout"
import EspacoCard from "../components/EspacoCard"
import { useState } from "react";

Modal.setAppElement("#root");

const Reserva = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [espacoSelecionado, setEspacoSelecionado] = useState(null);

  const abrirModal = (espaco) => {
    setEspacoSelecionado(espaco);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEspacoSelecionado(null);
  };

   const espacos = [
    { titulo: "Espaço Gourmet", descricao: "Perfeito para festas e eventos." },
    { titulo: "Salão de Festas", descricao: "Ideal para grandes comemorações." },
    { titulo: "Churrasqueira", descricao: "Ambiente ao ar livre para churrascos." },
  ];

  return (
    <>
    <Layout activePage="reservas">
      <div className="espacos-wrapper">
        {espacos.map((espaco, i) => (
          <EspacoCard
            key={i}
            titulo={espaco.titulo}
            descricao={espaco.descricao}
            onReservar={() =>
              abrirModal(espaco)
            }
          />
        ))}

      </div>


    </Layout>
    <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        className="modal-conteudo"
        overlayClassName="modal-overlay"
      >
        <header className="modal-header">
          <h2>Reservar: {espacoSelecionado?.titulo}</h2>
        </header>
        <form className="modal-form">
          <label>
            Data:
            <input type="date" required className="modal-input" />
          </label>

          <label>
            Horário:
            <input type="time" required className="modal-input" />
          </label>

          <div className="modal-contato">
            <p><strong>Contato do zelador:</strong></p>
            <p>Telefone: (11) 98765-4321</p>
            <p>Email: zelador@condominio.com</p>
          </div>

          <p className="modal-termo">
            Ao reservar o/a {espacoSelecionado?.titulo} você concorda com os termos de uso do condomínio.
          </p>

          <button 
            type="button" 
            className="btn-modal-fechar"
            onClick={() => {
              // Aqui você chama sua função que controla a reserva
              fecharModal();
            }}
          >
            Concluir Reserva
          </button>
        </form>
      </Modal>
    </>
  )
}

export default Reserva