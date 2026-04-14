import React, { useEffect, useState } from 'react';
import { useCart } from '../auth/CartContext';
import { Link } from 'react-router-dom';

function DiscountPercent() {
  const [bookList, setBookList] = useState([]);
 const [message, setMessage] = useState("");
  const {addToCart} = useCart()

  useEffect(() => {
    fetch("http://localhost:5000/books/getBooks")
      .then(res => res.json())
      .then(data => setBookList(data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);





  const discountPercent = bookList?.filter(book => book.discountPercent > 0);

  return (
    <div className='mt-10'>
      <h3 className='my-6'>Discounts </h3>
       {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center">
          {message}
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
{discountPercent?.slice(0, 4).map((book) => (
        
         <div key={book._id} className="relative flex flex-col items-center border p-4 rounded-lg">
  {/* Badge */}
  {Number(book.discountPercent) > 0 && (
    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
      -{book.discountPercent}%
    </div>
  )}

  <Link to={`/bookDetails/${book?._id}`}>
    <img
      className="w-full h-[450px] object-cover rounded-md"
      src={`http://localhost:5000/images/${book.coverImage}`}
      alt={book.title}
    />
    <h6 className="text-center my-3">{book.title}</h6>
  </Link>

  <span className="text-gray-400">{book?.author}</span>

  <div className="flex items-center gap-2">
    {/* السعر الأصلي مشطوب */}
    <span className="text-gray-400 line-through">
      ${book.price}
    </span>
    {/* السعر بعد الخصم */}
    <strong className="text-[#F86D72]">
      ${(book.price - (book.price * Number(book.discountPercent)) / 100).toFixed(2)}
    </strong>
  </div>

  <div className="text-sm text-gray-500">Stock: {book.stock}</div>

  <button
    onClick={() => {
      addToCart(book._id);
      setBookList(prev =>
        prev.map(b =>
          b._id === book._id ? { ...b, stock: b.stock - 1 } : b
        )
      );
      setMessage("Added To Cart Successfully");
    }}
    disabled={book.stock === 0}
    className="mt-5 whitespace-nowrap w-44 disabled:bg-gray-400  "
  >
    {book.stock === 0 ? "Out of stock" : "Add to Cart"}
  </button>
</div>

        
        ))}
      </div>
    </div>
  );
}

export default DiscountPercent;
