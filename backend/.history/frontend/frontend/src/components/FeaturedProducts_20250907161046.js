import React, { useEffect, useState } from 'react';
import { useCart } from '../auth/CartContext';

function FeaturedProducts() {
    const { books, addToCart, loading, getBookStock, isInCart, getCartQuantity } = useCart();

    const isFeautred = books?.filter(book => book.isFeautred === true);

    return (
        <div className='mt-10'>
            <h3 className='my-6 text-2xl font-bold'>Featured Products</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {isFeautred?.map((book) => {
                    const currentStock = getBookStock(book._id);
                    const inCart = isInCart(book._id);
                    const cartQuantity = getCartQuantity(book._id);

                    return (
                        <div key={book._id} className='flex items-center justify-center flex-col gap-5 border p-4 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                            <img 
                                className='w-full h-[450px] object-cover rounded-md' 
                                src={`http://localhost:5000/images/${book.coverImage}`}
                                alt={book.title}
                            />

                            <h6 className='text-lg font-semibold text-center'>{book?.title}</h6>
                            <span className='text-gray-400 text-center'>{book?.author}</span>
                            <strong className='text-[#F86D72] text-xl'>${book?.price}</strong>

                            {/* Stock Information */}
                            <div className='text-sm text-center'>
                                <div className={`font-medium ${currentStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
                                </div>
                                
                                {inCart && (
                                    <div className='text-blue-600 mt-1'>
                                        {cartQuantity} in cart
                                    </div>
                                )}
                            </div>

                            {/* Add to Cart Button */}
                            <button 
                                onClick={() => addToCart(book._id)}
                                disabled={loading || currentStock === 0}
                                className={`px-4 py-2 rounded-md font-medium transition-colors w-full ${
                                    currentStock === 0 
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : loading
                                        ? 'bg-gray-500 text-white cursor-not-allowed'
                                        : 'bg-[#F86D72] text-white hover:bg-[#e55b60]'
                                }`}
                            >
                                {loading 
                                    ? 'Adding...' 
                                    : currentStock === 0 
                                        ? 'Out of Stock' 
                                        : inCart
                                            ? 'Add More'
                                            : 'Add to Cart'
                                }
                            </button>

                            {/* Stock Warning */}
                            {currentStock > 0 && currentStock <= 5 && (
                                <div className='text-xs text-orange-500 text-center'>
                                    Only {currentStock} left!
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default FeaturedProducts;