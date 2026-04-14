import { createContext, useContext, useEffect, useState } from "react";

const CartContext  =  createContext()

export const CartProvider =({children})=>{
        const [cart,setCart] = useState({
            items:[],
            totalAmount:0,
            totalItems: 0

        })

    const [loading, setLoading] = useState(false);    
 const [books, setBooks] = useState([]);
      // Get cart from backend
const getCart = async()=>{
    try {
        setLoading(true)
        const response = await fetch ("http://localhost:5000/carts",{
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



const getBooks = async() => {
    try {
        setLoading(true)
        const response = await fetch("http://localhost:5000/books/getBooks")
        if(response.ok){
            const data = await response.json()
            setBooks(data)
        }
    } catch (error) {
        console.error('Error getting books:', error);  
    } finally {
        setLoading(false) // Add this line!
    }
}


  // Update local book stock

   const updateLocalBookStock = (bookId,stockChange)=>{
    setBooks(prev=>prev.map(book => book._id === bookId ? { ...book, stock: book.stock + stockChange } : book))
   }
    const addToCart = async(bookId)=>{
        try {
            setLoading(true)
            const response= await fetch("http://localhost:5000/carts/add",{
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
                  updateLocalBookStock(bookId, -1);
                alert('Added to cart!');
            }else{
                alert(data.message);
            }
        } catch (error) {
           alert('Error adding to cart');
           console.error('Error:', error);
        }finally{
            setLoading(false)

        }
    }

     // Update quantity
     const updateQuantity = async(bookId, newQuantity)=>{
        try {
            setLoading(true)

            // Find current quantity in cart

            const currentItem = cart.items.find(item => item.book._id === bookId)
            const oldQuantity =  currentItem ? currentItem.quantity : 0
             const quantityDifference = newQuantity - oldQuantity;

            const response = await fetch("http://localhost:5000/carts/update",{
                method:"PUT",
                 headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body:JSON.stringify({bookId,quantity: newQuantity})
            })

            const data = await response.json()
             if (response.ok) {
                setCart(data.cart);
                updateLocalBookStock(bookId, -quantityDifference);
            }else{
               alert(data.message);
            }
        } catch (error) {
             alert('Error updating cart');
            console.error('Error:', error);
        }finally{
            setLoading(false)
        }
 }

        // Remove item
        const removeItem = async(bookId)=>{
               try {
                 setLoading(true);

              // Find current quantity to restore stock
       const currentItem = cart.items.find(item => item.book._id === bookId);
            const quantityToRestore = currentItem ? currentItem.quantity : 0;

                const response = await fetch(`http://localhost:5000/carts/remove/${bookId}`,{
                 method: 'DELETE',
                credentials: 'include'
                })

                const data = await response.json();
                if (response.ok) {
                setCart(data.cart);
               updateLocalBookStock(bookId, quantityToRestore);
            }else{
                 alert(data.message);
            }
               } catch (error) {
            alert('Error removing item');
            console.error('Error:', error);
               }finally {
            setLoading(false);
        }
        }
       

        // Get current stock for a book (from local state)
       const getBookStock =(bookId)=>{
        const book = books.find(b => b._id === bookId)

          return book ? book.stock : 0;
       } 

        // Check if book is in cart
    const isInCart = (bookId) => {
        return cart.items.some(item => item.book._id === bookId);
    };

       // Get quantity of book in cart
       const getCartQuantity =(bookId)=>{
        const item = cart.items.find(item=> item.book._id === bookId)
        return item ? item.quantity : 0;
       }



      // Load cart when component mounts
        useEffect(()=>{
            getCart()
            getBooks();
        },[])
    

        const count =  cart?.totalItems ??  cart.items.reduce((s,it)=>s + (Number(it.quantity)|| 0)) 
     return(

        <CartContext.Provider value={{
            cart,
            count,
            loading,
            getBookStock,
            getCartQuantity,
            getBooks,
           isInCart,
            addToCart,
            updateQuantity,
            removeItem,
           
            getCart
        }}>{children}</CartContext.Provider>
     )

}

export const useCart=()=>{
const context = useContext(CartContext)
 return context;
}