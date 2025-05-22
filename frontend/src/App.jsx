
import Login from './pages/Login'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import { Route, Routes } from 'react-router-dom'
import Reserva from './pages/Reserva'
import Contato from './pages/Contato'
import MinhasReservas from './pages/MinhasReservas'
import Historico from './pages/Historico'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<Home />} />
      <Route path="/reserva" element={<Reserva />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/minhasreservas" element={<MinhasReservas />} />
      <Route path="/historico" element={<Historico />} />
    </Routes>
  )
}

export default App
