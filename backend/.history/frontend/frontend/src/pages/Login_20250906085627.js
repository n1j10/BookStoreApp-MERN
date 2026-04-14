"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const resp = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // مهم جداً لاستلام الكوكي
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Failed");
      router.push("/admin");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Email"
          value={form.email} onChange={e=>setForm(s=>({...s,email:e.target.value}))}/>
        <input className="w-full border p-2 rounded" placeholder="Password" type="password"
          value={form.password} onChange={e=>setForm(s=>({...s,password:e.target.value}))}/>
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button disabled={loading} className="bg-[#F86D72] text-white px-4 py-2 rounded w-full">
          {loading ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
}
