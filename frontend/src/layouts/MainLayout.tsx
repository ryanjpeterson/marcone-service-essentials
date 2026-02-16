import React from 'react';
import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // Change min-h-screen to h-screen to lock the viewport height
    <div className="relative h-screen flex flex-col bg-[url('/background.svg')] bg-fixed bg-cover bg-center overflow-hidden">
      <Navbar />

      {/* overflow-hidden here ensures the main container doesn't scroll */}
      <main className="flex flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;