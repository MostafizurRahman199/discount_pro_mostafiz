import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { FaHome, FaFontAwesome, FaUserCircle, FaCode } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut, loading } = useFirebaseAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const getProfileImage = (user) => {
    console.log('User data:', user.photoURL);
    
    if (user?.photoURL) {
      return user.photoURL;
    }
    
    if (user?.providerData?.[0]?.photoURL) {
      return user.providerData[0].photoURL;
    }
    
    return  user.photoURL;
  };

  const ProfileImage = ({ user }) => {
    const [imageError, setImageError] = React.useState(false);
    const imageUrl = !imageError ?  (user.photoURL || getProfileImage(user)) : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

    return (
      <img
        className="h-8 w-8 rounded-full object-cover border border-gray-200"
        src={imageUrl}
        alt={user.displayName || 'Profile'}
        onError={() => setImageError(true)}
      />
    );
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Custom NavLink component with active styles
  const NavItem = ({ to, children }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center space-x-1 py-2 px-3 rounded-lg transition-all duration-200 group
          ${isActive 
            ? 'text-purple-600 bg-purple-50 font-medium' 
            : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50/50'
          }`
        }
      >
        {children}
      </NavLink>
    );
  };

  // Mobile NavLink component
  const MobileNavItem = ({ to, children, onClick }) => {
    return (
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
          ${isActive 
            ? 'text-purple-600 bg-purple-50' 
            : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
          }`
        }
      >
        {children}
      </NavLink>
    );
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-purple-600">
                Discount PRO
              </Link>
            </div>
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              Discount PRO
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItem to="/">
              <FaHome className="group-hover:scale-110 transition-transform duration-200" />
              <span>Home</span>
            </NavItem>
            <NavItem to="/brands">
              <FaFontAwesome className="group-hover:scale-110 transition-transform duration-200" />
              <span>Brands</span>
            </NavItem>
            {user && (
              <NavItem to="/my-profile">
                <FaUserCircle className="group-hover:scale-110 transition-transform duration-200" />
                <span>My Profile</span>
              </NavItem>
            )}
            <NavItem to="/about">
              <FaCode className="group-hover:scale-110 transition-transform duration-200" />
              <span>About Dev</span>
            </NavItem>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <ProfileImage user={user} />
                <span className="text-sm text-gray-700">
                  {user.email || 'No email available'}
                </span>
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-white border-t border-gray-100`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavItem to="/" onClick={() => setIsMenuOpen(false)}>
            <FaHome />
            <span>Home</span>
          </MobileNavItem>
          <MobileNavItem to="/brands" onClick={() => setIsMenuOpen(false)}>
            <FaFontAwesome />
            <span>Brands</span>
          </MobileNavItem>
          {user && (
            <MobileNavItem to="/my-profile" onClick={() => setIsMenuOpen(false)}>
              <FaUserCircle />
              <span>My Profile</span>
            </MobileNavItem>
          )}
          <MobileNavItem to="/about" onClick={() => setIsMenuOpen(false)}>
            <FaCode />
            <span>About Dev</span>
          </MobileNavItem>

          {/* Mobile Auth Section */}
          <div className="px-4 py-2 border-t border-gray-100 mt-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ProfileImage user={user} />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg text-center hover:shadow-lg transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg text-center hover:shadow-lg transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      {user && (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 py-2 text-center">
          <p className="text-purple-800 font-medium">
            Welcome, {user.displayName || 'User'}!
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;