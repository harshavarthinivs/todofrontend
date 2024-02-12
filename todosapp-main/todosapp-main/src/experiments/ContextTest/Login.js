import { useContext } from "react"
import AuthContext from "./AuthContext";

const Login = () => {

    const {setIsAuthenticated} = useContext(AuthContext);

    return <button onClick={() => setIsAuthenticated(prev => !prev)}>Click me</button>
}

export default Login;