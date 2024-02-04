import { auth } from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { Navigate,Outlet } from "react-router-dom";

let PrivateRoutes=()=>{
    let [user,loading,error]=useAuthState(auth);

if (loading) {
    console.log("loading in private riutes has run");
    return <p>Loading...</p>;
} else if (!user || error) {
    console.log("user not found in private routes");
    return <Navigate to="/" replace />;
} else {
    console.log("user found so redirecting to required pages");
    return <Outlet/>;
}
}
export default PrivateRoutes;