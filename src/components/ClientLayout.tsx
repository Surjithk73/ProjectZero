"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default ClientLayout; 