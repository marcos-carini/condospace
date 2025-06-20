
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal } from "lucide-react"
import axios from "axios";

export const MoradoresTab = () => {
  const [moradores, setMoradores] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await axios.get("http://localhost:3001/usuarios/moradores");

      if (!response.data) {
        console.error("Dados inválidos recebidos:", response.data);
        return;
      }
      console.log("Dados recebidos:", response.data);
      setMoradores(response.data);
    } catch (err) {
      console.error("Erro ao carregar moradores:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
       
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"/>
        <Input type="search" placeholder="Buscar morador..." className="w-full md:w-[250px] bg-white" style={{paddingLeft: 30, borderWidth: 1, borderColor: "#e4e4e7", fontSize: 14}}/>
        </div>
        <Button variant="outline" size="icon" className="h-9 w-9">
        <Filter className="h-4 w-4" />
        </Button>
      </div>
      </div>

      <Card className="rounded-sm">
      <CardContent className="p-0">
        <Table>
        <TableHeader>
          <TableRow style={{lineHeight: "48px"}}>
          <TableHead>Nome</TableHead>
          <TableHead>Apartamento</TableHead>
          <TableHead>Contato</TableHead>
          <TableHead>Reservas</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moradores.map((morador, index) => (
          <TableRow key={index}>
            <TableCell className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-blue-100 text-blue-700">
                {morador.nome
                .split(" ")
                .map((n) => n[0])
                .join("")}
              </AvatarFallback>
              </Avatar>
              <div className="font-medium">{morador.nome}</div>
            </div>
            </TableCell>
            <TableCell>
            <div className="font-medium">
              {(morador.apartamento && morador.bloco)
              ? `${morador.apartamento} - Bloco ${morador.bloco}`
              : <span className="text-gray-500">Visitante</span>
              }
            </div>
            </TableCell>
            <TableCell>
            <div className="text-sm">
              <div>{morador.email}</div>
              <div className="text-gray-500">{morador.telefone}</div>
              <div className="text-gray-500">{morador.cpf}</div>
            </div>
            </TableCell>
            <TableCell>
            <div className="font-medium">{morador.total_reservas}</div>
            </TableCell>
            <TableCell>
            {morador.status === "A" ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              Inativo
              </Badge>
            )}
            </TableCell>
            <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              {morador.status === "A" ? (
                <DropdownMenuItem className="text-red-600">Inativar</DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="text-green-600">Ativar</DropdownMenuItem>
              )}
              </DropdownMenuContent>
            </DropdownMenu>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
        </Table>
      </CardContent>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Anterior
        </Button>
        <Button variant="outline" size="sm" className="bg-gray-100">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Próximo
        </Button>
        </div>
      </div>
      </Card>
    </div>
    )
}
