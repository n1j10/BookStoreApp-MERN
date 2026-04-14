import React from 'react'

function AdminLayout() {
  return (
     <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar (admin only) */}
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

      {/* Layout */}
      <div className="relative mx-auto flex">
        {/* Overlay (mobile) */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={[
            "fixed z-50 flex h-screen w-64 flex-col bg-slate-900 text-slate-100 transition-transform md:sticky md:top-0 md:z-auto md:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          ].join(" ")}
        >
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

          {/* Nav */}
          <nav className="flex-1 space-y-1 p-3">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/admin"} // خليه يتفعل فقط عند /admin بالضبط
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : inactive}`
                }
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer (اختياري) */}
          <div className="border-t border-slate-800 p-3 text-xs text-slate-400">
            © {new Date().getFullYear()} Bookstore Admin
          </div>
        </aside>

        </div>
        </div>
  )
}

export default AdminLayout