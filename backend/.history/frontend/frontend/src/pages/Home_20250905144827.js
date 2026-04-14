import React from 'react'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import FeaturedProducts from '../components/FeaturedProducts'
function Home() {
  return (
    <div>
        <Hero/>
        
        <div className='p-10'>

      
        <Highlights/>
        <FeaturedProducts/>
          </div>
    </div>
  )
}

export default Home