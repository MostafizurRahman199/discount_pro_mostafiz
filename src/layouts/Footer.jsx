import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#BD9FF5] to-[#FED12D]">

  

      <div className="container mx-auto px-4 pt-16 pb-8">
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
        
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-yellow-900">
              Discount PRO
            </h3>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for the best discount coupons from popular e-commerce shops in Bangladesh.
            </p>
          </div>

       
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'All Coupons', 'Popular Stores'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-purple-900 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

       
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-purple-900" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-purple-900" />
                <span className="text-sm">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-purple-900" />
                <span className="text-sm">info@discountpro.com</span>
              </div>
            </div>
          </div>

    
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-sm">Subscribe to get special offers and updates!</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-700 w-full"
              />
              <button className="bg-purple-900 px-4 py-2 rounded-r-lg hover:bg-purple-800 transition-colors duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

    
        <div className="flex justify-center space-x-6 mt-8">
          {[
            { icon: FaGithub, link: "#" },
            { icon: FaLinkedin, link: "#" },
            { icon: FaTwitter, link: "#" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              className="transform hover:scale-110 transition-transform duration-300 hover:text-purple-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white flex items-center justify-center gap-1">
            Made with <FaHeart className="text-red-500" /> by Discount PRO Team © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer