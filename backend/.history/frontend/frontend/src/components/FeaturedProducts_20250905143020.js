import React, { useEffect, useState } from 'react'

function FeaturedProducts() {
  const [bookList, setBookList] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/books/getBooks")
      .then(res => res.json())
      .then(data => setBookList(data))
      .catch(err => console.error("Error fetching books:", err))
  }, [])

  // فلترة الكتب اللي فيها isFeatured = true
  const featuredBooks = bookList.filter(book => book.isFeautred === true)

  return (
    <div className="p-5">
      <h3 className="text-xl font-bold mb-5">Featured Products</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {featuredBooks.map(book => (
          <div 
            key={book._id} 
            className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 shadow"
          >
            <img 
              src={book.image || "https://via.placeholder.com/150"} 
              alt={book.title} 
              className="w-full h-40 object-cover rounded"
            />
            <h6 className="font-semibold">{book.author}</h6>
            <span className="text-sm text-gray-500">{book.category?.name}</span>
            <strong>${book.price}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
