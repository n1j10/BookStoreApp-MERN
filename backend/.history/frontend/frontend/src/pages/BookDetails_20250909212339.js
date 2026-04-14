import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
function BookDetails() {

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


        if (loading)
  return (
    <div className=" flex justify-center items-center mt-44">
      <div className="w-10 h-10 border-4 border-[#F86D72] border-t-transparent rounded-full animate-spin"></div>
      
    </div>
  );

  return (
    <div className='mt-56 max-w-6xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2  gap-10 items-start  bg-white shadow-md rounded-lg p-6'>

        <div className='flex justify-center'>
        <img className='w-80 h-[450px] object-cover rounded-lg shadow' src={`http://localhost:5000/images/${book.coverImage}`}/>


        </div>


        <div>
            <h3 className='mb-5'>{book?.title}</h3>
         <p className='text-lg text-gray-600 mb-2'>{book.author}</p>
       <p className="text-gray-500 mb-4 leading-relaxed">{book.description}</p>
       <p className="text-2xl font-bold text-[#F86D72] mb-2">{book.price} $</p>   

       <p className={`${book?.stock > 0 ? "text-green-600" : "text-red-600"}`}>
        
        {book?.stock > 0 ?   `${book?.stock} Available`    : "Out of Stock"}
        </p> 

        <span className='text-gray-500 '>{book?.category?.name}</span>

        </div>
        </div>
    </div>
  )
}

export default BookDetails