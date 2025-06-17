import "./Reserva.css"

import Layout from "../components/Layout"
import Divisoria from "../components/Divisoria"
import ReservaCard from "../components/ReservaCard"
import toast from 'react-hot-toast';

import { useEffect, useState } from "react";
import axios from "axios";


const MinhasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const id_usuario = localStorage.getItem("id_usuario");
  useEffect(() => {
    const carregarReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reservas/usuario/${id_usuario}`);
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
      }
    };

    if (id_usuario) {
      carregarReservas();
    }
  }, [id_usuario]);


  const cancelarReserva = async (idReserva) => {
    try {
      await axios.put(`http://localhost:3001/reserva/${idReserva}/cancelar`);

      setReservas((prevReservas) =>
        prevReservas.filter((reserva) => reserva.id_reserva !== idReserva)
      );
      toast.success("Reserva cancelada com sucesso");
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      toast.error("Erro ao cancelar reserva");
    }
  };
  return (

    <Layout activePage={"minhasreservas"}>
      <div className="espacos-wrapper">
        <Divisoria  titulo="Minhas Reservas" />
        
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id_reserva}
              titulo={reserva.nome_espaco}
              imagem={reserva.imagem}
              descricao={reserva.descricao}
              dataReservada={reserva.data.split("T")[0]}
              status={reserva.status === "A" ? "confirmada" : "pendente"}
              onCancelar={() => cancelarReserva(reserva.id_reserva)}
            />
          ))
        ) : (
          <p>Você não possui reservas.</p>
        )}
      </div>


    </Layout>
    
  )
}

export default MinhasReservas