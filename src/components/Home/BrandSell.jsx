import React from 'react';
import { useEffect, useState } from 'react';
import BrandSellCard from './BrandSellCard';

const BrandSell = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch('/brands.json')
      .then(res => res.json())
      .then(data => {
        const brandsOnSale = data.brands.filter(brand => brand.isSaleOn);
        setBrands(brandsOnSale);
      });
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[#BD9FF5]">Hot</span>{' '}
          <span className="text-[#FED12D]">Deals</span>
        </h2>
        <p className="text-gray-600 text-lg">Exclusive offers from top brands</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {brands.map(brand => (
          <BrandSellCard key={brand._id} brand={brand} />
        ))}
      </div>
    </section>
  );
};

export default BrandSell;