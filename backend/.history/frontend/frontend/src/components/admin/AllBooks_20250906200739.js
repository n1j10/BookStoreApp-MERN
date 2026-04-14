import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' // Adjust path as needed

function Allbooks() {
    const [bookList, setBookList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { user, isAdmin, isAuthenticated, loading: authLoading } = useAuth()

    // Protect the route - redirect if not admin
    useEffect(() => {
        if (!authLoading) {
            console.log('🔒 Checking admin access:', { isAuthenticated, isAdmin, user });
            
            if (!isAuthenticated) {
                console.log('❌ Not authenticated, redirecting to login');
                navigate('/login', { replace: true });
                return;
            }
            
            if (!isAdmin) {
                console.log('❌ Not admin, redirecting to home');
                navigate('/', { replace: true });
                return;
            }
            
            console.log('✅ Admin access granted');
        }
    }, [isAuthenticated, isAdmin, authLoading, navigate]);

    useEffect(() => {
        // Only fetch books if user is admin
        if (!authLoading && isAdmin) {
            fetchBooks();
        }
    }, [authLoading, isAdmin]);

    const fetchBooks = async () => {
        try {
            console.log('🔍 Fetching books...');
            setLoading(true);
            setError(null);
            
            const res = await fetch("http://localhost:5000/admin/getBooks", {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log('📡 Response status:', res.status);
            console.log('📡 Response ok:', res.ok);

            if (res.status === 401) {
                console.log('❌ Unauthorized, redirecting to login');
                navigate("/login", { replace: true });
                return
            }

            if (res.status === 403) {
                console.log('❌ Forbidden, redirecting to home');
                navigate("/", { replace: true });
                return
            }

            if (!res.ok) {
                console.log('❌ Response not ok:', res.status);
                const errorData = await res.text();
                console.log('❌ Error data:', errorData);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('📦 Books data:', data);
            setBookList(data);
            
        } catch (error) {
            console.error('💥 Fetch books error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Show loading while checking authentication
    if (authLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    // Don't render anything if not admin (redirect will happen)
    if (!isAdmin) {
        return null;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading books...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className='mt-10'>
            <h3 className='my-6'>All Books</h3>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {bookList?.map((book, index) => (
                    <div key={book._id || index} className='flex flex-col gap-5 border border-gray-300 p-4 rounded-lg'>
                        <img 
                            src={`http://localhost:5000/images/${book.coverImage}`} 
                            alt={book.title}
                            className="w-full h-48 object-cover rounded"
                        />
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