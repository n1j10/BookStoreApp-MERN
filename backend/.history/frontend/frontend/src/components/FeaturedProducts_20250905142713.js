import React, { useEffect, useState } from "react";

function FeaturedProducts() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    // جيب كل الكتب
    fetch("http://localhost:5000/books/getBooks")
      .then((res) => res.json())
      .then((data) => {
        // فلترة فقط اللي isFeatured = true
        const featured = data.filter((book) => book.isFeatured === true);
        setBookList(featured);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="my-10">
      <h3 className="text-xl font-bold mb-6">Featured Products</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookList.map((book) => (
          <div
            key={book._id}
            className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src={book.image || "/placeholder.jpg"}
              alt={book.title}
              className="h-48 w-full object-cover rounded"
            />
            <h6 className="font-semibold">{book.title}</h6>
            <span className="text-sm text-gray-500">{book.category?.name}</span>
            <strong className="text-lg text-[#F86D72]">${book.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
