import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('full_name');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-400 p-4 text-white flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button
              onClick={handleLogout}
              className="hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:underline">Sign Up</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
