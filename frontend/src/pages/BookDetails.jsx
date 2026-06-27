import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../auth/CartContext'
import { apiFetch, parseApiResponse, buildApiUrl } from '../utils/api'
function BookDetails() {

    const {id} = useParams()

    const [book,setBook] = useState(null)

    const [loading, setLoading] = useState(true);

 const [message, setMessage] = useState("");

    const {addToCart} = useCart()


    useEffect(()=>{
      let isMounted = true

      const loadBook = async () => {
        try {
          const response = await apiFetch(`/books/${id}`)
          const result = await parseApiResponse(response, {
            fallbackError: "Error fetching book",
          })
          if (!isMounted) return


          if (result.ok && result.data) {
            setBook(result.data)
          } else {
            setBook(null)
            console.error(result.message || "Error fetching book")
          }
        } catch (err) {
          if (!isMounted) return
          setBook(null)
          console.error("Error fetching book:", err);
        } finally {
          if (isMounted) {
            setLoading(false)
          }
        }
      }

      loadBook()

      return () => {
        isMounted = false
      }
    },[id])


    if (loading)
  return (
    <div className=" flex justify-center items-center mt-44">
      <div className="w-10 h-10 border-4 border-[#F86D72] border-t-transparent rounded-full animate-spin"></div>
      
    </div>
  );

  if (!book) {
    return <p className="mt-44 text-center">Book not found.</p>;
  }

  return (
    <div className='mt-56 max-w-6xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2  gap-10 items-start  bg-white shadow-md rounded-lg p-6'>

        <div className='flex justify-center'>
        <img className='w-80 h-[450px] object-cover rounded-lg shadow' src={book?.coverImage?.startsWith('http') ? book.coverImage : buildApiUrl(`/images/${book?.coverImage?.replace(/^\/+/, '') || 'fallback'}`)} alt={book?.title || "Book cover"}/>
        </div>

        <div>
            <h3 className='mb-5'>{book?.title}</h3>
         <p className='text-lg text-gray-600 mb-2'>{book.author}</p>
       <p className="text-gray-500 mb-4 leading-relaxed">{book.description}</p>
       <p className="text-2xl font-bold text-[#F86D72] mb-2">{book.price} $</p>   

       <p className={`${book?.stock > 0 ? "text-green-600" : "text-red-600"}`}>
        
        {book?.stock > 0 ?   `${book?.stock} Available`    : "Out of Stock"}
        </p> 

        <div className='mt-5'>
        <span className='text-gray-500 '>{book?.category?.name}</span>
               </div>

           <button
            onClick={() => {addToCart(book._id); 
                setMessage("Added To Cart Successfully")
              }}

              disabled={book.stock === 0}
              className=" mt-7 whitespace-nowrap w-44 disabled:bg-gray-400"
            >
              {book.stock === 0 ? "Out of stock" : "Add to Cart"}
            </button>   

             {message && (
        <div className="mb-4 p-3  mt-5 rounded bg-green-100 text-green-700 text-center">
          {message}
        </div>
      )} 
        </div>
        </div>
    </div>
  )
}

export default BookDetails
