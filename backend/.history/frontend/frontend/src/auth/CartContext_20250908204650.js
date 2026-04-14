import { createContext, useEffect, useState } from "react";

const CartContext = createContext();


export function CartProvider({children}){
    const [cart , setCart] = useState(null)


    useEffect(()=>{
        fetch("http://localhost:5000/carts", {credentials:"include"}).then(res => res.json())
        .then(data =>setCart(data.cart))
    },[])


     const addToCart = async(bookId)=>{
        const res = await fetch("http://localhost:5000/carts/add",{
            method:"POST",
            headers:{
              "Content-Type": "application/json" 
            },
            credentials:"include",
            body:JSON.stringify(bookId)

        })

        const data = await res.json()
        setCart(data.cart)
     }

     const updateCart = async(bookId, quantity)=>{
        const res = await fetch("http://localhost:5000/carts/update",{
             method:"PUT",
            headers:{
              "Content-Type": "application/json" 
            },
            credentials:"include",
            body:JSON.stringify(bookId,quantity)

       
        })

         const data = await res.json();
         setCart(data.cart);
     }


     const removeFromCart = async(bookId)=>{
         const res = await fetch(`http://localhost:5000/carts/${bookId}`,{
            method:"DELETE",
              credentials:"include",

         })

        const data = await res.json();
         setCart(data.cart); 
     }


     return(
        <CartContext.Provider value={{cart,addToCart, updateCart, removeFromCart}}>{children}</CartContext.Provider>
     )


}