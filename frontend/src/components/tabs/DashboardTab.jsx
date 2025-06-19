
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ArrowUpRight, CheckCircle, XCircle, Clock, Filter, Download, MoreHorizontal } from "lucide-react"

export const DashboardTab = () => {
  const [openCancelReserva, setOpenCancelReserva] = useState(false)

  const reservasData = [
    {
      id: 1,
      morador: "Carlos Silva",
      apto: "102",
      espaco: "Espaço Gourmet",
      data: "10/09/2024",
      horario: "14:00 - 22:00",
      status: "confirmada",
    },
    {
      id: 2,
      morador: "Ana Oliveira",
      apto: "304",
      espaco: "Salão de Festas",
      data: "15/09/2024",
      horario: "18:00 - 23:00",
      status: "pendente",
    },
    {
      id: 3,
      morador: "Roberto Santos",
      apto: "201",
      espaco: "Área da Piscina",
      data: "18/09/2024",
      horario: "10:00 - 16:00",
      status: "confirmada",
    },
    {
      id: 4,
      morador: "Juliana Costa",
      apto: "502",
      espaco: "Quadra Poliesportiva",
      data: "20/09/2024",
      horario: "09:00 - 12:00",
      status: "confirmada",
    },
    {
      id: 5,
      morador: "Marcos Pereira",
      apto: "103",
      espaco: "Espaço Gourmet",
      data: "25/09/2024",
      horario: "19:00 - 23:00",
      status: "pendente",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-none rounded-lg border bg-white gap-0">
          <CardHeader className="p-6 pb-2 gap-0">
            <CardDescription>Total de Reservas</CardDescription>
            <CardTitle className="text-3xl mt-1.5">128</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Este mês</span>
              <span className="flex items-center text-green-600 font-medium">
                +12% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none rounded-lg border bg-white gap-0">
          <CardHeader className="p-6 pb-2 gap-0">
            <CardDescription>Reservas Ativas</CardDescription>
            <CardTitle className="text-3xl mt-1.5">42</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Pendentes: 8</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none rounded-lg border bg-white gap-0">
          <CardHeader className="p-6 pb-2 gap-0">
            <CardDescription>Espaço Mais Reservado</CardDescription>
            <CardTitle className="text-xl mt-1.5 truncate">Espaço Gourmet</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">48 reservas</span>
              <span className="text-blue-600 font-medium">37% do total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none rounded-lg border bg-white gap-0">
          <CardHeader className="p-6 pb-2 gap-0">
            <CardDescription>Morador Mais Ativo</CardDescription>
            <CardTitle className="text-xl mt-1.5 truncate">Carlos Silva</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Apto 102</span>
              <span className="text-blue-600 font-medium">12 reservas</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none rounded-lg border bg-white gap-0">
        <CardHeader className="p-6 gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Todas as Reservas</CardTitle>
              <CardDescription>Gerencie as reservas dos moradores</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1 rounded-sm">
                <Filter className="h-3.5 w-3.5" />
                Filtrar
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1 rounded-sm">
                <Download className="h-3.5 w-3.5" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow style={{lineHeight: "48px"}}>
                  <TableHead className="px-4">Morador</TableHead>
                  <TableHead className="px-4">Espaço</TableHead>
                  <TableHead className="px-4">Data</TableHead>
                  <TableHead className="px-4">Status</TableHead>
                  <TableHead className="text-right px-4">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservasData.map((reserva) => (
                  <TableRow key={reserva.id}>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {reserva.morador
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{reserva.morador}</div>
                          <div className="text-xs text-gray-500">Apto {reserva.apto}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{reserva.espaco}</TableCell>
                    <TableCell>
                      <div>
                        <div>{reserva.data}</div>
                        <div className="text-xs text-gray-500">{reserva.horario}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {reserva.status === "confirmada" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Confirmada
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-50">
                          <Clock className="mr-1 h-3 w-3" />
                          Pendente
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
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          {reserva.status === "pendente" && <DropdownMenuItem>Confirmar reserva</DropdownMenuItem>}
                          <DropdownMenuItem onClick={() => setOpenCancelReserva(true)}>
                            Cancelar reserva
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">Mostrando 5 de 128 reservas</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="rounded-sm">
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-100 rounded-sm">
                1
              </Button>
              <Button variant="outline" size="sm" className="rounded-sm">
                2
              </Button>
              <Button variant="outline" size="sm" className="rounded-sm">
                3
              </Button>
              <Button variant="outline" size="sm" className="rounded-sm">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancel Reservation Dialog */}
      <Dialog open={openCancelReserva} onOpenChange={setOpenCancelReserva}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Cancelar Reserva
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-50 p-4 rounded-md space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Morador:</span>
                <span className="text-sm font-medium">Carlos Silva (Apto 102)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Espaço:</span>
                <span className="text-sm font-medium">Espaço Gourmet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Data:</span>
                <span className="text-sm font-medium">10/09/2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Horário:</span>
                <span className="text-sm font-medium">14:00 - 22:00</span>
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="motivo">Motivo do cancelamento</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenCancelReserva(false)}>
              Voltar
            </Button>
            <Button variant="destructive">Confirmar Cancelamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
