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

    if(loading) return <p className='mt-44'>Loading...</p>
  return (
    <div>UpdateBook</div>
  )
}

export default UpdateBook