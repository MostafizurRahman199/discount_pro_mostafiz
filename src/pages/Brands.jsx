import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import Aos from 'aos';


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

  const navigate = useNavigate();
  const { user } = useFirebaseAuth();
  const data = useLoaderData();
  const brands = data.brands;


  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);



  const handleViewCoupons = (brandId) => {
    if (user) {
      navigate(`/brands/${brandId}`);
    } else {
      navigate('/login', { state: { from: `/brands/${brandId}` } });
    }
  };



  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"    

    >
 

    <div data-aos="fade-down">
    <div className="text-center mb-12" >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[#9d73f3]">Featured</span>{' '}
          <span className="text-[#FED12D]">Brands</span>
        </h2>
        <p className="text-gray-600 text-lg">Top brands you can trust</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search brands..."
          className="w-full text-[#9d73f3] font-semibold p-3 border-2 border-[#9d73f3] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#FED12D] focus:border-transparent "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

      {/* Brands Grid */}
      <div className="space-y-6"     
 
      >
        {brands?.filter(brand => 
            brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(brand => (
            <div key={brand._id} 
                 className="p-4 sm:p-6 border rounded-lg shadow-md 
                          flex flex-col md:flex-row items-center gap-4 sm:gap-6
                          hover:shadow-lg transition-shadow duration-300" 
                          data-aos="fade-up"   
                          data-aos-anchor-placement="center-bottom"  
                          >
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
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-xl font-bold">{brand.brand_name}</h2>
                <p className="text-gray-600 mt-2">{brand.description}</p>
                <p className="text-gray-500 mt-2 italic">
                  <span 
                    className="text-white bg-[#FED12D] rounded-3xl px-2 py-1"
                  >
                    #{brand.category}
                  </span>
                </p>
              </div>

              {/* Action Section */}
              <div className="flex flex-col items-center md:items-end">
                <button
                  onClick={() => handleViewCoupons(brand._id)}
                  className="px-8 py-3 rounded-3xl text-white font-bold transition-transform hover:scale-105 shadow-2xl  hover:bg-[#FED12D]  bg-[#9d73f3] "
                  style={{  border: '2px solid #9d73f3'}}
                >
                  View Coupons
                </button>
                
                {brand.isSaleOn && (
                  <div className="mt-4 animate-bounce  text-xl md:text-xl  lg:text-2xl font-bold" 
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