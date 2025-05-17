import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

function Header() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-[#ECEFCA] shadow-sm border-b border-[#94B4C1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-xl font-bold text-[#213448]">TaskBoard Pro</span>
            </Link>
            
            {currentUser && (
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <Link 
                  to="/dashboard" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'border-[#547792] text-[#213448]'
                      : 'border-transparent text-[#547792] hover:border-[#94B4C1] hover:text-[#213448]'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/projects" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/projects') || location.pathname.startsWith('/projects/')
                      ? 'border-[#547792] text-[#213448]'
                      : 'border-transparent text-[#547792] hover:border-[#94B4C1] hover:text-[#213448]'
                  }`}
                >
                  Projects
                </Link>
              </nav>
            )}
          </div>
          
          <div className="flex items-center">
            {currentUser ? (
              <div className="ml-3 relative">
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#ECEFCA] focus:ring-offset-1 transition-all hover:scale-105"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-[#213448] flex items-center justify-center text-[#ECEFCA] text-sm font-medium shadow-sm border border-[#94B4C1]">
                    {currentUser.email?.charAt(0).toUpperCase()}
                  </div>
                </button>
                
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#ECEFCA] ring-1 ring-[#94B4C1] divide-y divide-[#94B4C1]">
                    <div className="px-4 py-4">
                      <p className="text-sm font-medium text-[#213448]">Signed in as</p>
                      <p className="text-sm text-[#547792] truncate">{currentUser.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="group flex items-center px-4 py-3 text-[#547792] hover:text-[#213448]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <button
                        className="w-full text-left px-4 py-3 text-sm bg-[#ECEFCA] text-[#547792] hover:bg-[#ECEFCA] hover:text-[#213448] focus:outline-none focus:ring-2 focus:ring-[#94B4C1] focus:ring-offset-1 transition-all text-[18px]"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#ECEFCA] bg-[#547792] hover:bg-[#213448]"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;