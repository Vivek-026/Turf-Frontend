import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, clearError } from '../store/slices/authSlice';
import { XMarkIcon, Bars3Icon, UserCircleIcon, HomeIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setShowUserMenu(false);
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/turf', label: 'Find Turf', icon: MapPinIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon, requiresAuth: true },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 shadow-2xl backdrop-blur-sm sticky top-0 z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center group">
                <Link to="/" className="flex items-center space-x-2 transform hover:scale-105 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">ST</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    SportTurf
                  </span>
                </Link>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="group px-4 py-2 rounded-xl text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center space-x-2 border border-transparent hover:border-white/20"
                      >
                        <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 group"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <UserCircleIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">{user?.name || 'User'}</span>
                    <svg className={`h-4 w-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-blue-100 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm font-medium border border-transparent hover:border-white/20"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
                ) : (
                  <Bars3Icon className="h-6 w-6 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-4 pt-2 pb-3 space-y-1 bg-gradient-to-b from-transparent to-black/10 backdrop-blur-sm">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-white/20 mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-2 text-blue-100">
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="text-sm font-medium">{user?.name || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-all duration-300"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-xl text-base font-medium text-blue-100 hover:text-white hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Backdrop blur overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;