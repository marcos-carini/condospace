import "./Historico.css"

import Layout from "../components/Layout"
import Divisoria from "../components/Divisoria"
import HistoricoCard from "../components/HistoricoCard"
import { Calendar, CheckCircle, XCircle } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";


const Historico = () => {
  const [reservas, setReservas] = useState([]);
  const id_usuario = localStorage.getItem("id_usuario");
  useEffect(() => {
    const carregarReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reservas/usuario/${id_usuario}?historico=true`);
        setReservas(response.data);
        console.log("Reservas carregadas:", response.data);
      } catch (error) {
        console.error("Erro ao carregar histórico de reservas:", error);
      }
    };

    if (id_usuario) {
      carregarReservas();
    }
  }, [id_usuario]);
  return (

    <Layout activePage={"historico"}>
      <div className="historico-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          {/* Reservas Concluídas */}
          <div className="bg-gradient-to-br from-green-50 to-green-200 p-6 rounded-xl border border-green-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {reservas.filter(reserva => reserva.status === "I").length}
                </div>
                <div className="text-sm font-medium text-green-600">Reservas Concluídas</div>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Reservas Canceladas */}
          <div className="bg-gradient-to-br from-red-50 to-red-200 p-6 rounded-xl border border-red-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-red-700 mb-1">
                  {reservas.filter(reserva => reserva.status === "C").length}
                </div>
                <div className="text-sm font-medium text-red-600">Reservas Canceladas</div>
              </div>
              <div className="bg-red-500 p-3 rounded-full">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Total de Reservas */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-200 p-6 rounded-xl border border-blue-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-700 mb-1">{reservas.length}</div>
                <div className="text-sm font-medium text-blue-600">Total de Reservas</div>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {reservas.map((reserva, index) => (
            <HistoricoCard
              key={index}
              imagem={reserva.imagem}
              titulo={reserva.nome_espaco}
              descricao={reserva.descricao}
              dataReservada={reserva.data.split("T")[0]}
              status={reserva.status === "I" ? "concluida" : "cancelada"}
            />
          ))}
        </div>

        {/* Estado vazio (caso não tenha histórico) */}
        {reservas.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma reserva encontrada</h3>
            <p className="text-gray-600">Você ainda não fez nenhuma reserva de espaços.</p>
          </div>
        )}



      </div>


    </Layout>
    
  )
}

export default Historico