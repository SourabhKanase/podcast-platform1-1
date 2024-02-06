import React from 'react'

const EpisodeDetails = ({title,description,audiofile,onClick,setPlayepisod}) => {

  function handlePlay()
  {
    console.log("hii");
    console.log(audiofile);
    setPlayepisod(audiofile);
  }
  return (
    <div>
       <h1>{title}</h1>
       <p>{description}</p>
       <button className='playbutton' onClick={handlePlay}>Play</button>
    </div>
  )
}

export default EpisodeDetails;