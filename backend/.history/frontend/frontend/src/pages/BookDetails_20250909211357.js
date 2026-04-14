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
    <div>BookDetails</div>
  )
}

export default BookDetails