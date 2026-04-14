import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        items: [],
        totalAmount: 0,
        totalItems: 0
    });
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]); // Store books list for real-time updates

    // Get cart from backend
    const getCart = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/carts', {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                setCart(data.cart);
            }
        } catch (error) {
            console.error('Error getting cart:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get books list (for stock updates)
    const getBooks = async () => {
        try {
            const response = await fetch('http://localhost:5000/books/getBooks');
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            }
        } catch (error) {
            console.error('Error getting books:', error);
        }
    };

    // Update local book stock
    const updateLocalBookStock = (bookId, stockChange) => {
        setBooks(prevBooks => 
            prevBooks.map(book => 
                book._id === bookId 
                    ? { ...book, stock: book.stock + stockChange }
                    : book
            )
        );
    };

    // Add item to cart
    const addToCart = async (bookId) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/carts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ bookId, quantity: 1 })
            });

            const data = await response.json();
            
            if (response.ok) {
                setCart(data.cart);
                // Update local stock (decrease by 1)
                updateLocalBookStock(bookId, -1);
                alert('Added to cart!');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error adding to cart');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Update quantity
    const updateQuantity = async (bookId, newQuantity) => {
        try {
            setLoading(true);
            
            // Find current quantity in cart
            const currentItem = cart.items.find(item => item.book._id === bookId);
            const oldQuantity = currentItem ? currentItem.quantity : 0;
            const quantityDifference = newQuantity - oldQuantity;

            const response = await fetch('http://localhost:5000/carts/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ bookId, quantity: newQuantity })
            });

            const data = await response.json();
            
            if (response.ok) {
                setCart(data.cart);
                // Update local stock (adjust by difference)
                updateLocalBookStock(bookId, -quantityDifference);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error updating cart');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Remove item
    const removeItem = async (bookId) => {
        try {
            setLoading(true);
            
            // Find current quantity to restore stock
            const currentItem = cart.items.find(item => item.book._id === bookId);
            const quantityToRestore = currentItem ? currentItem.quantity : 0;

            const response = await fetch(`http://localhost:5000/carts/remove/${bookId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            const data = await response.json();
            
            if (response.ok) {
                setCart(data.cart);
                // Restore stock
                updateLocalBookStock(bookId, quantityToRestore);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error removing item');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Clear cart
    const clearCart = async () => {
        try {
            setLoading(true);
            
            // Store current items to restore stock
            const itemsToRestore = [...cart.items];

            const response = await fetch('http://localhost:5000/carts/clear', {
                method: 'DELETE',
                credentials: 'include'
            });

            const data = await response.json();
            
            if (response.ok) {
                setCart(data.cart);
                // Restore stock for all items
                itemsToRestore.forEach(item => {
                    updateLocalBookStock(item.book._id, item.quantity);
                });
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error clearing cart');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get current stock for a book (from local state)
    const getBookStock = (bookId) => {
        const book = books.find(b => b._id === bookId);
        return book ? book.stock : 0;
    };

    // Check if book is in cart
    const isInCart = (bookId) => {
        return cart.items.some(item => item.book._id === bookId);
    };

    // Get quantity of book in cart
    const getCartQuantity = (bookId) => {
        const item = cart.items.find(item => item.book._id === bookId);
        return item ? item.quantity : 0;
    };

    // Load cart and books when component mounts
    useEffect(() => {
        getCart();
        getBooks();
    }, []);

    return (
        <CartContext.Provider value={{
            // Cart data
            cart,
            loading,
            books,
            
            // Functions
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
            getCart,
            getBooks,
            
            // Helper functions
            getBookStock,
            isInCart,
            getCartQuantity,
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use cart
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};