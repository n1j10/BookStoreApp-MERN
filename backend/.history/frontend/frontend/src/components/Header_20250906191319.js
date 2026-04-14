import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust import path as needed

function Header() {
    const { user, logout, loading, isAuthenticated, isAdmin } = useAuth();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/' },
        { name: 'Contact', path: '/' },
        { name: 'About', path: '/' },
    ];

    const ref = React.useRef(null);

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }

    // Add debugging
    React.useEffect(() => {
        console.log('Header Debug Info:', {
            user,
            userRole: user?.role,
            isAuthenticated,
            isAdmin,
            loading
        });
    }, [user, isAuthenticated, isAdmin, loading]);

    const renderUserActions = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (!isAuthenticated) {
            return (
                <div className="hidden md:flex items-center gap-4">
                    <svg className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <button 
                        onClick={() => navigate("/login")} 
                        className={`ml-4 px-4 py-2 rounded ${isScrolled ? "text-white bg-[#F86D72]" : "bg-[#F86D72] text-white"}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => navigate("/signup")} 
                        className={`ml-4 px-4 py-2 rounded ${isScrolled ? "text-white bg-[#F86D72]" : "bg-[#F86D72] text-white"}`}
                    >
                        Signup
                    </button>
                </div>
            );
        }

        // User is authenticated
        return (
            <div className='hidden md:flex items-center gap-4'>
                <span className={`text-sm ${isScrolled ? "text-gray-700" : "text-gray-700"}`}>
                    Welcome, {user?.name}
                </span>

                {isAdmin ? (
                    <button 
                        onClick={() => navigate("/admin")}
                        className={`px-4 py-2 rounded ${isScrolled ? "text-white bg-blue-600" : "bg-blue-600 text-white"}`}
                    >
                        Manage Dashboard
                    </button>
                ) : (
                    <>
                        <button 
                            onClick={() => navigate("/profile")}
                            className={`px-4 py-2 rounded ${isScrolled ? "text-white bg-green-600" : "bg-green-600 text-white"}`}
                        >
                            Profile
                        </button>
                    </>
                )}

                <button 
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded ${isScrolled ? "text-white bg-red-600" : "bg-red-600 text-white"}`}
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <span className={isScrolled ? "text-gray-800" : "text-white"}>Your Logo</span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={`transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-[#F86D72]" : "text-white hover:text-[#F86D72]"}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* User Actions */}
                {renderUserActions()}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 py-2 space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="block py-2 text-gray-700 hover:text-[#F86D72]"
                            >
                                {link.name}
                            </a>
                        ))}
                        {isAuthenticated && (
                            <>
                                <div className="py-2 text-sm text-gray-600">
                                    Welcome, {user?.name}
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={() => {
                                            navigate("/admin");
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left py-2 text-blue-600 hover:text-blue-800"
                                    >
                                        Manage Dashboard
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left py-2 text-red-600 hover:text-red-800"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <button
                                    onClick={() => {
                                        navigate("/login");
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left py-2 text-[#F86D72] hover:text-red-600"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/signup");
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left py-2 text-[#F86D72] hover:text-red-600"
                                >
                                    Signup
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;