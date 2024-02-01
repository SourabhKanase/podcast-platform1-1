import React,{useState} from "react";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import LoginFrom from "../components/LoginFrom";

let Signup=()=>{
    let [flag,setflag]=useState(false);

    return (
       <div className="signupdiv">
          <Header/>
          {!flag?<SignUpForm/>:<LoginFrom/>}  
          {!flag?<p onClick={(e)=>setflag(!flag)}>Already have account?click here to Login</p>:<p onClick={(e)=>setflag(!flag)}>Don't Have Account ?click here to SignIn</p>}
       </div>
    )
}
export default Signup;