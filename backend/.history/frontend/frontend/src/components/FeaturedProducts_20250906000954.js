import React, { useEffect, useState } from 'react'

function FeaturedProducts() {

    const [bookList,setBookList]= useState([])


    useEffect(()=>{
        fetch("http://localhost:5000/books/getBooks").then(res=> res.json())
        .then(data => setBookList(data))
      .catch(err => console.error("Error fetching books:", err))
    },[])


    const featuredBooks = bookList.filter(book => book.isFeautred===true)
  return (
    <div className='mt-10'>
        <h3 className='my-6'>Featured Products</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  '>

        {featuredBooks?.map((book)=>(
         <div className='flex items-center justify-center flex-col  border border-gray-300  rounded-lg'>
         <img className='w-[350px] h-[450px] object-cover' src={`http://localhost:5000/images/${book.coverImage}` }/>


            <h6>{book?.title}</h6>

            <span className='text-gray-400'>{book?.author}</span>

            <strong className='text-[#F86D72]'>{book?.price} $</strong>
        </div>
        ))}
       

        </div>
    </div>
  )
}

export default FeaturedProducts