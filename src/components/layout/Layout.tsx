import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingContact } from './FloatingContact';
import { CartDrawer } from '../common/CartDrawer';
import { PopupBanner } from '../common/PopupBanner';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/demo-admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isAdmin) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased overflow-x-hidden w-full max-w-full">
      <Header />
      <main className="flex-1 pb-16 sm:pb-0 overflow-x-hidden w-full max-w-full">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
      <CartDrawer />
      <PopupBanner />
    </div>
  );
};
