import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, PlusCircle, Home } from "lucide-react";

function AdminLayout() {
      const [open, setOpen] = useState(false);

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 md:px-6">
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-200 p-2"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold">Admin Dashboard</h1>
      </header>
    </div>
  )
}

export default AdminLayout