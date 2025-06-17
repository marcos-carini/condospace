import Layout from '../components/Layout'
import "./MinhaConta.css"
import Divisoria from '../components/Divisoria'
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,  
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"

import { useEffect, useState } from 'react';
import axios from 'axios';

const MinhaConta = () => {
  const [usuario, setUsuario] = useState(null);
  const [emailVisitante, setEmailVisitante] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [senhaAnterior, setSenhaAnterior] = useState('');
  const [novaSenha, setNovaSenha] = useState('');



  useEffect(() => {
    const fetchUsuario = async () => {
      const id = localStorage.getItem('id_usuario');

      try {
        const response = await axios.get(`http://localhost:3001/usuarios/${id}`); // troque o ID dinamicamente se necessário
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUsuario();
  }, []);


  const handleSenhaUpdate = async () => {
    const id = localStorage.getItem('id_usuario');
    try {
      const response = await axios.put(`http://localhost:3001/usuarios/${id}/senha`, {
        senhaAnterior,
        novaSenha
      });
      toast.success(response.data.message);
      setIsChangingPassword(false);
      setSenhaAnterior('');
      setNovaSenha('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar senha');
    }
  };

  const handleAdicionarVisitante = async () => {
    const id = localStorage.getItem('id_usuario');

    try {
      const response = await axios.post(`http://localhost:3001/usuarios/visitantes/${id}`, {
        email: emailVisitante
      });
      const user = await axios.get(`http://localhost:3001/usuarios/${id}`);
      setUsuario(user.data);
      toast.success(response.data.message);
      setEmailVisitante('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao adicionar visitante');
    }
  };

const removerVisitante = async (idVisitante) => {
  const idMorador = localStorage.getItem('id_usuario');
  try {
    await axios.delete(`http://localhost:3001/usuarios/visitantes/${idVisitante}`, {
      data: { idMorador }
    });
    setUsuario((prev) => ({
      ...prev,
      visitantes: prev.visitantes.filter(v => v.id_visitante !== idVisitante)
    }));
    toast.success("Visitante removido com sucesso!");
  } catch (err) {
    toast.error("Erro ao remover visitante:", err);
  }
};
  
  return (
    <Layout activePage="minhaconta">
      <Divisoria titulo="Minha Conta"/>
      <div className="minhaconta-wrapper">
        

        <form className="minhaconta-form">

          {/* Seção: Dados do usuário */}
          <div className="form-section">
            <div className='flex flex-col md:flex-row gap-4 w-full'>
              <label className="flex-1 flex flex-col">
                Email:
                <input type="email" value={usuario?.email || ""} readOnly  />
              </label>

              <label className="flex-1 flex flex-col">
                Telefone:
                <input type="text" value={usuario?.telefone || ""} readOnly  />
              </label>
            </div>

            <div className="senha-area">
              { isChangingPassword && 
              <>
              <label>
                Senha anterior:
                <input type="password" value={senhaAnterior} onChange={(e) => setSenhaAnterior(e.target.value)}/>
              </label>
              <label>
                Nova Senha:
                <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)}/>
              </label>

              <Button type="button"  onClick={handleSenhaUpdate}>
                Confirmar
              </Button>

              </>
              }
              <Button type="button" variant={isChangingPassword ? "destructive" : "default"} onClick={() => setIsChangingPassword(!isChangingPassword)}>
                {isChangingPassword ? "Cancelar" : "Mudar Senha"}
              </Button>
            </div>
            
            {usuario && (usuario.bloco !== "" || usuario.apartamento !== "") ? 
            <div className="apartamento-info">
              <label>
                Bloco:
                <input type="text" value={usuario?.bloco} placeholder="Digite o bloco" readOnly/>
              </label>

              <label>
                Apartamento:
                <input type="text" value={usuario?.apartamento} placeholder="Digite o apartamento" readOnly/>
              </label>
             
            </div> : 
            <h3 style={{color: "#928bff"}}>Você é visitante de:</h3>

            }
          </div>

          
          {usuario && (usuario.bloco !== "" || usuario.apartamento !== "") &&
          <div className="form-section" style={{gap: 0}}>
            <h3 style={{color: "#928bff"}}>Adicionar Visitante</h3>
            <small style={{color: "#666", marginBottom: 15}}>Adicione um visitante para conseguir realizar reservas também!</small>
            <div className="apartamento-info">
              <label>
                Email do Visitante:
                <input type="email" placeholder="usuario@exemplo.com" value={emailVisitante} onChange={(e) => setEmailVisitante(e.target.value)} />
              </label>
              <Button type="button" onClick={handleAdicionarVisitante}>
                Adicionar
              </Button>
            </div>

            <p style={{marginTop: 20, marginBottom: 5}}>Seus visitantes ativos: </p>
            {usuario?.visitantes?.length > 0 ? (
              <div style={{display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap"}}>
                {usuario.visitantes.map((visitante) => (
                <AlertDialog key={visitante.id_visitante}>
                  <AlertDialogTrigger asChild>
                    <Badge className="cursor-pointer">{visitante.email}</Badge>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remover visitante?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja remover o visitante <strong>{visitante.email}</strong>? Esta ação não poderá ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => removerVisitante(visitante.id_visitante)}>
                        Remover
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                ))}
              </div>
            ): <small>Nenhum visitante encontrado</small>}
          </div>
          }
        </form>
      </div>  
    </Layout>
  )
}

export default MinhaConta