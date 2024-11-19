import React from 'react';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';
import brands from '../../../public/brands.json';
import { useFirebaseAuth } from '../../Auth/AuthProvider';


const TopBrands = () => {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();



  return (
    <div className="py-6 md:py-12 bg-gray-50 font-poppins">
      <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[#BD9FF5]">Top</span>{' '}
          <span className="text-[#FED12D]">Brands</span>
        </h2>
        <p className="text-gray-600 text-lg">Top brands in the market</p>
      </div>
        
        <Marquee
          gradient={true}
          speed={50}
          pauseOnHover={true}
          className="py-2 md:py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {brands.brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => navigate(`/brands`)}
              className="mx-4 md:mx-8 cursor-pointer hover:scale-110 transition-transform"
            >
              <img
                src={brand.brand_logo}
                alt={brand.brand_name}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TopBrands;