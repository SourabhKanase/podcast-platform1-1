import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

export const Profile = () => {

  let user=useSelector((state)=>state.user);
  console.log(user);

  function logout()
  {
    signOut(auth).then(() => {
      toast.success("User LoggedOut")
    }).catch((error) => {
      toast.error("error",error.message);
    });
  }
  return (
   
    <div>
        <Header/>
        {<h1>{user.name}</h1>}
        {<h1>{user.email}</h1>}
        <h1>Inside Header Component</h1>
        <button onClick={logout}>Logout</button>
    </div>
  )

}
export default Profile;