"use client";

import React from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import ClientLayout from "@/components/ClientLayout";
import { usePathname } from 'next/navigation';

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

const ClientThemeProvider: React.FC<ClientThemeProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {isDashboardRoute ? (
        children
      ) : (
        <ClientLayout>
          {children}
        </ClientLayout>
      )}
    </ThemeProvider>
  );
};

export default ClientThemeProvider; 