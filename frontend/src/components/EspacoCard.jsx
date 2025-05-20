
import "../pages/Reserva.css";
const EspacoCard = ({ titulo, descricao, imagem, onReservar }) => {
  return (
    <div className="espaco-card">
      <div className="espaco-card-imagem">
      </div>
      <div className="espaco-card-conteudo">
        <div>
          <h3 style={{ color: "#6112ff", fontWeight: 600 }}>{titulo}</h3>
          <p style={{ color: "#7c73ff", fontWeight: 600, fontSize: 14 }}>{descricao}</p>
        </div>
        <button className="btn-reservar" onClick={onReservar}>Reservar</button>
      </div>
    </div>
  );
};


export default EspacoCard;