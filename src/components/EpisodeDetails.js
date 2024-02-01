import React from 'react'

const EpisodeDetails = ({title,description,audiofile,onClick}) => {

  function handlePlay()
  {
    console.log("hii");
  }
  return (
    <div>
       <h1>{title}</h1>
       <p>{description}</p>
       <button onClick={handlePlay}>Play</button>
    </div>
  )
}

export default EpisodeDetails