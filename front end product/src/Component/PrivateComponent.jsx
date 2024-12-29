import { Navigate,Outlet } from "react-router-dom"
const PrivateComponent = ()=>{
    const auth = localStorage.getItem("item")
        return auth?<Outlet/>:<Navigate to="/Signup"/>
}
export default PrivateComponent