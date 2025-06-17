
import { Users, Calendar, Clock } from "lucide-react"
import { Button } from "./ui/button.js"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card.js"
import { Badge } from "./ui/badge.js"

interface EspacoCardProps {
  titulo: string
  descricao: string
  imagem?: string
  capacidade?: number
  disponivel?: boolean
  proximaDisponibilidade?: string
  onReservar: () => void
}

const EspacoCard = ({
  titulo,
  descricao,
  imagem,
  capacidade,
  disponivel = true,
  proximaDisponibilidade,
  onReservar,
}: EspacoCardProps) => {
  return (
    <Card className="pb-6 w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        {imagem ? (
          <img
            src={`/images/${imagem}`}
            alt="Imagem do espaço"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-400 via-violet-500 to-violet-600 flex items-center justify-center">
            <div className="text-white text-center">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium opacity-90">Espaço do Condomínio</p>
            </div>
          </div>
        )}

        {/* Badge de disponibilidade */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={disponivel ? "default" : "secondary"}
            className={`${
              disponivel ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {disponivel ? "Disponível" : "Ocupado"}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 truncate">{titulo}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">{descricao}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <div className="space-y-3">
          {/* Capacidade */}
          {capacidade && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-blue-500" />
              <span>
                Capacidade: <strong>{capacidade} pessoas</strong>
              </span>
            </div>
          )}

          {/* Próxima disponibilidade quando ocupado */}
          {!disponivel && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-red-500" />
              <span>
                Indiponivel: <strong>Tente novamente outro dia</strong>
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={onReservar}
          disabled={!disponivel}
          className={`w-full font-medium transition-all duration-200 ${
            disponivel
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {disponivel ? "Reservar" : "Indisponível"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EspacoCard;