import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { FaHome, FaFontAwesome, FaUserCircle, FaCode, FaTags, FaUser, FaInfoCircle } from 'react-icons/fa';


const Navbar = () => {

  
  // ___________________________hooks

  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState(location.pathname);
  const { user, logOut, loading } = useFirebaseAuth();






  // ___________________________useEffect update activeLink

  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);




  // ___________________________loading check

  if (loading) {
    return <div className="h-16" />; 
  }




  // ___________________________link style helper

  const getLinkStyle = (path) => `
    relative px-3 py-2 text-sm font-medium transition-colors duration-200
    ${activeLink === path 
      ? 'text-[#8446f8]' 
      : 'text-gray-700 hover:text-[#8446f8]'
    }
    before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
    before:bg-[#8446f8] before:transform before:scale-x-0 before:transition-transform
    before:duration-300 hover:before:scale-x-100
    ${activeLink === path ? 'before:scale-x-100' : ''}
  `;




  // ___________________________logout handler


  const handleLogout = async () => {
    try {
      await logOut();
     
    } catch (error) {
      console.error('Logout error:', error);
    }
  };





  // ___________________________getProfileImage helper function

  const getProfileImage = (user) => {
    if (user?.photoURL) {
        return user?.photoURL;
    }
    
    if (user?.providerData) {
        for (const provider of user.providerData) {
            if (provider.photoURL) {
                return provider.photoURL;
            }
        }
    }
    
    return 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
  };








  // ___________________________ProfileImage component

  const ProfileImage = ({ user }) => {
    const [imageError, setImageError] = React.useState(false);
    const imageUrl = !imageError ? getProfileImage(user) : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

    return (
        <img
            className="h-8 w-8 rounded-full object-cover border border-gray-200"
            src={imageUrl}
            alt={user.displayName || 'Profile'}
            onError={() => setImageError(true)}
        />
    );
  };






  return (
    <nav className="bg-white/80 backdrop-blur-md  shadow-lg w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Updated for better mobile display */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-8 w-auto sm:h-12"
                src="https://t4.ftcdn.net/jpg/03/02/68/11/360_F_302681154_9HOWdvGLtCKpfwO5B85yESszG7MfmlUl.jpg"
                alt="Logo"
              />
              <span className="text-lg sm:text-xl font-bold text-blue-600 truncate">
              Discount PRO
              </span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link to="/" className={getLinkStyle('/')} onClick={() => setActiveLink('/')}>
              <FaHome className="inline-block mr-1" /> Home
            </Link>
            <Link to="/brands" className={getLinkStyle('/brands')} onClick={() => setActiveLink('/brands')}>
              <FaTags className="inline-block mr-1" /> Brands
            </Link>
           {
            user && (
              <Link to="/my-profile" className={getLinkStyle('/my-profile')} onClick={() => setActiveLink('/my-profile')}>
                <FaUser className="inline-block mr-1" /> Profile
              </Link>
           )}
            <Link to="/about" className={getLinkStyle('/about')} onClick={() => setActiveLink('/about')}>
              <FaInfoCircle className="inline-block mr-1" /> About
            </Link>
          </div>



          {/* User Profile/Login Button - Updated for mobile */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-4">
                <button className="flex items-center space-x-2">
                  <ProfileImage user={user} />
                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                  </span>
                </button>
             
  
                <button
                  onClick={handleLogout}
                  className="bg-[#FED12D]  px-6 py-2 rounded-3xl text-white font-semibold transition-transform hover:scale-105 shadow-2xl  hover:bg-[#BD9FF5] "
                    >
                      Logout
                    </button>

              </div>
            ) : (
              <>
              <Link
                to="/login"
               className=" px-6 py-2 rounded-3xl text-white font-bold transition-transform hover:scale-105 shadow-2xl bg-[#BD9FF5] "
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#FED12D]    px-6 py-2 rounded-3xl text-white font-bold transition-transform hover:scale-105 shadow-2xl"
              >
                Register
              </Link>
              </>
            )}
          </div>




          {/* Mobile menu button - Updated styling */}
          <div className="md:hidden flex items-center ml-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>




   
      <div 
        className={`
          md:hidden fixed  top-16 bg-white shadow-lg
          transform transition-all duration-300 ease-in-out z-100
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
        `}
      >
      
        <div className="absolute inset-0 bg-blue-50" />
        
      
        <div className="relative px-4 pt-2 pb-3 space-y-2">
          <Link 
            to="/" 
            className={`block ${getLinkStyle('/')}`}
            onClick={() => {
              setActiveLink('/');
              setIsMobileMenuOpen(false);
            }}
          >
            <FaHome className="inline-block mr-1" /> Home
          </Link>
          <Link 
            to="/treatments" 
            className={`block ${getLinkStyle('/treatments')}`}
            onClick={() => {
              setActiveLink('/treatments');
              setIsMobileMenuOpen(false);
            }}
          >
            <FaTags className="inline-block mr-1" /> All Treatments
          </Link>
          <Link 
            to="/profile" 
            className={`block ${getLinkStyle('/profile')}`}
            onClick={() => {
              setActiveLink('/profile');
              setIsMobileMenuOpen(false);
            }}
          >
            <FaUser className="inline-block mr-1" /> Profile
          </Link>
          <Link 
            to="/my-appointments" 
            className={`block ${getLinkStyle('/my-appointments')}`}
            onClick={() => {
              setActiveLink('/my-appointments');
              setIsMobileMenuOpen(false);
            }}
          >
            My Appointments
          </Link>
          
          {/* Add login button for mobile */}
          {!user && (
            <Link 
              to="/login" 
              className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {user && (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 py-2 text-center">
          <p className="text-purple-800 font-medium">
            Welcome, {user.displayName || 'User'}!
          </p>
        </div>
      )}
    </nav>
  )
}

export default Navbar