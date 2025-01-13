import { Outlet, useNavigate } from 'react-router';
import LogoutButton from '../LogoutButton';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

function RootLayout() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (cookies.jwt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/signin');
    }
  }, []);
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar children={<LogoutButton />} />
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-2 col-start-1 h-screen py-4 md:pl-4 md:pr-2 bg-gray-200">
          <Sidebar />
        </div>
        <div className="col-span-10 col-start-3 h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
