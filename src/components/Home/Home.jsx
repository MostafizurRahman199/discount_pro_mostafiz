import React from 'react'
import Banner from './Banner'
import TopBrands from './TopBrands'
import BrandSell from './BrandSell'
import FeaturedCategories from './FeaturedCategories'
import WhyChooseUs from './WhyChooseUs'


const Home = () => {
  return (
    <div>
        <Banner />
        <TopBrands />
        <BrandSell />
        <FeaturedCategories />
        <WhyChooseUs />
    </div>
  )
}

export default Home