import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Clock, DollarSign, Zap, Star, Shield } from "lucide-react";
import { useState } from "react";
import { QRCodeDisplay } from "./QRCodeDisplay";

const plans = [
  { id: 1, duration: 30, price: 2.00, label: "30 min", popular: false },
  { id: 2, duration: 60, price: 3.00, label: "1 hora", popular: true },
  { id: 3, duration: 120, price: 5.00, label: "2 horas", popular: false },
  { id: 4, duration: 240, price: 8.00, label: "4 horas", popular: false },
  { id: 5, duration: 480, price: 12.00, label: "8 horas", popular: false },
];

export const CustomerPortal = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId);
    setShowQRCode(true);
  };

  if (showQRCode && selectedPlan) {
    const plan = plans.find(p => p.id === selectedPlan);
    return <QRCodeDisplay plan={plan!} onBack={() => setShowQRCode(false)} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-primary rounded-xl shadow-network">
            <Wifi className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Acesso à Internet</h1>
            <p className="text-muted-foreground">Escolha seu plano e conecte-se agora</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>Alta Velocidade</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Conexão Segura</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-success" />
            <span>Pagamento Instantâneo</span>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative transition-network hover:shadow-network cursor-pointer ${
              plan.popular ? 'border-primary shadow-network' : ''
            }`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-success">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-3">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <CardTitle className="text-lg">{plan.label}</CardTitle>
              </div>
              <CardDescription className="text-xs">
                {plan.duration} minutos de acesso
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">
                  R$ {plan.price.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  R$ {(plan.price / plan.duration * 60).toFixed(2)}/hora
                </div>
              </div>
              
              <Button 
                variant={plan.popular ? "network" : "default"} 
                className="w-full"
                size="sm"
              >
                Escolher Plano
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">Ativação Instantânea</h3>
          <p className="text-sm text-muted-foreground">
            Seu acesso é liberado automaticamente após o pagamento
          </p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-success rounded-lg mx-auto flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-success-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">Pagamento Seguro</h3>
          <p className="text-sm text-muted-foreground">
            Pague com PIX via Mercado Pago de forma segura
          </p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
            <Wifi className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Alta Velocidade</h3>
          <p className="text-sm text-muted-foreground">
            Conexão rápida e estável para suas necessidades
          </p>
        </div>
      </div>
    </div>
  );
};