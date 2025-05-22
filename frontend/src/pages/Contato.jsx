import "../pages/Contato.css"
import Divisoria from "../components/Divisoria"
import Layout from "../components/Layout"
import { FaWhatsapp } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";

const Contato = () => {
  return (
    <Layout activePage="contato">
      <div className="contato-wrapper">
        <Divisoria titulo="Contato"/>
        <div style={{display: "flex", flexDirection: "column", gap: 30, marginTop: 20}}>
          <div className="contato-card">
            <h1 style={{color: "#666"}}>Suporte CondoSpace</h1>
            <p>Estamos aqui para ajudar! Se você tiver alguma dúvida ou precisar de assistência, não hesite em nos contatar.</p>
            <div className="contato-info">
              <p style={{display: "flex", alignItems: "center", gap: 5, color: "#777",fontSize: "1rem", flexWrap: "wrap"}}>
                <MdAlternateEmail color="#0064b0"/> 
                <span style={{color: "#0064b0", fontWeight: "bold"}}>Email</span>condospace@contato.com.br
              </p>
              <p style={{display: "flex", alignItems: "center", gap: 5, color: "#777",fontSize: "1rem"}}>
                <FiMapPin color="#25D366"/> 
                <span style={{color: "#25D366", fontWeight: "bold"}}>Whatsapp</span>(11) 98765-6789
              </p>
              <p style={{display: "flex", alignItems: "center", gap: 5, color: "#777",fontSize: "1rem"}}>
                <FiMapPin color="#FF4949"/> 
                <span style={{color: "#FF4949", fontWeight: "bold"}}>Endereço</span>Rua Exemplo, 123, Bairro, Cidade, Estado
              </p>
            </div>
          </div>

          <div className="contato-card">
            <h1 style={{color: "#666"}}>Suporte Condomínio</h1>
            <p>Portaria 24/7 para contato imediato.</p>
            <div className="contato-info">
              <p style={{display: "flex", alignItems: "center", gap: 5, color: "#777",fontSize: "1rem", flexWrap: "wrap"}}>
                <MdAlternateEmail color="#0064b0"/> 
                <span style={{color: "#0064b0", fontWeight: "bold"}}>Email</span>condospace@contato.com.br
              </p>
              <p style={{display: "flex", alignItems: "center", gap: 5, color: "#777",fontSize: "1rem"}}>
                <FiMapPin color="#25D366"/> 
                <span style={{color: "#25D366", fontWeight: "bold"}}>Whatsapp</span>(11) 98765-6789
              </p>
              <p style={{display: "flex", alignItems: "center", gap: 5, color: "#777",fontSize: "1rem"}}>
                <FiMapPin color="#FF4949"/> 
                <span style={{color: "#FF4949", fontWeight: "bold"}}>Endereço</span>Rua Exemplo, 123, Bairro, Cidade, Estado
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </Layout>
  )
}

export default Contato