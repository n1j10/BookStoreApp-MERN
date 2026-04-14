// LoginPage.jsx
"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 مهم

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const resp = await fetch("http://localhost:5000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // إذا السيرفر بيحط JWT داخل HttpOnly cookie
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Login failed");


      const role = data?.role || "user";
      const redirect = data?.redirect || (role === "admin" ? "/admin" : "/");
      navigate(redirect, { replace: true });
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm(s=>({...s,email:e.target.value}))}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e)=>setForm(s=>({...s,password:e.target.value}))}
        />
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button disabled={loading} className="bg-[#F86D72] text-white px-4 py-2 rounded w-full">
          {loading ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
