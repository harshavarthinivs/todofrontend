import { useEffect, useState } from "react"
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({children}) => {

    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect (() => {
        console.log(isAuthenticated);
        if(isAuthenticated)
        navigate("/")
    },[isAuthenticated])

    return <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;