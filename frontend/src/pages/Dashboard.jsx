
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, Home, Building, LogOut } from "lucide-react"

import { useState } from "react"
import { DashboardTab } from "../components/tabs/DashboardTab"
import { EspacosTab } from "../components/tabs/EspacosTab"
import { MoradoresTab } from "../components/tabs/MoradoresTab"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard"
      case "espacos":
        return "Gerenciar Espaços"
      case "moradores":
        return "Moradores do Condomínio"
      default:
        return "Dashboard"
    }
  }

  const getPageDescription = () => {
    switch (activeTab) {
      case "dashboard":
        return "Visão geral das reservas e estatísticas"
      case "espacos":
        return "Adicione, edite ou remova espaços do condomínio"
      case "moradores":
        return "Lista completa de moradores cadastrados"
      default:
        return "Visão geral das reservas e estatísticas"
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-900 mb-0">CondoSpace Admin</h1>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={handleLogout}>
            <span className="hidden sm:inline">Sair</span>
            <LogOut className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-1">{getPageDescription()}</p>
            </div>
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 rounded-sm border-0">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="espacos" className="flex items-center gap-2 rounded-sm border-0">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Espaços</span>
              </TabsTrigger>
              <TabsTrigger value="moradores" className="flex items-center gap-2 rounded-sm border-0">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Moradores</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tabs Content */}
          <TabsContent value="dashboard">
            <DashboardTab/>
          </TabsContent>

          <TabsContent value="espacos">
            <EspacosTab/>
          </TabsContent>

          <TabsContent value="moradores">
            <MoradoresTab/>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Dashboard