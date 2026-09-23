import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFetch, parseApiResponse } from '../../../lib/api'

function UpdateBook() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [book,setBook] = useState(null)
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
      let isMounted = true
      const loadBook = async () => {
        try {
          const res = await apiFetch(`/books/${id}`)
          const result = await parseApiResponse(res, {
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
    const handleUpdate= async()=>{
        try {
            const res = await apiFetch(`/books/updateBook/${id}`,{
                method:"PUT",
                 headers: { "Content-Type": "application/json" },
                 body:JSON.stringify(book)
            })

            const result = await parseApiResponse(res, {
              fallbackError: "Failed to update book",
            })

            if (!result.ok) {
              alert(result.message || "Failed to update book")
              return
            }

             alert(result.data?.message || "Book updated successfully");
             navigate("/admin")
        } catch (error) {
            console.error("Error updating book:", error);
        }
    }
    const handleChange =(e)=>{
        const {name, value} = e.target
        setBook((prev)=> ({...prev, [name]:value}))
    }
    const handleDelete = async()=>{
        if(!window.confirm("are you sure you want to delete this book")) return
        try {
            const res = await apiFetch(`/books/deleteBook/${id}`,{
                method:"DELETE"
            })
            const result = await parseApiResponse(res, {
              fallbackError: "Failed to delete book",
            })

            if (!result.ok) {
              alert(result.message || "Failed to delete book")
              return
            }
              alert(result.data?.message || "Book deleted successfully");
        navigate("/admin")

        } catch (error) {
              console.error("Error deleting book:", error);
        }
    }
    if(loading) return <p className='mt-44'>Loading...</p>
    if(!book) return <p className='mt-44'>Book not found.</p>




  return (
    <div className='max-w-lg mx-auto mt-44 p-6 bg-white shadow rounded'>
        <h3 className='mb-5'>UpdatBook</h3>

        <input
        className="border p-2 w-full mb-3"
        type="text"
        name="title"
        value={book.title || ""}
        onChange={handleChange}
        placeholder="Title"
      />

       <input
        className="border p-2 w-full mb-3"
        type="text"
        name="author"
        value={book.author || ""}
        onChange={handleChange}
        placeholder="Author"
      />


       <textarea
        className="border p-2 w-full mb-3"
        name="description"
        value={book.description || ""}
        onChange={handleChange}
        placeholder="Description"
      />

       <input
        className="border p-2 w-full mb-3"
        type="number"
        name="price"
        value={book.price || ""}
        onChange={handleChange}
        placeholder="Price"
      />



      <input
        className="border p-2 w-full mb-3"
        type="number"
        name="price"
        value={book.stock || ""}
        onChange={handleChange}
        placeholder="Stock"
      />

      <div className='flex justify-between mt-4'>

         <button
          onClick={handleUpdate} >
          Update
        </button>


        <button className='!bg-red-600'
          onClick={handleDelete} >
          Delete
        </button>

      </div>



    </div>
  )
}

export default UpdateBook
