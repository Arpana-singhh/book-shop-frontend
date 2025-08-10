import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();

  // Define routes where you want to hide layout components
  const hideLayout = ['/login', '/verify-email', '/reset-password'];

  // Check if current path is in the hideLayout list
  const shouldHideLayout = hideLayout.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <TopBar />}
      {!shouldHideLayout && <NavBar />}

      <main>
        <Outlet />
      </main>

      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default MainLayout;
