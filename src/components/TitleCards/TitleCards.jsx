import React, { useEffect , useRef, useState } from 'react'
import './TitleCards.css'

import { Link } from 'react-router-dom'

const TitleCards = ({title , category}) => {

const [apiData,setApiData]=useState([]);
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjNkYTI5MDNjODZkM2RhYzUyNDEzMzdjYmExMTExMyIsIm5iZiI6MTc2Mjg1MzUwMi4xMDcsInN1YiI6IjY5MTMwMjdlMTJjYTQ3NmQ1YWRkMjYzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lZ7yHopW98eay6M4Ii972svrWV_4DseTKCwRnY6GX1A'
  }
};



const handlewheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
  
   fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)

  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  
  


  cardsRef.current.addEventListener('wheel',handlewheel);},[])




  return (
    <div className='title-cards'>
      <h2>{title?title:"popular on netflix" }</h2>
      <div className='cards-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
          <p>{card.original_title}</p>

          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards