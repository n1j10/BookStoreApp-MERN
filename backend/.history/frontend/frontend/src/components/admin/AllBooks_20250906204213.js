import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Allbooks() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [bookList, setBookList] = useState([])
    const navigate = useNavigate()
    const { isAuthenticated, isAdmin, user } = useAuth()

    useEffect(() => {
        console.log('Auth status:', { isAuthenticated, isAdmin, user }) // Debug auth status

        const fetchBooks = async () => {
            try {
                const res = await fetch("http://localhost:5000/admin/getBooks", {
                    method: "GET", // Changed to GET since server expects GET
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                console.log('Response status:', res.status) // Debug response

                if (res.status === 401 || res.status === 403) {
                    setError('Not authorized')
                    navigate("/", { replace: true })
                    return
                }

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const data = await res.json()
                console.log('Fetched data:', data) // Debug received data
                setBookList(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error("Error fetching books:", error)
                setError(error.message)
                navigate("/", { replace: true })
            } finally {
                setLoading(false)
            }
        }

        if (isAuthenticated && isAdmin) {
            fetchBooks()
        } else {
            console.log('Not authenticated or not admin') // Debug auth check
            navigate("/", { replace: true })
        }
    }, [navigate, isAuthenticated, isAdmin])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className='mt-10'>
            <h3 className='my-6'>All Books ({bookList.length})</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {bookList.map((book) => (
                    <div key={book._id} className='flex flex-col gap-5 border border-gray-300 p-4 rounded-lg'>
                        <img 
                            src={`http://localhost:5000/images/${book.coverImage}`} 
                            alt={book.title}
                        />
                        <h6>{book.title}</h6>
                        <span className='text-gray-400'>{book.author}</span>
                        <strong className='text-[#F86D72]'>{book.price} $</strong>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Allbooks