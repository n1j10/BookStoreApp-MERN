// SignupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); 
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // إذا السيرفر بيرجع كوكي HttpOnly
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Registration failed");

      // لو السيرفر بيرجع role/redirect استخدمهن، وإلا وجّه لمسار مناسب
      const redirect = data?.redirect || "/admin"; 
      navigate(redirect, { replace: true });
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 py-10">
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
  );
}
