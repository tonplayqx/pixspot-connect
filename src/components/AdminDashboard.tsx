import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  BarChart3, 
  DollarSign, 
  Users, 
  Wifi,
  LogOut,
  Clock,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { AdminSettings } from "./AdminSettings";

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings'>('dashboard');

  // Mock data for demonstration
  const monthStats = {
    totalSales: 1247.50,
    totalConnections: 428,
    salesByPlan: [
      { plan: "30 min", sales: 85, revenue: 170.00 },
      { plan: "1 hora", sales: 156, revenue: 468.00 },
      { plan: "2 horas", sales: 98, revenue: 490.00 },
      { plan: "4 horas", sales: 52, revenue: 416.00 },
      { plan: "8 horas", sales: 37, revenue: 444.00 },
    ]
  };

  if (currentView === 'settings') {
    return <AdminSettings onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-muted-foreground">Sistema de Hotspot Mikrotik</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('settings')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
          <Button variant="destructive" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              R$ {monthStats.totalSales.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12.5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conexões Totais</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthStats.totalConnections}</div>
            <p className="text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 inline mr-1" />
              No mês atual
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plano Mais Vendido</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 hora</div>
            <p className="text-xs text-muted-foreground">
              156 vendas este mês
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status da Rede</CardTitle>
            <Wifi className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Online</div>
            <p className="text-xs text-muted-foreground">
              Conexão com Mikrotik ativa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Plan */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Vendas por Plano - {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </CardTitle>
          <CardDescription>
            Estatísticas detalhadas de vendas e faturamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthStats.salesByPlan.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{plan.plan}</span>
                  </div>
                  <Badge variant="secondary">{plan.sales} vendas</Badge>
                </div>
                <div className="text-right">
                  <div className="font-bold text-success">
                    R$ {plan.revenue.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    R$ {(plan.revenue / plan.sales).toFixed(2)} média
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total do Mês:</span>
              <span className="text-success">R$ {monthStats.totalSales.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso direto às principais configurações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto flex-col py-4"
              onClick={() => setCurrentView('settings')}
            >
              <Settings className="h-6 w-6 mb-2" />
              <span>Configurar Planos</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex-col py-4"
              onClick={() => setCurrentView('settings')}
            >
              <Wifi className="h-6 w-6 mb-2" />
              <span>Config. Mikrotik</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex-col py-4"
              onClick={() => setCurrentView('settings')}
            >
              <DollarSign className="h-6 w-6 mb-2" />
              <span>Config. PIX</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex-col py-4"
              onClick={() => setCurrentView('settings')}
            >
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Relatórios</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};