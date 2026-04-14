import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Allbooks() {

    const [bookList,setBookList]= useState([])
    const navigate = useNavigate()

   useEffect(() => {
    const fetchBooks = async () => {
        try {
            console.log('🔍 Fetching books...');
            
            const res = await fetch("http://localhost:5000/admin/getBooks", {
                method: "GET", // ✅ Changed from POST to GET
                credentials: "include", // ✅ Moved credentials out of headers
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log('📡 Response status:', res.status);
            console.log('📡 Response ok:', res.ok);

            if (res.status === 401 || res.status === 403) {
                console.log('❌ Unauthorized, redirecting to home');
                navigate("/", { replace: true });
                return
            }

            if (!res.ok) {
                console.log('❌ Response not ok:', res.status);
                const errorData = await res.text(); // Get error message
                console.log('❌ Error data:', errorData);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json(); // ✅ Added missing await
            console.log('📦 Books data:', data);
            setBookList(data);
            
        } catch (error) {
            console.error('💥 Fetch books error:', error);
            // Optionally show error to user
            // setError(error.message);
        }
    }

    fetchBooks();
}, [navigate])


  return (
    <div className='mt-10'>
        <h3 className='my-6'>All Books</h3>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 '>

        {bookList?.map((book)=>(
         <div className='flex flex-col gap-5 border border-gray-300 p-4 rounded-lg'>
            <img src={`http://localhost:5000/images/${book.coverImage}` }/>

            <h6>{book?.title}</h6>

            <span className='text-gray-400'>{book?.author}</span>

            <strong className='text-[#F86D72]'>{book?.price} $</strong>
        </div>
        ))}
       

        </div>
    </div>
  )
}

export default Allbooks