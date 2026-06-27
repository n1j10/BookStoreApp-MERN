import { createContext, useCallback, useContext, useState } from "react"
import { apiFetch, parseApiResponse } from "../utils/api";

export const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
 
    const normalizeRole = (r) =>
        (r || "user").toString().trim().toLowerCase();

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await apiFetch("/users/verify", {
                method: "GET",
                credentials: 'include',
            })
            const result = await parseApiResponse(response, {
                fallbackError: "Unable to verify session",
            });

            if (result.ok && result.data?.user) {
                const role = normalizeRole(result.data.user.role);
                setUser({ ...result.data.user, role });
            } else {
                setUser(null)
            }


        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

  
    const login = async (credentials) => {
        try {
            const response = await apiFetch("/users/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(credentials)
            })

            const result = await parseApiResponse(response, {
                fallbackError: "Login failed",
            });
            
            if (result.ok && result.data?.user) {
                const role = normalizeRole(result.data.user.role)
                setUser({ ...result.data.user, role });
                return { success: true, data: result.data };
            }
            return { success: false, error: result.message || "Login failed" };
        } catch (error) {
            return { success: false, error: 'Login failed' };
        }
    }
    const register = async (userData) => {
        try {
            const response = await apiFetch("/users/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData)
            })
            const result = await parseApiResponse(response, {
                fallbackError: "Register failed",
            });
            
            if (result.ok && result.data?.user) {
                const role = normalizeRole(result.data.user.role);
                setUser({ ...result.data.user, role }); 
                return { success: true, data: result.data };
            }
            return { success: false, error: result.message || "Register failed" };
        } catch (error) {
            return { success: false, error: 'Register failed' };
        }
    }

    const logout = async () => {
        try {
            await apiFetch("/users/logout", {
                method: "POST",
                credentials: 'include',
            })
        } catch (error) {
            console.error('Logout request failed:', error);
        } finally {
            setUser(null)
        }
    }



    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        refreshAuth: checkAuthStatus
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

