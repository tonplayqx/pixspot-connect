import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, QrCode, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface QRCodeDisplayProps {
  plan: {
    id: number;
    duration: number;
    price: number;
    label: string;
  };
  onBack: () => void;
}

export const QRCodeDisplay = ({ plan, onBack }: QRCodeDisplayProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'expired'>('pending');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate payment detection
  const simulatePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('completed');
    }, 2000);
  };

  if (paymentStatus === 'completed') {
    return (
      <div className="max-w-md mx-auto">
        <Card className="text-center shadow-success">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-success rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-success-foreground" />
            </div>
            <CardTitle className="text-success">Pagamento Confirmado!</CardTitle>
            <CardDescription>
              Seu acesso à internet foi liberado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-success/10 p-4 rounded-lg">
              <div className="text-lg font-semibold text-success">
                {plan.label} de acesso
              </div>
              <div className="text-sm text-muted-foreground">
                Válido por {plan.duration} minutos
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Você já pode navegar normalmente. A conexão será automaticamente desconectada ao final do período.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === 'expired') {
    return (
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-destructive/10 rounded-full mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-destructive">QR Code Expirado</CardTitle>
            <CardDescription>
              O tempo limite para pagamento foi excedido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Por favor, selecione novamente o plano desejado para gerar um novo QR Code.
            </p>
            <Button onClick={onBack} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Planos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-network">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-lg">Finalize o Pagamento</CardTitle>
              <CardDescription>
                Escaneie o QR Code com seu app de banco
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plan Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{plan.label} de acesso</div>
                <div className="text-sm text-muted-foreground">
                  {plan.duration} minutos
                </div>
              </div>
              <div className="text-xl font-bold text-primary">
                R$ {plan.price.toFixed(2)}
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center space-y-4">
            <div className="w-48 h-48 bg-white rounded-lg shadow-elegant mx-auto flex items-center justify-center border-2 border-muted">
              <div className="text-center space-y-2">
                <QrCode className="h-16 w-16 text-muted-foreground mx-auto" />
                <div className="text-xs text-muted-foreground px-4">
                  QR Code do PIX seria gerado aqui via API do Mercado Pago
                </div>
              </div>
            </div>
            
            {/* Timer */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Expira em:</span>
              <span className="font-mono font-semibold text-primary">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">1</span>
              </div>
              <div>Abra o app do seu banco ou carteira digital</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">2</span>
              </div>
              <div>Escaneie o QR Code acima</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">3</span>
              </div>
              <div>Confirme o pagamento de R$ {plan.price.toFixed(2)}</div>
            </div>
          </div>

          {/* Demo Button */}
          <Button 
            onClick={simulatePayment} 
            variant="success" 
            className="w-full"
            disabled={paymentStatus === 'processing'}
          >
            {paymentStatus === 'processing' ? 'Processando...' : 'Simular Pagamento (Demo)'}
          </Button>

          {paymentStatus === 'processing' && (
            <div className="text-center text-sm text-muted-foreground">
              Detectando pagamento...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};