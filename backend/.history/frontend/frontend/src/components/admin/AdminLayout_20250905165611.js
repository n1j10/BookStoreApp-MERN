import React, { useState } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, PlusCircle, Home } from "lucide-react";

function AdminLayout() {
      const [open, setOpen] = useState(false);

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
       <header className='stick flex items-center top-0 z-30 shadow-lg h-14'>
        <h4 >Admin Dashboard</h4>
       </header>
    </div>
  )
}

export default AdminLayout