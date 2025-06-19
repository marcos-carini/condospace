
import RequireAuth from './components/RequireAuth.jsx';
import Login from './pages/Login'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import { Route, Routes } from 'react-router-dom'
import Reserva from './pages/Reserva'
import Contato from './pages/Contato'
import MinhasReservas from './pages/MinhasReservas'
import Historico from './pages/Historico'
import MinhaConta from './pages/MinhaConta'
import Dashboard from './pages/Dashboard.jsx';

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={
        <RequireAuth>
          <Home />
        </RequireAuth>
      } />
      <Route path="/reserva" element={
        <RequireAuth>
          <Reserva />
        </RequireAuth>
      } />
      <Route path="/minhasreservas" element={
        <RequireAuth>
          <MinhasReservas />
        </RequireAuth>
      } />
      <Route path="/contato" element={
        <RequireAuth>
          <Contato />
        </RequireAuth>
      } />
      <Route path="/historico" element={
        <RequireAuth>
          <Historico />
        </RequireAuth>
      } />
      <Route path="/minhaconta" element={
        <RequireAuth>
          <MinhaConta />
        </RequireAuth>
      } />
      <Route path="/dashboard" element={
        <RequireAuth allowedRoles={["A", "F"]}>
          <Dashboard />
        </RequireAuth>
      } />
    </Routes>
  )
}

export default App
