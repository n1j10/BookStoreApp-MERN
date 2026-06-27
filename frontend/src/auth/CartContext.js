import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch, parseApiResponse } from "../utils/api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);


export function CartProvider({children}){
  
    const [cart , setCart] = useState(null)


    useEffect(()=>{
      let isMounted = true

      const loadCart = async () => {
        try {
          const response = await apiFetch("/carts", { credentials: "include" })
          const result = await parseApiResponse(response, {
            fallbackError: "Failed to load cart",
          })


          if (!isMounted) return

          if (result.ok) {
            setCart(result.data?.cart || null)
          } else {
            setCart(null)
            console.error(result.message || "Failed to load cart")
          }
        } catch (error) {
          if (!isMounted) return
          setCart(null)
          console.error("Failed to load cart", error)
        }
      }

      loadCart()

      return () => {
        isMounted = false
      }
    },[])


  const addToCart = async (bookId) => {
  //! console.log("sending bookId:", bookId);

  const res = await apiFetch("/carts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ bookId })  // ✅ مهم
  });
  const result = await parseApiResponse(res, {
    fallbackError: "Failed to add item to cart",
  });

  if (!result.ok) {
    alert(result.message || "Failed to add item to cart");
    return;
  }
  // //! console.log("server response:", result.data);
  setCart(result.data?.cart || null);
};


     const updateCart = async(bookId, quantity)=>{
        const res = await apiFetch("/carts/update",{
            method:"PUT",
            headers:{
              "Content-Type": "application/json" 
            },
            credentials:"include",
            body:JSON.stringify({bookId,quantity})
        })

       const result = await parseApiResponse(res, {
         fallbackError: "Error updating cart",
       });
      if (!result.ok) {
     
      alert(result.message || "Error updating cart");
      return;
    }

         
         setCart(result.data?.cart || null);
     }

     const removeFromCart = async(bookId)=>{
         const res = await apiFetch(`/carts/remove/${bookId}`,{
         method:"DELETE",
         credentials:"include",
         })
        const result = await parseApiResponse(res, {
          fallbackError: "Failed to remove item from cart",
        });
        if (!result.ok) {
          alert(result.message || "Failed to remove item from cart");
          return;
        }
         setCart(result.data?.cart || null); 
     }
     return(
        <CartContext.Provider value={{cart,addToCart, updateCart, removeFromCart}}>{children}</CartContext.Provider>
     )
}


