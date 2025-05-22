
import "../pages/Historico.css";
import { IoTodayOutline } from "react-icons/io5";
import { TbClockHour10 } from "react-icons/tb";
const HistoricoCard = ({ titulo, descricao, imagem, onReservar }) => {
  return (
    <div className="historico-card">
      <div className="historico-card-imagem">
      </div>
      <div className="historico-card-conteudo">
        <div>
          <h3 className="historico-card-titulo">{titulo}</h3>
          <p className="historico-card-texto" style={{color: "#666"}}>{descricao}</p>
        </div>
        <div style={{display: "flex", gap: 20}}>
          <div style={{display: "flex", flexDirection: "column", gap: 5, alignItems: "center"}}>
            <h3 className="historico-card-titulo"><IoTodayOutline color="#ff5f5f"/> Dia Reservado</h3>
            <p className="historico-card-texto" style={{fontSize: 18}}>10/09/2024</p>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: 5, alignItems: "center"}}>
            <h3 className="historico-card-titulo"><TbClockHour10 color="#ff5f5f"/> Horário Reservado</h3>
            <p className="historico-card-texto" style={{fontSize: 18}}>18:30</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};


export default HistoricoCard;