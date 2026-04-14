import { createContext, useEffect, useState } from "react";
import  { jwtDecode } from "jwt-decode"
export const AuthContext = createContext()

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(()=>{
    const token = getCookie("token");
    if(token){
        const decode = jwtDecode(token)
        setUser({
            id: decode.id,
          email: decode.email,
          role: decode.role?.trim(), // Trim to handle any whitespace issues
          token: token
        })

    }

     
  })


    return(
        <AuthContext.Provider value={{user,login}}>{children}</AuthContext.Provider>
    )
}