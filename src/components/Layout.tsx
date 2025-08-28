import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        {title && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};