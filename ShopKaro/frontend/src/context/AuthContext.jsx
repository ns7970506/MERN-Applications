import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children}) =>{
    const [user, setuser] = useState(null);

    const login = (userData) =>{
        setuser(userData)
        localStorage.setItem('userInfo',JSON.stringify(userData))
    }

    const logout = ()=>{
        setuser(null)
        localStorage.removeItem('userInfo')
    }
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}