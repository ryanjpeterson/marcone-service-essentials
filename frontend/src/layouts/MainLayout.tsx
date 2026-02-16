import React from 'react';
import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    /* h-screen: Full height, relative: for children positioning */
    /* bg-[url('/background.svg')]: Points to public folder, bg-fixed: stays still while scrolling */
    /* bg-cover: covers entire area, bg-center: keeps it centered */
    <div className="relative min-h-screen flex flex-col bg-[url('/background.svg')] bg-fixed bg-cover bg-center overflow-hidden">
      <Navbar />

      <main className="flex flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;