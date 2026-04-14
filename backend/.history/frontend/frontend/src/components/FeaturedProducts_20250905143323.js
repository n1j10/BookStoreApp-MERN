import React, { useEffect, useState } from 'react'

function FeaturedProducts() {

    const [bookList,setBookList]= useState([])


    useEffect(()=>{
        fetch("http://localhost:5000/books/getBooks").then(res=> res.json())
        .then(data => setBookList(data))
      .catch(err => console.error("Error fetching books:", err))
    })
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