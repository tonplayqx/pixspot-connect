import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomerPortal } from "@/components/CustomerPortal";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Shield, Wifi } from "lucide-react";

const Index = () => {
  const [view, setView] = useState<'customer' | 'admin-login' | 'admin-dashboard'>('customer');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setView('customer');
  };

  if (view === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  if (view === 'admin-dashboard' && isAdminLoggedIn) {
    return (
      <Layout>
        <AdminDashboard onLogout={handleAdminLogout} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Admin Access Button */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setView('admin-login')}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Acesso Admin
          </Button>
        </div>

        {/* Customer Portal */}
        <CustomerPortal />
      </div>
    </Layout>
  );
};

export default Index;
