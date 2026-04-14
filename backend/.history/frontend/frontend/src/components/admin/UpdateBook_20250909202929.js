import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditBook() {
  const { id } = useParams(); // ناخد id من الرابط
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // تحميل بيانات الكتاب أول ما تفتح الصفحة
  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // تعديل الكتاب
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/books/updateBook/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      const data = await res.json();
      alert(data.message);
      navigate("/admin"); // رجوع للوحة الإدارة
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  // حذف الكتاب
  const handleDelete = async () => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا الكتاب؟")) return;

    try {
      const res = await fetch(`http://localhost:5000/books/deleteBook/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      navigate("/admin"); // رجوع للوحة الإدارة
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  if (loading) return <p className="mt-44">جاري التحميل...</p>;

  if (!book) return <p className="mt-44">لم يتم العثور على الكتاب</p>;

  return (
    <div className="max-w-lg mx-auto mt-44 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">تعديل الكتاب</h2>

      <input
        className="border p-2 w-full mb-3"
        type="text"
        name="title"
        value={book.title || ""}
        onChange={handleChange}
        placeholder="العنوان"
      />

      <input
        className="border p-2 w-full mb-3"
        type="text"
        name="author"
        value={book.author || ""}
        onChange={handleChange}
        placeholder="المؤلف"
      />

      <textarea
        className="border p-2 w-full mb-3"
        name="description"
        value={book.description || ""}
        onChange={handleChange}
        placeholder="الوصف"
      />

      <input
        className="border p-2 w-full mb-3"
        type="number"
        name="price"
        value={book.price || ""}
        onChange={handleChange}
        placeholder="السعر"
      />

      <input
        className="border p-2 w-full mb-3"
        type="number"
        name="stock"
        value={book.stock || ""}
        onChange={handleChange}
        placeholder="المخزون"
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          تحديث
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          حذف
        </button>
      </div>
    </div>
  );
}

export default EditBook;
