import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Helper function to check if token is expired
function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
}

function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, loading, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    // Wait for loading to complete before checking auth
    if (!loading) {
      if (!user || !isAdmin()) {
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate, isAdmin]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If not admin, don't render (navigation will happen in useEffect)
  if (!user || !isAdmin()) {
    return null;
  }

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      <header className='sticky flex items-center top-0 z-30 shadow-lg h-14 bg-white px-4'>
        <button 
          className='md:hidden inline-flex items-center justify-center bg-transparent border-none text-black rounded-md p-2'  
          aria-label="Open sidebar" 
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <h4 className='font-bold ml-4'>Admin Dashboard</h4>
      </header>

      {/* Sidebar */}
      <div className='relative mx-auto flex'>
        <aside className={`fixed md:static h-screen flex flex-col transition-transform bg-slate-900 w-64 text-slate-100 z-20 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          
          <button
            className="md:hidden absolute right-4 top-4 bg-transparent text-white rounded-md p-2 hover:bg-slate-800"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          <nav className='flex-1 space-y-1 p-3 mt-16 md:mt-6'>
            <NavLink 
              to="/admin"
              className={({ isActive }) => `flex items-center gap-3 p-2 rounded hover:bg-slate-800 ${isActive ? 'bg-slate-800' : ''}`}
              end
            >
              <BookOpen className="h-4 w-4" />
              <span>See All Books</span>
            </NavLink>

            <NavLink 
              to="/admin/add-book"
              className={({ isActive }) => `flex items-center gap-3 p-2 rounded hover:bg-slate-800 ${isActive ? 'bg-slate-800' : ''}`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Books</span>
            </NavLink>

            <NavLink 
              to="/"
              className="flex items-center gap-3 p-2 rounded hover:bg-slate-800"
            >
              <Home className="h-4 w-4" />
              <span>Return To Home Page</span>
            </NavLink>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {open && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" 
            onClick={() => setOpen(false)}
          />
        )}

        <main className='flex-1 md:ml-0 p-4 md:p-6'>
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}