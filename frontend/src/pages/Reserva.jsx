import "./Reserva.css"
import Modal from "react-modal";
import Layout from "../components/Layout"
import EspacoCard from "../components/EspacoCard"
import DateSelector from "../components/DateSelector";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import hojeLocal from "../helpers/data";

Modal.setAppElement("#root");

const Reserva = () => {
  const [espacos, setEspacos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [espacoSelecionado, setEspacoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");


  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [espacosResp, reservasResp] = await Promise.all([
        axios.get("http://localhost:3001/espacos"),
        axios.get("http://localhost:3001/reservas")
      ]);

      const espacos = espacosResp.data;
      const reservas = reservasResp.data;

      const hoje = hojeLocal(); 
      console.log("Data de hoje:", hoje);
      console.log(reservas);
      const espacosAtualizados = espacos.map((espaco) => {
        const temReservaHoje = reservas.some(
          (reserva) =>
            reserva.id_espaco === espaco.id_espaco &&
            reserva.data.split('T')[0] === hoje &&
            reserva.status === "A"
        );

        return {
          ...espaco,
          disponivel: !temReservaHoje,
        };
      });

      setEspacos(espacosAtualizados);
      setReservas(reservas);
    } catch (err) {
      console.error("Erro ao carregar espaços ou reservas:", err);
    }
  };


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

  const concluirReserva = async (espacoId, dataSelecionada) => {
    const id_usuario = localStorage.getItem('id_usuario');
    console.log("data selecionada: ",dataSelecionada);

    if (!dataSelecionada) {
      toast.error("Por favor, selecione uma data para a reserva.");
      return;
    }

    try {
      await axios.post('http://localhost:3001/reservas', {
        id_usuario,
        id_espaco: espacoId,
        data: dataSelecionada,
      });

      toast.success("Reserva feita com sucesso!");
      fecharModal();
      setDataSelecionada("");

      await carregarDados();
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      toast.error("Erro ao criar reserva.");
    }
  };


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
            disponivel={espaco.disponivel}
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
            <DateSelector
              value={dataSelecionada}
              onChange={setDataSelecionada}
              reservas={reservas}
              espacoId={espacoSelecionado?.id_espaco}
            />
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
              concluirReserva(espacoSelecionado.id_espaco, dataSelecionada);
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