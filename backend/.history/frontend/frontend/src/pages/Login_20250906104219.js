import React, { useState } from 'react'

function Login() {

    const [form,setForm] = useState({email:"",password:""})
    const [loading ,setLoading] = useState(false)
    const [err,setErr] = useState("")



    const onSubmit= async(e)=>{
   e.preventDefault()
   setErr("")
   setLoading(true)
   try {
    const res = await fetch("")
   } catch (error) {
    
   }
    }

  return (
    <div className='max-w-md mx-auto py-10 mt-50'>
         
      <h1 className="text-2xl font-bold mb-6">Login</h1>


      <form onSubmit={onSubmit}>

        <input
        
        className='w-full border p-2 rounded'
        placeholder='Email'
        name="email"
        type='email'
        value={form.email}
        onChange={(e)=> setForm(e.target.value)}
        />


        
        <input
        
        className='w-full border p-2 rounded'
        placeholder='Password'
        name="password"
        type='password'
        value={form.password}
        onChange={(e)=> setForm(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Login