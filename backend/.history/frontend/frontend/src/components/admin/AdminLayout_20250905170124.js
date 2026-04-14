import React, { useState } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, PlusCircle, Home } from "lucide-react";

function AdminLayout() {
      const [open, setOpen] = useState(false);

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
       <header className='stick flex items-center top-0 z-30 shadow-lg h-14'>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-200 p-2"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
       
        <h4 className='font-bold'>Admin Dashboard</h4>
      

      
       </header>


          {/* Sidebar */}
          <aside className={`fixed z-50 flex h-screen w-64 flex-col bg-slate-900 text-slate-100 transition-transform md:sticky md:top-0 md:z-auto md:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}>

             {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
            <div className="font-bold">📚 Admin</div>
            <button
              className="md:hidden rounded-md p-2 hover:bg-slate-800"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>


          </aside>
    </div>
  )
}

export default AdminLayout