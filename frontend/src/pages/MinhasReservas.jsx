import "./Reserva.css"

import Layout from "../components/Layout"
import EspacoCard from "../components/EspacoCard"
import Divisoria from "../components/Divisoria"
import ReservaCard from "../components/ReservaCard"


const MinhasReservas = () => {
  return (

    <Layout activePage={"minhasreservas"}>
      <div className="espacos-wrapper">
        <Divisoria  titulo="Minhas Reservas" />
        <ReservaCard
          titulo="Espaço Gourmet"
          descricao="Perfeito para festas e eventos."
        />
      </div>


    </Layout>
    
  )
}

export default MinhasReservas