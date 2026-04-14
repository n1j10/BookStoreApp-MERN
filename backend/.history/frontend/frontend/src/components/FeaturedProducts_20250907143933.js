import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

function FeaturedProducts() {
    const [bookList, setBookList] = useState([]);
    const { addToCart, loading } = useCart();

    useEffect(() => {
        fetch("http://localhost:5000/books/getBooks")
            .then(res => res.json())
            .then(data => setBookList(data))
            .catch(err => console.error("Error fetching books:", err));
    }, []);

    const featuredBooks = bookList?.filter(book => book.isFeatured === true);

    return (
        <div className='mt-10'>
            <h3 className='my-6 text-2xl font-bold'>Featured Products</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {featuredBooks?.map((book) => (
                    <div key={book._id} className='flex items-center justify-center flex-col gap-5 border p-4 border-gray-300 rounded-lg'>
                        <img 
                            className='w-full h-[450px] object-cover' 
                            src={`http://localhost:5000/images/${book.coverImage}`}
                            alt={book.title}
                        />

                        <h6 className='text-lg font-semibold'>{book?.title}</h6>
                        <span className='text-gray-400'>{book?.author}</span>
                        <strong className='text-[#F86D72] text-xl'>${book?.price}</strong>
                        
                        <div className='text-sm text-gray-500'>
                            Stock: {book?.stock}
                        </div>

                        <button 
                            onClick={() => addToCart(book._id)}
                            disabled={loading || book.stock === 0}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                book.stock === 0 
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : loading
                                    ? 'bg-gray-500 text-white cursor-not-allowed'
                                    : 'bg-[#F86D72] text-white hover:bg-[#e55b60]'
                            }`}
                        >
                            {loading 
                                ? 'Adding...' 
                                : book.stock === 0 
                                    ? 'Out of Stock' 
                                    : 'Add to Cart'
                            }
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedProducts;