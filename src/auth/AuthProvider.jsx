import React, { createContext, useState, useContext,useEffect } from "react"
import { jwtDecode } from "jwt-decode";


 const AuthContext = createContext({
	user: null,
    loggedIn: false,
	handleLogin: (token) => {},
	handleLogout: () => {},
	token:""
})
// const AuthContext=createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
    const [loggedIn,SetloggedIn]=useState(false);
	const[token,SetToken]=useState("")


	useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken)
                setUser(decodedUser)
                SetToken(storedToken)
                SetloggedIn(true)
            } catch (error) {
                console.error("Failed to decode token:", error)
                // handleLogout() // Clear invalid token
            }
        }
    }, [])




	const handleLogin = (token) => {
		console.log(67)
		const decodedUser = jwtDecode(token)
		localStorage.setItem("userName", decodedUser.sub)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		console.log(67) 
		setUser(decodedUser)
		SetToken(token)
        SetloggedIn(true)
	}

	const handleLogout = () => {
		localStorage.removeItem("userName")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
        SetloggedIn(false)
		SetToken("")
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user,loggedIn, handleLogin, handleLogout,token }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}