import React from 'react'

function Signup() {
  return (
   <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Sign up</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
        />
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button
          disabled={loading}
          className="bg-[#F86D72] text-white px-4 py-2 rounded w-full"
        >
          {loading ? "..." : "Create account"}
        </button>
      </form>
    </div>
  )
}

export default Signup