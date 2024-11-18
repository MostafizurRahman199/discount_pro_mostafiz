import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useFirebaseAuth } from '../Auth/AuthProvider';


const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`${
            index < Math.floor(rating) 
              ? 'text-[#FED12D]' 
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1">{rating}</span>
    </div>
  );
};

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();

  // Fetch brands data
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/brands.json');
        const data = await response.json();
        setBrands(data.brands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleViewCoupons = (brandId) => {
    if (user) {
      navigate(`/brands/${brandId}`);
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#BD9FF5]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8" 
          style={{ color: '#BD9FF5' }}>
        Featured Brands
      </h1> */}

      <div className="text-center mb-12" >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[#BD9FF5]">Featured</span>{' '}
          <span className="text-[#FED12D]">Brands</span>
        </h2>
        <p className="text-gray-600 text-lg">Top brands you can trust</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search brands..."
          className="w-full p-3 border-2 border-[#BD9FF5] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#FED12D] focus:border-transparent "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Brands Grid */}
      <div className="space-y-6">
        {brands
          .filter(brand => 
            brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(brand => (
            <div key={brand._id} 
                 className="p-4 sm:p-6 border rounded-lg shadow-md 
                          flex flex-col sm:flex-row items-center gap-4 sm:gap-6
                          hover:shadow-lg transition-shadow duration-300">
              {/* Logo and Rating */}
              <div className="w-full sm:w-24 flex flex-col items-center">
                <img 
                  src={brand.brand_logo} 
                  alt={brand.brand_name} 
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    e.target.src = '/fallback-image.png';
                  }}
                />
                <div className="mt-2">
                  <RatingStars rating={brand.rating} />
                </div>
              </div>

              {/* Brand Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-bold">{brand.brand_name}</h2>
                <p className="text-gray-600 mt-2">{brand.description}</p>
              </div>

              {/* Action Section */}
              <div className="flex flex-col items-center sm:items-end">
                <button
                  onClick={() => handleViewCoupons(brand._id)}
                  className="px-8 py-3 rounded-lg text-white font-bold transition-transform hover:scale-105 shadow-2xl"
                  style={{ backgroundColor: '#BD9FF5', border: '3px solid #8E24AA'}}
                >
                  View Coupons
                </button>
                
                {brand.isSaleOn && (
                  <div className="mt-4 animate-bounce  text-lg font-bold" 
                       style={{ color: '#FED12D' }}>
                    SALE IS ON!
                  </div>
                )}
              </div>
            </div>
          ))}

        {/* No Results Message */}
        {brands.filter(brand => 
          brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No brands found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;