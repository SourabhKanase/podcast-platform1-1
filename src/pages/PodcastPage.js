import React from 'react';
import Header from '../components/Header';
import Podcasts from '../components/Podcasts';

const PodcastPage = () => {
  return (
    <div>
         <Header/>
          <center><h1 style={{color:"white"}}>Discover Podcast</h1></center>
          <Podcasts/>
    </div>
  )
}

export default PodcastPage;