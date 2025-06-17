import { Card, CardContent } from "./ui/card.js"
import { Badge } from "./ui/badge.js"
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

interface HistoricoCardProps {
  titulo: string
  descricao: string
  imagem?: string
  dataReservada: string
  status: "concluida" | "cancelada"
}

const HistoricoCard = ({ titulo, descricao, imagem, dataReservada, status }: HistoricoCardProps) => {

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };


  const getStatusConfig = () => {
    switch (status) {
      case "concluida":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Concluída",
        }
      case "cancelada":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <XCircle className="w-3 h-3" />,
          label: "Cancelada",
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Clock className="w-3 h-3" />,
          label: "Desconhecido",
        }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.25 border border-gray-100">
      <CardContent className="p-0">
        <div className="flex items-center">
          {/* Imagem - menor para histórico com espaçamento padronizado */}
          <div className="relative w-20 h-20 flex-shrink-0 p-2">
            <div className="relative w-full h-full rounded-md overflow-hidden">
              {imagem ? (
                <img
                  src={`/images/${imagem}`}
                  alt="Imagem do espaço"
                  className="w-full h-full object-cover filter opacity-70"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center rounded-md">
                  <Calendar className="w-6 h-6 text-white opacity-80" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">

                <h3 className="text-base font-semibold text-gray-900 truncate mb-1">{titulo}</h3>
                <p className="text-sm text-gray-600 line-clamp-1 mb-2">{descricao}</p>

                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-violet-500" />
                  <span className="font-medium">{formatarData(dataReservada)}</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <Badge className={`text-xs flex items-center gap-1 ${statusConfig.color}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HistoricoCard;