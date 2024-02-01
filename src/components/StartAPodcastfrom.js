import React, { useState } from 'react'
import Header from './Header';
import CustomeFileInput from './CustomeFileInput';
import { toast } from 'react-toastify';
import { ref } from 'firebase/storage'
import 'firebase/firestore';
import {auth, db, storage} from "../firebase";
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


const StartAPodcastfrom = () => {
    let [Title,setTittle]=useState("");
    let [disc,setDisc]=useState("");
    let [DisplayImage,setDisplayImage]=useState();
    let [BannerImage,setBannerImage]=useState();
    let [loading,setLoading]=useState(false);

    async function handleSubmit()
    {  
     
        if(Title && disc && DisplayImage && BannerImage)
        {
          
            try{ 
              setLoading(true);
              const bannerImageref=ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`);
              await uploadBytes(bannerImageref,BannerImage);
              const bannerImageUrl=await getDownloadURL(bannerImageref);
            
              const DisplayImageref=ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`);
              await uploadBytes(DisplayImageref,DisplayImage);
              const DisplayImageUrl=await getDownloadURL(DisplayImageref);

              let docref=await addDoc(collection(db,"podcasts"),{title:Title,discription:disc,bannerImage:bannerImageUrl,displayImage:DisplayImageUrl,createBy:auth.currentUser.uid});
              toast.success("poadcast creacted");

              setTittle("");
              setDisc("");
              setDisplayImage(null);
              setBannerImage(null);
              setLoading(false);

            }catch(e){
              setLoading(false);
              toast.error(e.message);
            }
        }else{
          toast.error("Enter all values");
        }
    }

  return (
    <div>
        <Header/>
        <center><h1 style={{color:'white',fontWeight:"300"}}>Create A PodCast</h1></center>
        <div className='podcastform'>
            <input required='true' type="text" placeholder='Tittle' onChange={(e)=>setTittle(e.target.value)} />
            <input required='true' type="text" placeholder='Description' onChange={(e)=>setDisc(e.target.value)} />
            <CustomeFileInput accept={"image/*"} id={"display-image-input"} setfun={setDisplayImage} text="Upload display image"/>
            <CustomeFileInput accept={"image/*"} id={"banner-image-input"} setfun={setBannerImage}  text="Upload banner image"/>
            {loading?<button onClick={handleSubmit} disabled={loading}>loading...</button>:<button onClick={handleSubmit} disabled={loading}>CreatePodcast</button>}
        </div>
    </div>
  )
}

export default StartAPodcastfrom