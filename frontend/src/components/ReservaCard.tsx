import { Button } from "./ui/button.js"
import { Card, CardContent } from "./ui/card.js"
import { Badge } from "./ui/badge.js"
import { Calendar, AlertTriangle } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog.js"

interface ReservaCardProps {
  titulo: string
  descricao: string
  imagem?: string
  dataReservada: string
  status?: "confirmada" | "pendente"
  onCancelar: () => void
}

const ReservaCard = ({
  titulo,
  descricao,
  imagem,
  dataReservada,
  status = "confirmada",
  onCancelar,
}: ReservaCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };


  const handleCancelar = async () => {
    setIsLoading(true)
    setShowCancelDialog(false)
    // Simula um delay para a operação
    setTimeout(() => {
      onCancelar()
      setIsLoading(false)
    }, 1000)
  }

  const handleOpenDialog = () => {
    setShowCancelDialog(true)
  }

  const getStatusColor = () => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800 border-green-200"
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
            {imagem ? (
              <img
                src={`/images/${imagem}`}
                alt="Imagem do espaço"
                className="w-full h-full object-cover filter opacity-70"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-medium opacity-90">Reservado</p>
                </div>
              </div>
            )}

            {/* Badge de status */}
            <div className="absolute top-3 right-3">
              <Badge className={`text-xs ${getStatusColor()}`}>
                {status === "confirmada" ? "Confirmada" : "Pendente"}
              </Badge>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Título e descrição */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{descricao}</p>
              </div>

              {/* Informações da reserva */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Dia Reservado</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{formatarData(dataReservada)}</span>
                </div>
              </div>
            </div>

            {/* Botão de cancelar */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button
                onClick={handleOpenDialog}
                disabled={isLoading}
                variant="destructive"
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Cancelando...
                  </div>
                ) : (
                  "Cancelar Reserva"
                )}
              </Button>
            </div>

            {/* AlertDialog para confirmação */}
            <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Cancelar Reserva
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600">
                    Tem certeza que deseja cancelar a reserva do <strong>{titulo}</strong> para o dia{" "}
                    <strong>{dataReservada}</strong>?
                    <br />
                    <br />
                    Esta ação não pode ser desfeita e o espaço ficará disponível para outros moradores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                    Manter Reserva
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelar} className="bg-red-500 hover:bg-red-600 text-white">
                    Sim, Cancelar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReservaCard;