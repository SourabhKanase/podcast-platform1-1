import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { setPodcasts } from '../reduxToolkit/Features/PodcastSlice';
import {collection,onSnapshot,query} from "firebase/firestore";
import {db} from "../firebase";
import Podcastcard from './Podcastcard';
const Podcasts = () => {
  
  const podcast=useSelector((state)=>state.podcast);
  const dispatch=useDispatch();

  let [search,setsearch]=useState("");

  useEffect(()=>{
    const unsubscribe=onSnapshot(
     query(collection(db,"podcasts")),
     (arr)=>{
      // console.log("array for podcasts",arr);
        const podcastsData=[];
        arr.forEach((doc)=>{
            // console.log("data from array",doc.data());
            podcastsData.push({id:doc.id,...doc.data()});
        });
        dispatch(setPodcasts(podcastsData));
     },
     (error)=>{
        console.log("error fetching podcasts:" ,error);
     }
    );
    return ()=>{
        unsubscribe();
    }
  },[dispatch]);

  let filteredpodcasts = podcast.filter((item) => item.title.trim().toLowerCase().includes(search.trim().toLowerCase()));
  console.log(filteredpodcasts);
  return (
    <div className='forinput'>
        <input type='text' placeholder='search a podcast' onChange={(e)=>setsearch(e.target.value)}/>
        <div className='Poadcastdiv'>
        
        {filteredpodcasts.length>0?
        filteredpodcasts.map((item)=><Podcastcard id={item.id} title={item.title} displayImage={item.displayImage}/>)
        :<p>NO found</p>}
        </div>
    </div>
  )
}

export default Podcasts