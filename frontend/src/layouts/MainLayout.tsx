import React from 'react';
import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-marcone-lightGrey overflow-hidden">
      {/* Fixed Top Section */}
      <Navbar />

      {/* Main Content Area: This is where Sidebar + Grid will live */}
      <main className="flex flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;