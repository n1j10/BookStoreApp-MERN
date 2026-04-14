import React from 'react'
import { useCart } from '../auth/CartContext'

function CartPage() {
    const {cart,updateCart,removeFromCart} = useCart()

    if(!cart.items.length === 0){
         <div className="min-h-screen flex items-center justify-center mt-48">
        <p className="text-gray-500 text-lg">🛒 Your Cart Is Empty</p>
      </div>


    }
  return (
    <div className='mt-44 min-h-screen flex items-center justify-center'>
        
        <h3 className="mt-5"> My Cart</h3>

        <div className='space-y-4'>
            {cart?.map((item)=> (
                <div className='flex items-center gap-4 border rounded-lg p-4 shadow-sm'>
                    <img src={`http://localhost:5000/images/${item?.book?.coverImage}`} className='rounded w-24 h-32 object-cover'/>

                    <div className='flex-1'>
                    <h2 className='font-semibold'>{item?.book?.title}</h2>
                  <p className='text-gray-500'>{item.book.author}</p>
                    <p className='text-gray-600 font-bold'>{item.book.price}</p>
                    </div>
                </div>
            ))}
        </div>


    </div>
  )
}

export default CartPage