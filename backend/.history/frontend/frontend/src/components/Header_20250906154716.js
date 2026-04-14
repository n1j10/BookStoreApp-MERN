import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/' },
        { name: 'Contact', path: '/' },
        { name: 'About', path: '/' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check authentication status on component mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/users/verify', {
                method: 'GET',
                credentials: 'include', // Include cookies
            });
            
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/users/logout', {
                method: 'POST',
                credentials: 'include',
            });
            
            if (response.ok) {
                setUser(null);
                navigate('/');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Function to render different UI based on user role
    const renderUserActions = () => {
        if (loading) {
            return (
                <div className="hidden md:flex items-center gap-4">
                    <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
                </div>
            );
        }

        if (!user) {
            // Not logged in - show login/signup buttons
            return (
                <div className="hidden md:flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/login")} 
                        className={`px-4 py-2 rounded transition-colors ${isScrolled ? "text-white bg-[#F86D72] hover:bg-[#e55a5f]" : "bg-[#F86D72] text-white hover:bg-[#e55a5f]"}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => navigate("/signup")} 
                        className={`px-4 py-2 rounded transition-colors ${isScrolled ? "text-white bg-[#F86D72] hover:bg-[#e55a5f]" : "bg-[#F86D72] text-white hover:bg-[#e55a5f]"}`}
                    >
                        Signup
                    </button>
                </div>
            );
        }

        // User is logged in
        return (
            <div className="hidden md:flex items-center gap-4">
                {/* Welcome message */}
                <span className={`text-sm ${isScrolled ? "text-gray-700" : "text-gray-700"}`}>
                    Welcome, {user.name}
                </span>

                {/* Role-specific buttons */}
                {user.role === 'admin' ? (
                    // Admin UI
                    <>
                        <button 
                            onClick={() => navigate("/admin/dashboard")}
                            className={`px-4 py-2 rounded transition-colors ${isScrolled ? "text-white bg-blue-600 hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                        >
                            Manage Dashboard
                        </button>
                    </>
                ) : (
                    // Regular user UI
                    <>
                        {/* Heart Icon (Favorites/Wishlist) */}
                        <button 
                            onClick={() => navigate("/wishlist")}
                            className={`p-2 rounded-full transition-colors hover:bg-gray-100 ${isScrolled ? "text-gray-700" : "text-gray-700"}`}
                            title="Wishlist"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>

                        {/* Basket Icon (Cart) */}
                        <button 
                            onClick={() => navigate("/cart")}
                            className={`p-2 rounded-full transition-colors hover:bg-gray-100 relative ${isScrolled ? "text-gray-700" : "text-gray-700"}`}
                            title="Shopping Cart"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 21h12a2 2 0 002-2V9a2 2 0 00-2-2H6l-1.8-9H2" />
                            </svg>
                            {/* Optional: Cart item count badge */}
                            {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span> */}
                        </button>
                    </>
                )}

                {/* Logout button (common for both admin and user) */}
                <button 
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded transition-colors ${isScrolled ? "text-white bg-red-600 hover:bg-red-700" : "bg-red-600 text-white hover:bg-red-700"}`}
                >
                    Logout
                </button>
            </div>
        );
    };

    return (
        <nav className={`fixed top-0 left-0 bg-white w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

            {/* Logo */}
            <a href="/" className="flex items-center w-50 h-50 gap-2">
                <img className='h-32 object-contain' src='/logo.png' alt="Logo" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-gray-700"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-gray-700"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </a>
                ))}
            </div>

            {/* Search Icon */}
            <div className="hidden md:flex items-center gap-4">
                <svg className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>

            {/* User Actions - Role-based rendering */}
            {renderUserActions()}

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
                    <div className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link, i) => (
                            <a key={i} href={link.path} className="text-gray-700 hover:text-[#F86D72]">
                                {link.name}
                            </a>
                        ))}
                        
                        {/* Mobile user actions */}
                        {!user ? (
                            <div className="flex flex-col gap-2 pt-4 border-t">
                                <button 
                                    onClick={() => navigate("/login")}
                                    className="px-4 py-2 bg-[#F86D72] text-white rounded"
                                >
                                    Login
                                </button>
                                <button 
                                    onClick={() => navigate("/signup")}
                                    className="px-4 py-2 bg-[#F86D72] text-white rounded"
                                >
                                    Signup
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 pt-4 border-t">
                                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                                
                                {user.role === 'admin' ? (
                                    <button 
                                        onClick={() => navigate("/admin/dashboard")}
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                    >
                                        Manage Dashboard
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => navigate("/wishlist")}
                                            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded"
                                        >
                                            Wishlist
                                        </button>
                                        <button 
                                            onClick={() => navigate("/cart")}
                                            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded"
                                        >
                                            Cart
                                        </button>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;