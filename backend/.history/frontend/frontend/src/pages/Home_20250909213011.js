import React from 'react'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import FeaturedProducts from '../components/FeaturedProducts'
function Home() {
  return (
    <div>
        <Hero/>
        
        <div className='p-10 lg:px-52'>

      
        <Highlights/>
        <FeaturedProducts/>
         <OnSaleProducts/>
          </div>
    </div>
  )
}

export default Home