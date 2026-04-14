import { createContext, useContext, useEffect, useState } from "react"

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

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const normalizeRole = (r) => {
        const normalized = (r || "user").toString().trim().toLowerCase();
        console.log('🔄 Role normalization:', { original: r, normalized });
        return normalized;
    }

    const checkAuthStatus = async () => {
        console.log('🔍 Checking auth status...');
        try {
            const response = await fetch("http://localhost:5000/users/verify", {
                method: "GET",
                credentials: 'include',
            })
            
            console.log('📡 Verify response status:', response.status);
            
            if (response.ok) {
                const data = await response.json()
                console.log('📦 Raw verify response data:', data);
                
                const role = normalizeRole(data?.user?.role);
                const userWithRole = { ...data.user, role };
                
                console.log('👤 Setting user:', userWithRole);
                setUser(userWithRole);
            } else {
                console.log('❌ Verify failed, setting user to null');
                setUser(null)
            }
        } catch (error) {
            console.error('💥 Auth check failed:', error);
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (credentials) => {
        console.log('🔐 Login attempt with:', credentials.email);
        try {
            const response = await fetch("http://localhost:5000/users/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(credentials)
            })
            
            console.log('📡 Login response status:', response.status);
            
            if (response.ok) {
                const data = await response.json()
                console.log('📦 Raw login response data:', data);
                
                const role = normalizeRole(data?.user?.role)
                const userWithRole = { ...data.user, role };
                
                console.log('👤 Setting user after login:', userWithRole);
                setUser(userWithRole);
                return { success: true, data };
            } else {
                const errorData = await response.json();
                console.log('❌ Login failed:', errorData);
                return { success: false, error: errorData.message };
            }
        } catch (error) {
            console.error('💥 Login error:', error);
            return { success: false, error: 'Login failed' };
        }
    }

    const register = async (userData) => {
        console.log('📝 Register attempt with:', userData.email);
        try {
            const response = await fetch("http://localhost:5000/users/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData)
            })
            
            console.log('📡 Register response status:', response.status);
            
            if (response.ok) {
                const data = await response.json()
                console.log('📦 Raw register response data:', data);
                
                const role = normalizeRole(data?.user?.role);
                const userWithRole = { ...data.user, role };
                
                console.log('👤 Setting user after register:', userWithRole);
                setUser(userWithRole);
                return { success: true, data };
            } else {
                const errorData = await response.json();
                console.log('❌ Register failed:', errorData);
                return { success: false, error: errorData.message };
            }
        } catch (error) {
            console.error('💥 Register error:', error);
            return { success: false, error: 'Register failed' };
        }
    }

    const logout = async () => {
        console.log('🚪 Logout attempt...');
        try {
            const response = await fetch("http://localhost:5000/users/logout", {
                method: "POST",
                credentials: 'include',
            })
            console.log('📡 Logout response status:', response.status);
        } catch (error) {
            console.error('💥 Logout request failed:', error);
        } finally {
            console.log('👤 Setting user to null after logout');
            setUser(null)
        }
    }

    // Debug the computed values
    const isAuthenticated = !!user;
    const isAdmin = user?.role === "admin";
    
    console.log('🎯 Auth Context Values:', {
        user,
        userRole: user?.role,
        isAuthenticated,
        isAdmin,
        loading
    });

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated,
        isAdmin,
        refreshAuth: checkAuthStatus
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}