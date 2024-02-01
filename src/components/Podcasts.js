import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { setPodcasts } from '../reduxToolkit/Features/PodcastSlice';
import {collection,onSnapshot,query} from "firebase/firestore";
import {db} from "../firebase";
import Podcastcard from './Podcastcard';
const Podcasts = () => {
  let podcast=useSelector((state)=>state.podcast);
  let [search,setsearch]=useState("");

  const dispatch=useDispatch();
  
  
  useEffect(()=>{
    const unsubscribe=onSnapshot(
     query(collection(db,"podcasts")),
     (arr)=>{
        const podcastsData=[];
        arr.forEach((doc)=>{
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
  console.log(podcast);
  let filteredpodcasts = podcast.filter((item) => item.title.trim().toLowerCase().includes(search.trim().toLowerCase()));

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