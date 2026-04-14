import { createContext, useState } from "react";

const CartContext  =  createContext()

export const CartProvider =({children})=>{
        const [cart,setCart] = useState({
            items:[],
            totalAmount:0,
            totalItems: 0

        })

    const [loading, setLoading] = useState(false);    

      // Get cart from backend
const getCart = async()=>{
    try {
        setLoading(true)
        const response = await fetch ("http://localhost:5000/cart",{
          credentials: 'include'
        })

        if(response.ok){
            const data = await response.json()
            setCart(data.cart)
        }
    } catch (error) {
       console.error('Error getting cart:', error);  
    }finally{
        setLoading(false)
    }
}
    const addToCart = async(bookId)=>{
        try {
            setLoading(true)
            const response= await fetch("http://localhost:5000/cart/add",{
                method:"POST",
                 headers: {
                    'Content-Type': 'application/json',
                },

                credentials: 'include',
                body:JSON.stringify({bookId, quantity:1})
            })

            const data = await response.json();
            if(response.ok){
                setCart(data.cart)
                alert('Added to cart!');
            }else{
                alert(data.message);
            }
        } catch (error) {
            
        }
    }
}