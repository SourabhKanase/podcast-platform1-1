import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from "firebase/auth";
import { getDoc } from 'firebase/firestore';
import { setUser } from '../reduxToolkit/Features/UserSlice';
import { auth,db } from '../firebase';
import { doc } from 'firebase/firestore';
import { toast } from 'react-toastify';



function LoginFrom() {
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [loading,setLoading]=useState(false);

    let navigate=useNavigate();
    let dispatch=useDispatch();
    let user=useSelector((state)=>state.user);

    async function handleLogin(e)
    {
        e.preventDefault();
        setLoading(true);
        if(email && password)
        {
          try{
            //creating user in firebase with email and password 
             const userCredential=await signInWithEmailAndPassword(auth,email,password);
             const user=userCredential.user;
             console.log(user);
             //Storing and creating document in firebase storage
             let userdoc=await getDoc(doc(db,"users",user.uid));
            let  userdata=userdoc.data();
              
             //store in redux
             dispatch(setUser({
                name:userdata.name,
                email:email,
                uid:user.uid,
             }));
             toast.success("user login Successfull");
             setLoading(false);
             navigate("./profile");
         }catch(e){
             toast.error(e.message);
             setLoading(false);
         }
        }else{
          toast.error("Enter Email And Password");
          setLoading(false);
        }

    }

     
  return (
   <div >
     <form className='loginform' onSubmit={handleLogin}>
      <h1 style={{ color: 'white' }}>Login</h1>
      <input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
       {loading?<button disabled={loading}>loading...</button>:<button disabled={loading}>Login</button>}
     </form>
   </div>
  )
}

export default LoginFrom