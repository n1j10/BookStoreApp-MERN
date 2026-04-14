import React, { useState } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, PlusCircle, Home } from "lucide-react";

function AdminLayout() {
      const [open, setOpen] = useState(false);

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
       <header className='stick flex items-center top-0 z-30 shadow-lg h-14'>
       
       
        <h4 className='font-bold'>Admin Dashboard</h4>
      

      
       </header>


          {/* Sidebar */}
          <aside className={`fixed z-50 flex h-screen w-64 flex-col bg-slate-900 text-slate-100 transition-transform md:sticky md:top-0 md:z-auto md:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}>

             {/* Sidebar header */}
         


          </aside>
    </div>
  )
}

export default AdminLayout