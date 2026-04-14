import React, { useEffect, useState } from 'react'
import { useCart } from '../auth/CartContext';

function FeaturedProducts() {

    const [bookList,setBookList]= useState([])

    const { books, addToCart, loading, getBookStock, isInCart, getCartQuantity } = useCart();



    useEffect(()=>{
        fetch("http://localhost:5000/books/getBooks").then(res=> res.json())
        .then(data => setBookList(data))
      .catch(err => console.error("Error fetching books:", err))
    },[])


    const featuredBooks = books?.filter(book => book.isFeautred===true)
  return (
    <div className='mt-10'>
        <h3 className='my-6'>Featured Products</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>

        {featuredBooks?.map((book)=>{

          const currentStock = getBookStock(book._id)
          const inCart = isInCart(book._id)
          const cartQuantity =getCartQuantity(book._id)
          
       
           return(
            
          
    <div className='flex items-center justify-center flex-col gap-5   border p-4 border-gray-300  rounded-lg'>
         <img className='w-full h-[450px] object-cover' src={`http://localhost:5000/images/${book.coverImage}` }/>


            <h6>{book?.title}</h6>

            <span className='text-gray-400'>{book?.author}</span>

            <strong className='text-[#F86D72]'>{book?.price} $</strong>
          
          <div className='text-sm text-gray-500'>
            {currentStock > 0  ? `${currentStock} in stock` : 'Out of stock'}
           </div>

           {inCart && (
            <div>{cartQuantity} in cart</div>
           )}
      <button  onClick={()=> addToCart(book._id)} className="whitespace-nowrap w-44">{loading ? "Adding To cart" : book.stock=== 0 ? "Out Of stock":"Add To cart"}</button>
        </div>
         )
         })}
       

        </div>
    </div>
  )
}

export default FeaturedProducts