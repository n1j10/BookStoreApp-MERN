import React, { useEffect, useState } from 'react'
import { useCart } from '../auth/CartContext'

function Cart() {

    const {getCart, cart ,updateQuantity, removeItem} = useCart()
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchCart =async()=>{
            setLoading(true)
            await getCart()
            setLoading(false)
        }
        fetchCart()
    },[])

    if(loading){
        <div className='flex items-center justify-center'>
            <div className='w-8 h-8 animate-spin bg-red-400 rounded-full'></div>
        </div>

    }

    if(!cart || !cart.items ){
        <div className='mt-40'>your cart is empty</div>
    }

  return (
    <div className='mt-40 p-5'>
     <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

     <div className='grid gap-4'>
        {cart?.items?.map((item)=>(
            <div className='flex items-center justify-between border  p-4'>

              <img className='w-20 h-28 object-cover rounded' src={`http://localhost:5000/images/${item?.book?.coverImage}`}/>  

              <div className='flex-1 ml-4'>
                <h4>{item.book.title}</h4>
                  <p className="text-gray-500">{item.book.author}</p>
                  <p className="text-[#F86D72] font-bold">${item.book.price}</p>
              </div>

            </div>
        ))}
     </div>
    </div>
  )
}

export default Cart