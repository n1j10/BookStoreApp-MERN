import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function Login() {

    const [form,setForm] = useState({email:"",password:""})
    const [loading ,setLoading] = useState(false)
    const [err,setErr] = useState("")
     const navigate = useNavigate()
     const { login } = useAuth();

   const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      await refreshAuth();               // <-- أهم سطر للتحديث الفوري
      navigate(data.redirect || '/');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className='max-w-md mx-auto py-10 mt-40'>
         
      <h1 className="text-2xl font-bold mb-6">Login</h1>


      <form className='mt-50' onSubmit={onSubmit}>

        <input
        
        className='w-full border p-2 rounded mb-6'
        placeholder='Email'
        name="email"
        type='email'
        value={form.email}
        onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
        />

        
        <input
        
        className='w-full border p-2 rounded mb-6'
        placeholder='Password'
        name="password"
        type='password'
        value={form.password}
         onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
        />

        {err && <p className="text-red-500 text-sm">{err}</p>}

        <button  disabled={loading}> {loading ? "..." : "Login"}</button> 
      </form>
    </div>
  )
}

export default Login