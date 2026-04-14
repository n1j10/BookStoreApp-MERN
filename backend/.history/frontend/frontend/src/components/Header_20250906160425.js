import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/' },
    { name: 'Contact', path: '/' },
    { name: 'About', path: '/' },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const { user, logout, loading, isAuthenticated, isAdmin } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const btnMain = `px-4 py-2 rounded transition-colors ${isScrolled ? 'text-white bg-[#F86D72] hover:bg-[#e55a5f]' : 'bg-[#F86D72] text-white hover:bg-[#e55a5f]'}`;
  const btnBorder = `px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100`;

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  // عناصر اليمين (ديسكتوب)
  const DesktopActions = () => {
    if (loading) {
      return (
        <div className="hidden md:flex items-center gap-4">
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => navigate('/login')} className={btnMain}>Login</button>
          <button onClick={() => navigate('/signup')} className={btnMain}>Signup</button>
        </div>
      );
    }

    if (isAdmin) {
      return (
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className={btnMain}>Manage Dashboard</button>
          <button onClick={handleLogout} className={btnBorder}>Logout</button>
        </div>
      );
    }

    // يوزر عادي
    return (
      <div className="hidden md:flex items-center gap-4">
        <button onClick={() => navigate('/wishlist')} title="Wishlist" className="p-2 rounded-full hover:bg-gray-100 text-gray-700">♡</button>
        <button onClick={() => navigate('/cart')} title="Cart" className="p-2 rounded-full hover:bg-gray-100 text-gray-700">🛒</button>
        <button onClick={handleLogout} className={btnBorder}>Logout</button>
      </div>
    );
  };

  // عناصر الموبايل داخل القائمة
  const MobileActions = () => {
    if (loading) return null;

    if (!isAuthenticated) {
      return (
        <>
          <button onClick={() => { setIsMenuOpen(false); navigate('/login'); }} className={btnMain}>Login</button>
          <button onClick={() => { setIsMenuOpen(false); navigate('/signup'); }} className={btnMain}>Signup</button>
        </>
      );
    }

    if (isAdmin) {
      return (
        <>
          <button onClick={() => { setIsMenuOpen(false); navigate('/admin'); }} className={btnMain}>Manage Dashboard</button>
          <button onClick={handleLogout} className={btnBorder}>Logout</button>
        </>
      );
    }

    // يوزر عادي
    return (
      <>
        <button onClick={() => { setIsMenuOpen(false); navigate('/wishlist'); }} className="text-2xl">♡</button>
        <button onClick={() => { setIsMenuOpen(false); navigate('/cart'); }} className="text-2xl">🛒</button>
        <button onClick={handleLogout} className={btnBorder}>Logout</button>
      </>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 bg-white w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? 'bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4' : 'py-4 md:py-6'}`}>

      {/* Logo */}
      <a href="/" className="flex items-center w-50 h-50 gap-2 shrink-0">
        <img className="h-12 object-contain" src="/logo.png" alt="Logo" />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}>
            {link.name}
            <div className={`${isScrolled ? 'bg-gray-700' : 'bg-gray-700'} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
          </a>
        ))}
      </div>

      {/* Search icon (ثابت) */}
      <div className="hidden md:flex items-center gap-4">
        <svg className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? 'invert' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Desktop actions */}
      <DesktopActions />

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? 'invert' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        {/* Mobile actions */}
        <MobileActions />
      </div>
    </nav>
  );
}

export default Header;
