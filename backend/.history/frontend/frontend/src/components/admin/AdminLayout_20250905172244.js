import React, { useState } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, PlusCircle, Home, MenuIcon } from "lucide-react";

function AdminLayout() {
      const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 md:px-6">
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-200 p-2"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h4 className="font-bold">Admin Dashboard</h4>
      </header>

      {/* WRAPPER لازم يكون flex */}
      <div className="relative mx-auto flex">
        {/* Overlay للموبايل */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed z-50 flex h-screen w-64 flex-col bg-slate-900 text-slate-100 transition-transform md:sticky md:top-0 md:z-auto md:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <button
            className="md:hidden absolute right-2 top-3 rounded-md p-2 hover:bg-slate-800"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          <nav className="flex-1 space-y-1 p-3 mt-10">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              <span>See All Books</span>
            </NavLink>

            <NavLink
              to="/admin/add-book"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Book</span>
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Return To Home Page</span>
            </NavLink>
          </nav>
        </aside>

        {/* المحتوى */}
        <main className="w-full md:ml-64 p-4 md:p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout