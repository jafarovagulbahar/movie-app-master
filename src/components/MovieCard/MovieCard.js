
// All Movie Card Items

import React from "react"
import {Link} from "react-router-dom"
import { Button, Card, Rate, } from 'antd'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import style from './style.module.scss'

function MovieCard({id, 
    title, 
    genres, 
    voteAverage, 
    releaseDate, 
    posterImageUrl, 
    isFavorite, 
    onFavorite}) 
    {
 
    const vote = voteAverage > 0 ? voteAverage : '-'

    function handleFavorite(e){
        e.stopPropagation()
        e.preventDefault()
        onFavorite && onFavorite(id)
    }
    const poster = posterImageUrl || require('./abstract_movie_poster.svg')
    return (
        
       <div className={style.movieListItem}>
            <Link className={style.root} to={"/movie/"+id}>        
                <Card
                    className={style.card}
                    cover={<img src={poster} alt={title} />}
                >
                    <span className={style.maintitle}>{title}</span>
                    <div className={style.overly}>  
                        <div className={style.buttonHeart}>                   
                            <Button     
                                onClick={handleFavorite}
                                className={
                                    isFavorite ? 
                                    "favoriteBtn" : 
                                    "favoriteBtnActive"}
                            >
                                    {isFavorite ?
                                    <HeartFilled /> : 
                                    <HeartOutlined />}
                                 
                            </Button>  
                        </div>    
        
                        <div className={style.details}>
                            <div className={style.filmtitle}>
                            <span>{title}</span>
                            </div>
                        <div>
                            <Rate allowHalf defaultValue={vote /2.3} />
                        </div>
                            <div className={style.extraInfo}>
                                {new Date(releaseDate).getFullYear()} •
                                {genres.length ? genres.slice(0, 3).join(', '): '-'}
                            </div>
                        </div>
                    </div>            
                </Card>
            </Link>
       </div>
    )
}

export default MovieCard
