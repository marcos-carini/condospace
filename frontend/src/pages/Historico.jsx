import "./Historico.css"

import Layout from "../components/Layout"
import Divisoria from "../components/Divisoria"
import HistoricoCard from "../components/HistoricoCard"


const Historico = () => {
  return (

    <Layout activePage={"historico"}>
      <div className="historico-wrapper">
        <Divisoria  titulo="Histórico" />
        <HistoricoCard
          titulo="Espaço Gourmet"
          descricao="Perfeito para festas e eventos."
        />
      </div>


    </Layout>
    
  )
}

export default Historico