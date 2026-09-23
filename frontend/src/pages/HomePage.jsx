import React from 'react'
import Hero from '../features/books/components/Hero'
import Highlights from '../features/books/components/Highlights'
import FeaturedProducts from '../features/books/components/FeaturedProducts'
import OnSaleProducts from '../features/books/components/OnSaleProducts'
import DiscountPercent from '../features/books/components/DiscountPercent'
function Home() {
  return (
    <div>
        <Hero/>
        
        <div className='p-10 lg:px-52'>
        <Highlights/>
        <FeaturedProducts/>
         <OnSaleProducts/>
           <DiscountPercent/>
          </div>
    </div>
  )
}

export default Home
