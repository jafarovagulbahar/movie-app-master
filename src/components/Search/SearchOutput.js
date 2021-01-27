// Search Output 

import React from 'react'
import PropTypes from 'prop-types'
import {Movie} from "../types/movie-type"
import {Link} from "react-router-dom"
import {List, Rate} from "antd"
import style from './style.module.scss'

SearchOutput.propTypes = {
    movies: PropTypes.arrayOf(Movie)
}

function SearchOutput({movies = [], fullHeight = false}) {
  
    return (
        <React.Fragment>
            <List itemLayout="horizontal" 
                  className={style.searchOutput} 
                  aria-labelledby="nested-list-subheader">
                {movies.map(movie => <Item key={movie.id} movie={movie} />)}
            </List>
        </React.Fragment>
    )
}

function Item({movie}){
    const poster = movie.posterImageUrl || require('./abstract_movie_poster.svg')

    return (
    <List.Item>
        <Link className={style.details} to={"/movie/" + movie.id}>
            <div>
                <img src={poster} alt={movie.title}/>
            </div>
            <div className={style.desc}>
                <h4>{movie.title}</h4>
                <p>{movie.releaseDate > 0 ? ` (${movie.releaseDate.getFullYear()})` : ''}</p>
                <p>{!!movie.genres.length ? movie.genres.join(', ') : '—'}</p>
                <Rate allowHalf defaultValue={movie.voteAverage /2.3} />
            </div>   
        </Link>      
    </List.Item>
          
      
      
    )
}

export default SearchOutput
