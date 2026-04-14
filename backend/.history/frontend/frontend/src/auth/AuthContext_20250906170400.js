import { useContext, useEffect, useState } from "react"

export const useAuth=() => {
    const context = useContext(AuthContext)


    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export const AuthProvider=({children})=>{
    const [user,setUser] = useState(null)
   const [loading, setLoading] = useState(true);



   useEffect(()=>{
    checkAuthStatus()
   },[])
   const checkAuthStatus = async()=>{
    try {
        const response = await fetch("http://localhost:5000/users/verify",{
            method:"GET",
            credentials: 'include',
        })
        if(response.ok){
            const data = response.json()
            setUser(data.user)
        }else{
            setUser(null)
        }
    } catch (error) {
     console.error('Auth check failed:', error);  
     setUser(null)  
    }finally{
        setLoading(false)
    }
   }

   const login = async(credentials)=>{
    try {
        const response = await fetch("http://localhost:5000/users/signin",{
            method:"POST",
            headers:{
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify(credentials)

        })

          if(response.ok){
            const data = response.json()
            setUser(data.user)
            return { success: true, data };
        }else{
         const errorData = await response.json();
         return { success: false, error: errorData.message };
        }
    } catch (error) {
       return { success: false, error: 'Login failed' };
    }
   }

}