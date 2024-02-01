import React, { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth,db } from '../firebase';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../reduxToolkit/Features/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export const SignUpForm = () => {

    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [confirmpassword,setconfirmpassword]=useState("");
    let [loading,setLoading]=useState(false);


   let reduxuser=useSelector((state)=>state.user);
    
   let dispatch=useDispatch();
   let navigate=useNavigate();

   console.log(reduxuser)

    async function handleSubmit(e)
    {
        e.preventDefault();
        setLoading(true);
         if(password==confirmpassword && confirmpassword.length>=6)
         {
             try{
                //creating user in firebase with email and password 
                 const userCredential=await createUserWithEmailAndPassword(auth,email,password);
                 const user=userCredential.user;
                 console.log(user);
                 //Storing and creating document in firebase storage
                 await setDoc(doc(db,"users",user.uid),{name:name,email:email,uid:user.uid});
                   
                 //store in redux
                 dispatch(setUser({
                    name:name,
                    email:email,
                    uid:user.uid,
                 }));
                 toast.success("user SignIn Successfully");
                 setLoading(false);
                 navigate("./profile");
             }catch(e){
                setLoading(false);
                toast.error(e.message);
             }
         }else{
            setLoading(false);
            if(password!=confirmpassword)
            {
                toast.error("password is wrong");
            }else{
                toast.error("Envalid details");
            }
         }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}  className='SignUpFrom'>
            <h1 style={{ color: 'white' }}>SignUp</h1>
            <input type='text' placeholder='Full Name' onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
            <input type='password' placeholder='confirm password' onChange={(e)=>setconfirmpassword(e.target.value)}/>
            {loading?<button disabled={loading}>loading...</button>:<button disabled={loading}>Submit</button>}
        </form>
    </div>
  )
}

export default SignUpForm;