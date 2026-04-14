import React, { useState } from 'react'

function FeaturedProducts() {

    const [bookList,setBookList]= useState([])
  return (
    <div>
        <h3>Featured Products</h3>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>

        <div className='flex flex-col gap-5 border border-gray-300'>
            <img/>

            <h6></h6>

            <span></span>

            <strong> $</strong>
        </div>

        </div>
    </div>
  )
}

export default FeaturedProducts