import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Edit2, Trash2, Users, Calendar, Home } from "lucide-react"
import axios from "axios";

export const EspacosTab = () => {
  const [espacos, setEspacos] = useState([]);
  const [openAddEspaco, setOpenAddEspaco] = useState(false)
  const [openEditEspaco, setOpenEditEspaco] = useState(false)

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await axios.get("http://localhost:3001/espacos");

      if (!response.data) {
        console.error("Dados inválidos recebidos:", response.data);
        return;
      }
      console.log("Dados recebidos:", response.data);
      setEspacos(response.data);
    } catch (err) {
      console.error("Erro ao carregar espaços ou reservas:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
        </div>
        <Dialog open={openAddEspaco} onOpenChange={setOpenAddEspaco}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Adicionar Espaço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="mb-0">Adicionar Novo Espaço</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do novo espaço que será disponibilizado para reservas.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Espaço</Label>
                <Input id="nome" placeholder="Ex: Salão de Festas" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva o espaço, suas características e regras de uso"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-start">
                <div className="grid gap-2">
                  <Label htmlFor="imagem">Imagem</Label>
                  <button
                    type="button"
                    className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 hover:bg-gray-200 transition-colors"
                  >
                    <Home className="h-8 w-8 text-gray-400" />
                  </button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="ativo">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="manutencao">Em Manutenção</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAddEspaco(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Espaço</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {espacos.map((espaco) => (
          <Card key={espaco.id_espaco} className="overflow-hidden">
            <div className="h-40 bg-gray-100 relative">
              {espaco.imagem ? (
                <img
                  src={`/images/${espaco.imagem}`}
                  alt="Imagem do espaço"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Home className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                {espaco.status === "A" ? (
                  <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                ) : espaco.status === "M" ? (
                  <Badge className="bg-yellow-100 text-yellow-800">Em Manutenção</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">Inativo</Badge>
                )}
              </div>
            </div>
            <CardHeader className="p-6 flex flex-col gap-3">
              <CardTitle>{espaco.nome}</CardTitle>
              <CardDescription
                className="line-clamp-2 mb-5 min-h-[40px]"
                style={{ minHeight: '40px', display: 'block' }}
              >
                {espaco.descricao}
              </CardDescription>
              <div className="flex gap-2 items-center">
                <Dialog open={openEditEspaco} onOpenChange={setOpenEditEspaco}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                      <Edit2 className="h-3.5 w-3.5 mr-1" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Editar Espaço</DialogTitle>
                      <DialogDescription>Modifique os detalhes do espaço selecionado.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-nome">Nome do Espaço</Label>
                        <Input id="edit-nome" defaultValue={espaco.nome} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-descricao">Descrição</Label>
                        <Textarea id="edit-descricao" defaultValue={espaco.descricao} className="min-h-[100px]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 items-start">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-imagem">Imagem</Label>
                          <div className="flex items-center gap-2">
                            <div className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center">
                              <Home className="h-8 w-8 text-gray-400" />
                            </div>
                            <Button variant="outline" type="button" style={{alignSelf: "baseline"}}>
                              Trocar Imagem
                            </Button>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-status">Status</Label>
                          <Select defaultValue={espaco.status}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ativo">Ativo</SelectItem>
                              <SelectItem value="manutencao">Em Manutenção</SelectItem>
                              <SelectItem value="inativo">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenEditEspaco(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit">Salvar Alterações</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" className="h-8 px-3 text-xs">
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Remover
                </Button>
              </div>
            </CardHeader>

          </Card>
        ))}
      </div>
    </div>
  )
}
