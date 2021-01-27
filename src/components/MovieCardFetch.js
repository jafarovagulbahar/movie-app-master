import React, {useEffect} from "react"
import MovieCard from "./MovieCard/MovieCard"



function MovieCardFetch({id, movie, ready, fetch, onFavorite}) {

    useEffect(function () {
        if (!movie && ready) fetch(id)
    }, [id, movie, fetch, ready])

    return (
        !!movie ? <MovieCard {...movie} onFavorite={onFavorite}/> : null
    )
}

export default MovieCardFetch
