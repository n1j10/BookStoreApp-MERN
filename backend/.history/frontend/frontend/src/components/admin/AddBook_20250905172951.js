import React, { useEffect, useState } from 'react'

function Addbook() {

    const [bookList,setBookList]= useState([])


    useEffect(()=>{
        fetch("http://localhost:5000/books/getBooks").then(res=> res.json())
        .then(data => setBookList(data))
      .catch(err => console.error("Error fetching books:", err))
    },[])


    const featuredBooks = bookList?.filter(book => book.isFeautred===true)
  return (
    <div className='mt-10'>
        <h3 className='my-6'>Featured Products</h3>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 '>

        {featuredBooks?.map((book)=>(
         <div className='flex flex-col gap-5 border border-gray-300 p-4 rounded-lg'>
            <img/>

            <h6>{book?.title}</h6>

            <span className='text-gray-400'>{book?.author}</span>

            <strong className='text-[#F86D72]'>{book?.price} $</strong>
        </div>
        ))}
       

        </div>
    </div>
  )
}

export default Addbook