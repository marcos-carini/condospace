import "../pages/Contato.css"
import Layout from '../components/Layout.jsx'
import Divisoria from '../components/Divisoria.jsx'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.js"
import { Button } from "../components/ui/button.js"
import { Separator } from "../components/ui/separator.js"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Building2,
  Headphones,
  ExternalLink,
  Copy,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

const Contato = () => {
  const [copiedEmail, setCopiedEmail] = useState(null);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedEmail(type)
      setTimeout(() => setCopiedEmail(null), 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }
  
  const openWhatsApp = (number, message) => {
    const cleanNumber = number.replace(/\D/g, "")
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/55${cleanNumber}?text=${encodedMessage}`, "_blank")
  }

  const openMaps = (address) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }
  return (
    <Layout activePage="contato">

        <Divisoria titulo="Contato"/>
        <div className="grid grid-cols-1 gap-8 mb-12 mt-4">
          {/* Suporte CondoSpace */}
          <Card className="bg-gradient-to-r from-white to-violet-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="space-y-1.5 p-6 bg-gradient-to-r from-violet-500 to-violet-600 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Suporte CondoSpace</CardTitle>
                  <p className="text-violet-100 text-sm">Suporte técnico e dúvidas sobre o sistema</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Nossa equipe de suporte está pronta para ajudar com questões técnicas, dúvidas sobre funcionalidades e
                melhorias no sistema.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600 truncate overflow-hidden whitespace-nowrap">
                        condospace@contato.com.br
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("condospace@contato.com.br", "condospace")}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {copiedEmail === "condospace" ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">(11) 98765-6789</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openWhatsApp("11987656789", "Olá! Preciso de suporte técnico do CondoSpace.")}
                    className="text-green-600 hover:text-green-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>

                {/* Horário */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Horário de Atendimento</p>
                    <p className="text-sm text-gray-600">Segunda a Sexta: 8h às 18h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suporte Condomínio */}
          <Card className="bg-gradient-to-r from-white to-blue-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="space-y-1.5 p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Suporte Condomínio</CardTitle>
                  <p className="text-blue-100 text-sm">Portaria e administração predial</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Contato direto com a administração do condomínio para questões sobre reservas, regras e informações
                gerais.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600 truncate overflow-hidden whitespace-nowrap">administracao@condominio.com.br</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("administracao@condominio.com.br", "condominio")}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {copiedEmail === "condominio" ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp Portaria</p>
                      <p className="text-sm text-gray-600">(11) 91234-5678</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      openWhatsApp("11912345678", "Olá! Sou morador e preciso de informações sobre reservas.")
                    }
                    className="text-green-600 hover:text-green-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>

                {/* Telefone */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg  hover:bg-gray-100 transition-colors">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Phone className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telefone Fixo</p>
                    <p className="text-sm text-gray-600">(11) 3456-7890</p>
                  </div>
                </div>

                {/* Disponibilidade */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Disponibilidade</p>
                    <p className="text-sm text-gray-600">24 horas por dia, 7 dias por semana</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="gap-0 overflow-hidden">
          <CardHeader className="space-y-1.5 p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Localização</CardTitle>
                <p className="text-emerald-100 text-sm">Encontre-nos facilmente</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Informações de Endereço */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço do Condomínio</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-full mt-1">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Residencial Exemplo</p>
                        <p className="text-gray-600">Rua das Flores, 123</p>
                        <p className="text-gray-600">Jardim Primavera - São Paulo, SP</p>
                        <p className="text-gray-600">CEP: 01234-567</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Pontos de Referência</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Próximo ao Shopping Center Norte</p>
                    <p>• Em frente à Escola Municipal Santos Dumont</p>
                    <p>• 200m da Estação de Metrô Exemplo</p>
                  </div>
                </div>

                <Button
                  onClick={() => openMaps("Rua das Flores, 123, Jardim Primavera, São Paulo, SP")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Abrir no Google Maps
                </Button>
              </div>

              {/* Mapa Placeholder */}
              <div className="bg-gray-100 h-80 lg:h-auto flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20">
                  <img
                    src={`/images/map.jpg`}
                    alt="Imagem do espaço"
                    className="w-full h-full object-cover filter opacity-70"
                  />
                </div>
                <div className="text-center z-10">
                  <img
                    src={`/images/pin.png`}
                    alt="Imagem do espaço"
                    className="w-32 h-32 filter drop-shadow-lg"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-emerald-400 rounded-full opacity-60"></div>
                <div className="absolute top-12 right-8 w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
                <div className="absolute bottom-8 left-12 w-4 h-4 bg-violet-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </CardContent>
        </Card>

    </Layout>
  )
}

export default Contato