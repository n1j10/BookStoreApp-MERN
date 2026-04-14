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
          <aside className={`h-screen flex flex-col bg-slate-900  w-64 text-slate-100 ${open? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>


          </aside>
    </div>
  )
}

export default AdminLayout