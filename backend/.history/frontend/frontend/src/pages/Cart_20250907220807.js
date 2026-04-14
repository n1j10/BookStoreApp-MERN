import React, { useEffect, useState } from 'react';
import { useCart } from '../auth/CartContext';

function Cart() {
  const { cart, getCart, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      await getCart(); // استدعاء الـ API يلي كتبته بالباك
      setLoading(false);
    };
    fetchCart();
  }, [getCart]);

  if (loading) {
    return <div className="p-8 text-center">Loading your cart...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <div className="p-8 text-center">Your cart is empty 🛒</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="grid gap-4">
        {cart.items.map((item) => (
          <div
            key={item.book._id}
            className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
          >
            {/* صورة المنتج */}
            <img
              src={`http://localhost:5000/images/${item.book.coverImage}`}
              alt={item.book.title}
              className="w-20 h-28 object-cover rounded"
            />

            {/* تفاصيل المنتج */}
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.book.title}</h3>
              <p className="text-gray-500">{item.book.author}</p>
              <p className="text-[#F86D72] font-bold">${item.book.price}</p>
            </div>

            {/* التحكم بالكمية */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.book._id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.book._id, item.quantity + 1)
                }
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* حذف المنتج */}
            <button
              onClick={() => removeItem(item.book._id)}
              className="ml-4 text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* المجموع الكلي */}
      <div className="mt-6 text-right">
        <h3 className="text-lg font-semibold">
          Total Items: {cart.totalItems}
        </h3>
        <h3 className="text-xl font-bold text-[#F86D72]">
          Total: ${cart.totalAmount}
        </h3>
      </div>
    </div>
  );
}


export default Cart