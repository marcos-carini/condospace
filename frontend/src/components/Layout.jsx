
import "./Layout.css";
import { FaSignOutAlt } from "react-icons/fa";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content container">
          <div className="logo">CondoSpace</div>

          <nav className="nav-links">
            <a href="/home">Início</a>
            <a href="/reservas">Reservas</a>
            <a href="/contato">Contato</a>
          </nav>

          <button className="logout-button">
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
        </aside>

        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
