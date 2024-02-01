import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { QuerySnapshot, collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import EpisodeDetails from "../components/EpisodeDetails";

const PodcastdetailPage = () => {
  let [requiredpodcastdeatils, setRequiredpodcastdetails] = useState();
  let [episodes,setEpisodes]=useState([]);
  
  console.log(episodes);

  console.log(requiredpodcastdeatils);
  let { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getdata();
    }
  }, [id]);

  async function getdata() {
    const podcastRef = doc(db, "podcasts", id);

    try {
      const podcastDoc = await getDoc(podcastRef);
      if (podcastDoc.exists()) {
        // The document exists, and you can access its data using podcastDoc.data()
        const podcastData = podcastDoc.data();
        console.log("Podcast data:", podcastData);
        setRequiredpodcastdetails(podcastData);
        // toast.success("podcast found");
      } else {
        console.log("No such document!");
        toast.error("No such document!");
        navigate("/podcast");
      }
    } catch (error) {
      console.error("Error getting document:", error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const unsubscribe=onSnapshot(
      query(collection(db,"podcasts",id,"episodes")),
      (querySnapshot)=>{
        const episodesDta=[];
        querySnapshot.forEach((doc)=>{
          episodesDta.push({id:doc.id,...doc.data()});
        });
        setEpisodes(episodesDta);
      },
      (error)=>{
        console.log("error fetching episodes:",error);
      }
    );
  
    return () => {
      unsubscribe();
    }
  }, [id]);
  

  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "white" }}>PodCastDeatils</h1>
      </div>
      <div className="podcastdetailsdiv">
        {requiredpodcastdeatils && (
          <div className="podcastdetail">
            <div className="createepisodebuttondiv" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
               <h1>{requiredpodcastdeatils.title}</h1>
               {requiredpodcastdeatils.createBy===auth.currentUser.uid && <button style={{width:"150px",padding:"10px"}} onClick={()=>{navigate(`/podcast/${id}/episodes`)}}>Create Episode</button>}
            </div>
            <img className="bannerImage" src={requiredpodcastdeatils.bannerImage} />
            <p>{requiredpodcastdeatils.discription}</p>
            <h1>Episodes</h1>
            {episodes.length>0?
            (
              <ol><li>{episodes.map((data)=>{
                   return <EpisodeDetails title={data.title} description={data.description} audiofile={data.audioUrl}/>
              })}
              </li>
              </ol>
            )
            :<p>NO EPISODES</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastdetailPage;
