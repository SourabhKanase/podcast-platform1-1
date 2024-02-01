import React from 'react'
import { Link } from 'react-router-dom'

const Podcastcard = ({id,title,displayImage}) => {
  return (
    <Link  to={`/podcast/${id}`}>
        <div className='podcastcard'>
            <img src={displayImage}/>
            <p>{title}</p>
        </div>
    </Link>
  )
}

export default Podcastcard