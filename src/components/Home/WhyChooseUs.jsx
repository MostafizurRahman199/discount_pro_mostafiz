import React from 'react';
import { FaPercent, FaUserShield, FaClock, FaHeadset } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaPercent />,
      title: 'Best Deals & Offers',
      description: 'Find the most attractive offers from top brands'
    },
    {
      icon: <FaUserShield />,
      title: 'Verified Coupons',
      description: 'All coupons are manually verified for authenticity'
    },
    {
      icon: <FaClock />,
      title: 'Daily Updates',
      description: 'New deals and offers added every day'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Get assistance whenever you need it'
    }
  ];

  return (
    <div className="py-16 bg-gray-50 font-poppins">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#BD9FF5]">Why</span>{' '}
            <span className="text-[#FED12D]">Choose Us</span>
          </h2>
          <p className="text-gray-600 text-lg">What makes us different</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:transform 
                         hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-[#BD9FF5]">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;