import React from 'react';
import { FaTag, FaShoppingBag, FaGift, FaMobile } from 'react-icons/fa';
import { MdLaptop, MdHeadphones } from 'react-icons/md';

const FeaturedCategories = () => {
  const categories = [
    { icon: <FaTag />, name: 'Fashion', count: '250+ Deals' },
    { icon: <MdLaptop />, name: 'Electronics', count: '180+ Deals' },
    { icon: <FaGift />, name: 'Gifts', count: '120+ Deals' },
    { icon: <FaMobile />, name: 'Phones', count: '200+ Deals' },
    { icon: <MdHeadphones />, name: 'Accessories', count: '150+ Deals' },
    { icon: <FaShoppingBag />, name: 'Lifestyle', count: '160+ Deals' },
  ];

  return (
    <div className="py-16 bg-white font-poppins">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#9d73f3]">Featured</span>{' '}
            <span className="text-[#FED12D]">Categories</span>
          </h2>
          <p className="text-gray-600 text-lg">Discover deals by category</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gray-50 hover:bg-[#9d73f3] hover:text-white 
                         transition-all duration-300 cursor-pointer text-center group"
            >
              <div className="text-4xl mb-4 text-[#FED12D] group-hover:text-white 
                            transition-colors duration-300 flex justify-center">
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 group-hover:text-white">
                {category.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories; 