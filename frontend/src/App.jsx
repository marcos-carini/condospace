
import Login from './pages/Login'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
