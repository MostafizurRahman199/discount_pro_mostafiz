import React from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../Auth/AuthProvider';

const BrandSellCard = ({ brand }) => {
  const {user}= useFirebaseAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if(user){
      navigate(`/brands/${brand._id}`);
    }else{
      navigate('/login', {state: {from: `/brands/${brand._id}`}});
    }
  }

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

      <div className="absolute top-4 right-4 bg-[#FED12D] text-sm font-semibold px-3 py-1 rounded-full">
        On Sale
      </div>

 
      <div className="relative h-48 bg-gradient-to-b from-[#9d73f3]/10 to-transparent p-6">
        <img 
          src={brand.brand_logo} 
          alt={brand.brand_name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>


      <div className="p-6">
  
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {brand.brand_name}
          </h3>
          <span className="inline-block bg-[#9d73f3]/10 text-[#9d73f3] text-sm font-medium px-3 py-1 rounded-full">
            {brand.category}
          </span>
        </div>

 
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <FaTicketAlt className="text-[#9d73f3]" />
            <span className="font-medium">
              {brand.coupons.length} {brand.coupons.length === 1 ? 'Coupon' : 'Coupons'}
            </span>
          </div>
          
          <button onClick={handleNavigate} className="bg-[#9d73f3] hover:bg-[#9d73f3] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandSellCard; 