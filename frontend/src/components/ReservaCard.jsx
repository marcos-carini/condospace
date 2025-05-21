
import "../pages/Reserva.css";
import { IoTodayOutline } from "react-icons/io5";
import { TbClockHour10 } from "react-icons/tb";
const ReservaCard = ({ titulo, descricao, imagem, onReservar }) => {
  return (
    <div className="reserva-card">
      <div className="reserva-card-imagem">
      </div>
      <div className="reserva-card-conteudo">
        <div>
          <h3 className="reserva-card-titulo">{titulo}</h3>
          <p className="reserva-card-texto">{descricao}</p>
        </div>
        <div style={{display: "flex", marginTop: 20, gap: 20}}>
          <div style={{display: "flex", flexDirection: "column", gap: 5, alignItems: "center"}}>
            <h3 className="reserva-card-titulo"><IoTodayOutline color="#6112ff"/> Dia Reservado</h3>
            <p className="reserva-card-texto" style={{fontSize: 18}}>10/09/2024</p>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: 5, alignItems: "center"}}>
            <h3 className="reserva-card-titulo"><TbClockHour10 color="#6112ff"/> Horário Reservado</h3>
            <p className="reserva-card-texto" style={{fontSize: 18}}>18:30</p>
          </div>
        </div>
        <button className="btn-cancelar" onClick={onReservar}>Cancelar Reserva</button>
      </div>
    </div>
  );
};


export default ReservaCard;