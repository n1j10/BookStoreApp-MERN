import React, { useContext, useState } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, PlusCircle, Home, MenuIcon } from "lucide-react";
import { AuthContext } from '../../auth/AuthContext';

function AdminLayout() {
     const [open, setOpen] = useState(false);
  const { user, loading, isAuthenticated, hasRole, logout } = useContext(AuthContext);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
       <header className='stick flex items-center top-0 z-30 shadow-lg h-14'>
        

        <button className='md:hidden inline-flex items-center justify-center !bg-transparent !border-none !text-black rounded-md border border-slate-200 p-2'  aria-label="Open sidebar" onClick={() => setOpen(true)}>

          <Menu className="h-5 w-5" />
        </button>
        <h4 className='font-bold'>Admin Dashboard</h4>
      

      
       </header>


          {/* Sidebar */}
          <div className='relative mx-auto flex'>

          
          <aside className={` relative h-screen flex flex-col  transition-transform bg-slate-900  w-64 text-slate-100 ${open? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

            
             <a
              className="md:hidden !bg-transparent absolute right-0 !text-white rounded-md p-2 hover:bg-slate-800"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </a>

            <nav className='flex-1 space-y-1 p-3 mt-15'>
                <NavLink to="/admin">
                <div className='flex items-center gap-3 mt-6'>

              <BookOpen className="h-4 w-4" />
              <span>See All Books</span>
                </div>

                </NavLink>


                 <NavLink to="/admin/add-book">
                <div className='flex items-center gap-3 mt-6'>

              <PlusCircle  className="h-4 w-4" />
              <span>Add Books</span>
                </div>

                </NavLink>


                 <NavLink to="/">
                <div className='flex items-center gap-3 mt-6'>

              <Home  className="h-4 w-4" />
              <span>Return To Home Page</span>
                </div>

                </NavLink>


                
            </nav>

          </aside>

            <main className='w-full md:ml-64 p-4 md:p-6'>
                  <div className="mx-auto max-w-6xl">
                  <Outlet />
                 </div>
            </main>
            </div>
         
    </div>
  )
}
}
export default AdminLayout