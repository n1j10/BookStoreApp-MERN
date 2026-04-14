import React, { useEffect } from 'react'
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
    <div>Cart</div>
  )
}

export default Cart