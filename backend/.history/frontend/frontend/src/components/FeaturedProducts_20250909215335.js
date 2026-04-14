import React, { useEffect, useState } from 'react';
import { useCart } from '../auth/CartContext';
import { Link } from 'react-router-dom';

function FeaturedProducts() {
  const [bookList, setBookList] = useState([]);
 const [message, setMessage] = useState("");
  const {addToCart} = useCart()

  useEffect(() => {
    fetch("http://localhost:5000/books/getBooks")
      .then(res => res.json())
      .then(data => setBookList(data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);


  // const handleAdd= async(bookId)=>{
  //   await addToCart(bookId)

  //   fetch("http://localhost:5000/books/getBooks")
  //   .then(res => res.json())
  //   .then(data => setBookList(data));

  // }



  const featuredBooks = bookList?.filter(book => book.isFeautred === true);

  return (
    <div className='mt-10'>
      <h3 className='my-6'>Featured Products</h3>
       {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center">
          {message}
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
        {featuredBooks?.map((book) => (
        
          <div key={book._id} className='flex flex-col items-center border p-4 rounded-lg'>
            <Link to={`/bookDetails/${book?._id}`}>
            <img className='w-full  ' src={`http://localhost:5000/images/${book.coverImage}`} />
            <h6>{book.title}</h6>
            </Link>
            <span className='text-gray-400'>{book?.author}</span>
            <strong className='text-[#F86D72]'>{book?.price} $</strong>
            <div className='text-sm text-gray-500'>Stock: {book.stock}</div>
            <button
            onClick={() => {addToCart(book._id);
               setBookList(prev => prev.map(b =>b._id=== book._id ?{ ...b, stock: b.stock - 1 } : b))
                setMessage("Added To Cart Successfully")
              
              }}

            
              disabled={book.stock === 0}
              className=" whitespace-nowrap w-44 disabled:bg-gray-400"
            >
              {book.stock === 0 ? "Out of stock" : "Add to Cart"}
            </button>
          </div>
        
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
