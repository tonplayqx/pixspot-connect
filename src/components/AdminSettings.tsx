import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, DollarSign, Wifi, Webhook, Save, Moon, Sun, Monitor, Key, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";

interface AdminSettingsProps {
  onBack: () => void;
}

export const AdminSettings = ({ onBack }: AdminSettingsProps) => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  // Admin credentials
  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "admin123",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Plans configuration
  const [plans, setPlans] = useState([
    { id: 1, duration: 30, price: 2.00, label: "30 min" },
    { id: 2, duration: 60, price: 3.00, label: "1 hora" },
    { id: 3, duration: 120, price: 5.00, label: "2 horas" },
    { id: 4, duration: 240, price: 8.00, label: "4 horas" },
    { id: 5, duration: 480, price: 12.00, label: "8 horas" },
  ]);

  // Mikrotik configuration
  const [mikrotikConfig, setMikrotikConfig] = useState({
    ip: "192.168.1.1",
    port: "8728",
    username: "admin",
    password: ""
  });

  // Payment configuration
  const [paymentConfig, setPaymentConfig] = useState({
    pixKey: "",
    webhookPort: "3001"
  });

  const handlePlanUpdate = (id: number, field: string, value: string | number) => {
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, [field]: value } : plan
    ));
  };

  const handleSave = (section: string) => {
    toast({
      title: "Configurações salvas",
      description: `${section} foi atualizada com sucesso.`,
    });
  };

  const handleCredentialsUpdate = () => {
    if (adminCredentials.newPassword !== adminCredentials.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    
    if (adminCredentials.newPassword.length < 6) {
      toast({
        title: "Erro", 
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    // Update credentials logic here
    setAdminCredentials({
      ...adminCredentials,
      password: adminCredentials.newPassword,
      newPassword: "",
      confirmPassword: ""
    });
    
    toast({
      title: "Credenciais atualizadas",
      description: "Login e senha foram alterados com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie todas as configurações do sistema</p>
        </div>
      </div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Planos
          </TabsTrigger>
          <TabsTrigger value="mikrotik" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Mikrotik
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Pagamento
          </TabsTrigger>
          <TabsTrigger value="webhook" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhook
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Sistema
          </TabsTrigger>
        </TabsList>

        {/* Plans Configuration */}
        <TabsContent value="plans">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Configuração dos Planos</CardTitle>
              <CardDescription>
                Defina os 5 planos de acesso disponíveis para os clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {plans.map((plan, index) => (
                <div key={plan.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor={`duration-${plan.id}`}>Duração (minutos)</Label>
                    <Input
                      id={`duration-${plan.id}`}
                      type="number"
                      value={plan.duration}
                      onChange={(e) => handlePlanUpdate(plan.id, 'duration', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`price-${plan.id}`}>Preço (R$)</Label>
                    <Input
                      id={`price-${plan.id}`}
                      type="number"
                      step="0.01"
                      value={plan.price}
                      onChange={(e) => handlePlanUpdate(plan.id, 'price', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`label-${plan.id}`}>Nome do Plano</Label>
                    <Input
                      id={`label-${plan.id}`}
                      value={plan.label}
                      onChange={(e) => handlePlanUpdate(plan.id, 'label', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={() => handleSave("Configuração dos planos")} variant="network" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Planos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mikrotik Configuration */}
        <TabsContent value="mikrotik">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Configuração do Mikrotik</CardTitle>
              <CardDescription>
                Configure a conexão com o roteador Mikrotik via API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mikrotik-ip">IP do Mikrotik</Label>
                  <Input
                    id="mikrotik-ip"
                    value={mikrotikConfig.ip}
                    onChange={(e) => setMikrotikConfig({ ...mikrotikConfig, ip: e.target.value })}
                    placeholder="192.168.1.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mikrotik-port">Porta da API</Label>
                  <Input
                    id="mikrotik-port"
                    value={mikrotikConfig.port}
                    onChange={(e) => setMikrotikConfig({ ...mikrotikConfig, port: e.target.value })}
                    placeholder="8728"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mikrotik-username">Usuário</Label>
                  <Input
                    id="mikrotik-username"
                    value={mikrotikConfig.username}
                    onChange={(e) => setMikrotikConfig({ ...mikrotikConfig, username: e.target.value })}
                    placeholder="admin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mikrotik-password">Senha</Label>
                  <Input
                    id="mikrotik-password"
                    type="password"
                    value={mikrotikConfig.password}
                    onChange={(e) => setMikrotikConfig({ ...mikrotikConfig, password: e.target.value })}
                    placeholder="Senha do Mikrotik"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Testar Conexão
                </Button>
                <Button onClick={() => handleSave("Configuração do Mikrotik")} variant="network" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Configuration */}
        <TabsContent value="payment">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Configuração do PIX</CardTitle>
              <CardDescription>
                Configure a chave PIX do Mercado Pago para recebimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pix-key">Chave PIX do Mercado Pago</Label>
                <Input
                  id="pix-key"
                  value={paymentConfig.pixKey}
                  onChange={(e) => setPaymentConfig({ ...paymentConfig, pixKey: e.target.value })}
                  placeholder="Digite sua chave PIX"
                />
                <p className="text-sm text-muted-foreground">
                  Esta chave será usada para gerar os QR Codes de pagamento
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Como obter a chave PIX do Mercado Pago:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Acesse sua conta do Mercado Pago</li>
                  <li>Vá em "Receber pagamentos" → "PIX"</li>
                  <li>Copie sua chave PIX configurada</li>
                </ol>
              </div>

              <Button onClick={() => handleSave("Configuração do PIX")} variant="network" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configuração PIX
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhook Configuration */}
        <TabsContent value="webhook">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Configuração do Webhook</CardTitle>
              <CardDescription>
                Configure a porta para receber notificações de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-port">Porta do Webhook</Label>
                <Input
                  id="webhook-port"
                  value={paymentConfig.webhookPort}
                  onChange={(e) => setPaymentConfig({ ...paymentConfig, webhookPort: e.target.value })}
                  placeholder="3001"
                />
                <p className="text-sm text-muted-foreground">
                  Porta onde o servidor irá escutar as notificações do Mercado Pago
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">URL do Webhook:</h4>
                <code className="text-sm bg-background p-2 rounded border block">
                  http://seu-servidor.com:{paymentConfig.webhookPort}/webhook
                </code>
                <p className="text-xs text-muted-foreground">
                  Configure esta URL no painel do Mercado Pago para receber notificações
                </p>
              </div>

              <Button onClick={() => handleSave("Configuração do Webhook")} variant="network" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configuração
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Configuration */}
        <TabsContent value="system">
          <div className="space-y-6">
            {/* Theme Configuration */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Configuração do Tema</CardTitle>
                <CardDescription>
                  Personalize a aparência da interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tema da Interface</Label>
                    <p className="text-sm text-muted-foreground">
                      Escolha entre modo claro, escuro ou automático
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("system")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Credentials */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Credenciais de Acesso</CardTitle>
                <CardDescription>
                  Altere o login e senha do administrador
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Usuário Administrador</Label>
                  <Input
                    id="admin-username"
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                    placeholder="Nome de usuário"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPasswords.current ? "text" : "password"}
                      value={adminCredentials.password}
                      disabled
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPasswords.new ? "text" : "password"}
                      value={adminCredentials.newPassword}
                      onChange={(e) => setAdminCredentials({ ...adminCredentials, newPassword: e.target.value })}
                      placeholder="Digite a nova senha"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={adminCredentials.confirmPassword}
                      onChange={(e) => setAdminCredentials({ ...adminCredentials, confirmPassword: e.target.value })}
                      placeholder="Confirme a nova senha"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleCredentialsUpdate} 
                  variant="network" 
                  className="w-full"
                  disabled={!adminCredentials.newPassword || !adminCredentials.confirmPassword}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Atualizar Credenciais
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};