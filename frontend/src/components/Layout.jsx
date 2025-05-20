
import { useState } from "react";
import "./Layout.css";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Layout = ({ children, activePage }) => {
  if (activePage === "home") {
    activePage = "home";
  } else if (activePage === "reservas") {
    activePage = "reservas";
  } else if (activePage === "contato") {
    activePage = "contato";
  }

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content container">
          <div className="logo">CondoSpace</div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>

          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to={"/"}  style={{color: activePage === "home" ? "#ffee79" : ""}}>Início</Link>
            <Link to={"/reserva"} style={{color: activePage === "reservas" ? "#ffee79" : ""}}>Reservas</Link>
            <Link to={"/contato"} style={{color: activePage === "contato" ? "#ffee79" : ""}}>Contato</Link>
          </nav>
          
          <button className={`logout-button ${menuOpen ? "show-on-mobile" : ""}`}>
            Sair
            <FaSignOutAlt style={{ marginLeft: "8px" }} />
          </button>
          
        </div>
      </header>

      <div className="layout-body container">
        <aside className="layout-sidebar">
          <h3>Área de Controle</h3>
          <p className="user-info">Bloco 7 · Apto 703</p>

          <div className="sidebar-buttons">
            <button>Minha Conta</button>
            <button>Minhas Reservas</button>
            <button>Histórico</button>
          </div>
          <p className="user-info" style={{textAlign: "center", marginTop: 20, marginBottom: 0}}>Sua reserva + moderna</p>
        </aside>

        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
