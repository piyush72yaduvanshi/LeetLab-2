import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;