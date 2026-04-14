import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateBook() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [book,setBook] = useState(null)
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        fetch(`http://localhost:5000/books/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            setBook(data)
            setLoading(false)
        })

         .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
    },[id])




    const handleUpdate= async()=>{
        try {
            const res = await fetch(`http://localhost:5000/books/updateBook/${id}`,{
                method:"PUT",
                 headers: { "Content-Type": "application/json" },
                 body:JSON.stringify(book)
            })

            const data = await res.json()
             alert(data.message);
             navigate("/admin")
        } catch (error) {
            console.error("Error updating book:", error);
        }
    }

    const handleChange =(e)=>{
        const {name, value} = e.target
        setBook((prev)=> ({...prev, [name]:value}))
    }

    if(loading) return <p className='mt-44'>Loading...</p>

  return (
    <div className='max-w-lg mx-auto mt-44 p-6 bg-white shadow rounded'>
        <h3 className='mt-5 p-3'>UpdatBook</h3>

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