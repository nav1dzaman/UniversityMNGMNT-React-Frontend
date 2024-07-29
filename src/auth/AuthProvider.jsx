import React, { createContext, useState, useContext } from "react"
import { jwtDecode } from "jwt-decode";


 const AuthContext = createContext({
	user: null,
    loggedIn: false,
	handleLogin: (token) => {},
	handleLogout: () => {}
})
// const AuthContext=createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
    const [loggedIn,SetloggedIn]=useState(false);

	const handleLogin = (token) => {
		console.log(67)
		const decodedUser = jwtDecode(token)
		localStorage.setItem("userName", decodedUser.sub)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		console.log(67)
		setUser(decodedUser)
        SetloggedIn(true)
	}

	const handleLogout = () => {
		localStorage.removeItem("userName")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
        SetloggedIn(false)
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user,loggedIn, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}