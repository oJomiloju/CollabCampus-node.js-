import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => { // represents components we want to wrap in this component 
        const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
        const login = async(inputs)=>{
            const res = await axios.post("http://localhost:8800/api/auth/login",inputs,{withCredentials: true}) // to enable cookies 
            setCurrentUser(res.data)
        };
        const logout = async()=>{
            await axios.post("http://localhost:8800/api/auth/logout", {}, {withCredentials: true}) // to enable cookies
            setCurrentUser(null)
        };

        useEffect(()=>{
            localStorage.setItem("user", JSON.stringify(currentUser))
        }, [currentUser])

        return (
            <AuthContext.Provider value={{currentUser, login, logout}}>
                {children}
            </AuthContext.Provider>
        )
    
}