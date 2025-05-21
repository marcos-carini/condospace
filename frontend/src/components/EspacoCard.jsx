
import "../pages/Reserva.css";
const EspacoCard = ({ titulo, descricao, imagem, onReservar }) => {
  return (
    <div className="espaco-card">
      <div className="espaco-card-imagem">
      </div>
      <div className="espaco-card-conteudo">
        <div>
          <h3>{titulo}</h3>
          <p>{descricao}</p>
        </div>
        <button className="btn-reservar" onClick={onReservar}>Reservar</button>
      </div>
    </div>
  );
};


export default EspacoCard;