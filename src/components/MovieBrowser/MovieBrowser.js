
// Movies- Loading

import React from "react"
import PropTypes from 'prop-types'
import MovieCard from "../MovieCard/MovieCard"
import {Movie} from "../types/movie-type"
import MovieList, {MovieListItem} from "../MovieList"
import {Button, Row} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import style from './style.module.scss'

MovieBrowser.propTypes = {
    movies: PropTypes.arrayOf(Movie),
    isFetching: PropTypes.bool,
    isFetched: PropTypes.bool,
    totalMovies: PropTypes.number,
    onLoadMore: PropTypes.func,
    placeholdersAmount: PropTypes.number,
}

function MovieBrowser({
    movies = [], 
    isFetching, 
    isFetched, 
    totalMovies, 
    placeholdersAmount = 5, 
    onLoadMore,
    onFavorite
}) {

    const canLoadMore = movies.length < totalMovies && !!onLoadMore

    return (
        <>
            <MovieList>
                {(isFetched ? 
                  movies : 
                  Array.from(new Array(placeholdersAmount))).map((movie, index) => (
                    <MovieListItem key={movie ? movie.id : 'index:'+index}>
                        {movie ?
                            <div height={400} >
                                <MovieCard {...movie} onFavorite={onFavorite} />
                            </div> :
                            null}
                    </MovieListItem>
                ))}
            </MovieList>

           <Row className={style.rowLoad}>
             {canLoadMore &&
            <Button className={style.loadBtn}  disabled={isFetching} onClick={onLoadMore}>
                {isFetching ?
                    <div/> :
                    <div></div>}
                {isFetching ? <LoadingOutlined /> : "Load More.."}
            </Button>}
           </Row>
        </>
    )
}

export default MovieBrowser
