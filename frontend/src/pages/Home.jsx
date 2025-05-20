import './Home.css';
import foguete from "../assets/images/foguete.png";
import Layout from '../components/Layout'
import { Link } from 'react-router-dom';

function Home() {
  return (
     <Layout activePage="home">
      <div style={{display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", justifyContent: "center", margin: "10px 0px"}}>
        <h1 style={{color: "#7c73ff", marginBottom: 10}}>Bem vindo ao CondoSpace</h1>
        <h3 style={{color: "#928bff", fontSize: 23, textAlign: "center", maxWidth: 500}}>Reserve de forma fácil o seu estilo de lazer preferido em poucos minutos</h3>
      </div>

      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Link to={"/reserva"} className="main-button">
          Começar
          <img src={foguete} alt="Foguete" className="rocket-image" />
        </Link>
      </div>

    </Layout>
  )
}

export default Home