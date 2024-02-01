import { auth } from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { Navigate,Outlet } from "react-router-dom";

let PrivateRoutes=()=>{
    let [user,loading,error]=useAuthState(auth);

if (loading) {
    console.log("loading has run");
    return <p>Loading...</p>;
} else if (!user || error) {
    return <Navigate to="/" replace />;
} else {
    return <Outlet />;
}
}
export default PrivateRoutes;