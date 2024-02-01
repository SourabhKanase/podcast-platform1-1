import React, { useState } from 'react'
import Header from '../components/Header';
import CustomeFileInput from "../components/CustomeFileInput"
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
const CreateAnEpisode = () => {
  let [title,setTitle]=useState("");
  let [desc,setDesc]=useState("");
  let [audio,setAudio]=useState();
  let [loading,setloading]=useState(false);
  const {id}=useParams();
  console.log(id);
  async function handleSubmit()
  { 
    setloading(true);
    if(title,desc,audio,id)
    {
      try{
        const audioref=ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(audioref,audio);
        const audioUrl=await getDownloadURL(audioref);

        // await setDoc(doc(db,"users",user.uid),{name:name,email:email,uid:user.uid});
                
        // await addDoc(collection(db,"podcasts"),{title:Title,discription:disc,bannerImage:bannerImageUrl,displayImage:DisplayImageUrl,createBy:auth.currentUser.uid});
        
        await addDoc(collection(db,"podcasts",id,"episodes"),{title:title,description:desc,audioUrl:audioUrl});
        setloading(false);


      }catch(e)
      {
        setloading(false);
        toast.error(e.message);
      }
      
    }else{
      setloading(false);
      toast.error("Enter All Values");
    }


  }
  return (
    <div>
        <Header/>
        <center><h1 style={{color:'white',fontWeight:"300"}}>Create An Episode</h1></center>
        <div className='createanepisode'>
            <input type='text' placeholder='Episode Name' onChange={(e)=>setTitle(e.target.value)}required/>
            <input type='text' placeholder='Episode Details' onChange={(e)=>setDesc(e.target.value)} required/>
            <CustomeFileInput id={"audio-file-input"}accept={"audio/*"} text="Upload Audio File" setfun={setAudio}/>
            {loading?<button onClick={handleSubmit} disabled={loading}>loading...</button>:<button onClick={handleSubmit} disabled={loading}>Create a Episode</button>}
        </div>
    </div>
  )
}

export default CreateAnEpisode;