import "./Reserva.css"
import Modal from "react-modal";
import Layout from "../components/Layout"
import EspacoCard from "../components/EspacoCard"
import { useEffect, useState } from "react";
import axios from "axios";

Modal.setAppElement("#root");

const Reserva = () => {
  const [espacos, setEspacos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [espacoSelecionado, setEspacoSelecionado] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/espacos")
      .then((response) => {
        setEspacos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar espaços:", error);
        setLoading(false);
      });
  }, []);

  const handleReservar = (espaco) => {
    alert(`Iniciando reserva do ${espaco}`)
  }

  const abrirModal = (espaco) => {
    console.log("Abrindo modal para:", espaco);
    setEspacoSelecionado(espaco);
    console.log("Espaço selecionado:", espacoSelecionado);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEspacoSelecionado(null);
  };

  
  if (loading) return <p>Carregando espaços...</p>;

  return (
    <>
    <Layout activePage="reservas">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">
        {espacos.map((espaco) => (
          <EspacoCard
            key={espaco.id_espaco}
            titulo={espaco.nome}
            imagem={espaco.imagem}
            descricao={espaco.descricao}
            disponivel={espaco.status === "A"}
            onReservar={() => abrirModal(espaco)}
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
          <h2 style={{marginBottom: 0}}>Reservar: {espacoSelecionado?.nome}</h2>
        </header>
        <form className="modal-form">
          <label>
            Data:
            <input type="date" required className="modal-input" />
          </label>

          <div className="modal-contato">
            <p><strong>Contato do zelador:</strong></p>
            <p>Telefone: (11) 98765-4321</p>
            <p>Email: zelador@condominio.com</p>
          </div>

          <p className="modal-termo">
            Ao reservar o/a {espacoSelecionado?.nome} você concorda com os termos de uso do condomínio.
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