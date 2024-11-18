import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaCopy } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';

import { useFirebaseAuth } from '../Auth/AuthProvider';

const BrandDetails = () => {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user ,} = useFirebaseAuth();

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await fetch('/brands.json');
        const data = await response.json();
        const selectedBrand = data.brands.find(b => b._id === id);
        setBrand(selectedBrand);
      } catch (error) {
        console.error('Error fetching brand details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandDetails();
  }, [id]);

  const handleCopySuccess = () => {
    toast.success('Coupon code copied successfully!', {
      duration: 2000,
      position: 'top-center',
    });
  };

  const handleUseNow = (shopLink) => {
    window.open(shopLink, '_blank');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-gray-600">Please log in to view brand details.</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#BD9FF5]"></div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-gray-600">Brand not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <Toaster />
      
      {/* Header card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#BD9FF5] to-[#FED12D] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <img 
              src={brand.brand_logo} 
              alt={brand.brand_name} 
              className="relative w-40 h-40 object-contain p-4 bg-white rounded-lg"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#BD9FF5] to-[#FED12D] inline-block text-transparent bg-clip-text">
              {brand.brand_name}
            </h1>
            <div className="flex items-center justify-center md:justify-start mb-3 space-x-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`${
                    index < Math.floor(brand.rating) 
                      ? 'text-[#FED12D] transform hover:scale-110 transition-transform' 
                      : 'text-gray-300'
                  } w-6 h-6`}
                />
              ))}
              <span className="ml-2 font-semibold text-lg">{brand.rating}</span>
            </div>
            {brand.description && (
              <p className="text-gray-600 max-w-2xl">{brand.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Coupons Grid card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brand.coupons.map((coupon, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{coupon.description}</h3>
                <p className="text-gray-600 mb-2">{coupon.condition}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#BD9FF5] mr-2"></span>
                  Expires: {new Date(coupon.expiry_date).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between group hover:bg-gray-100 transition-colors">
                  <span className="font-mono font-bold text-lg">{coupon.coupon_code}</span>
                  <CopyToClipboard 
                    text={coupon.coupon_code}
                    onCopy={handleCopySuccess}
                  >
                    <button className="text-[#BD9FF5] hover:text-[#9d73f3] transition-all duration-300 transform group-hover:scale-110">
                      <FaCopy size={24} />
                    </button>
                  </CopyToClipboard>
                </div>

                <button
                  onClick={() => handleUseNow(brand.shop_link)}
                  className="w-full py-3 bg-gradient-to-r from-[#BD9FF5] to-[#FED12D] text-white rounded-lg hover:opacity-90 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                >
                  Use Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDetails; 