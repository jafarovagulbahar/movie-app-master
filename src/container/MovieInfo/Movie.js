// Movie Detalies page

import React, {useCallback, useEffect} from 'react'
import {useParams} from "react-router"
import {connect} from "react-redux"
import {fetchMoviePage, 
        fetchRecommendedMovies, 
        fetchSimilarMovies
       } from "../../store/domains/movie/movie.actions"

import {getMovie} from "../../store/utils"
import MovieBrowser from "../../components/MovieBrowser/MovieBrowser"
import {makeMovieVisited, 
        toggleFavorite
        } from "../../store/domains/user/user.actions"

import {Formatter} from "../../components/types/formatter"
import EmptyBlock from "../../components/placeholders/EmptyBlock"
import style from './style.module.scss'
import {Button, Rate, Row, Col} from 'antd'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';


function Movie(props) {
    const {id: urlId} = useParams()
    const {
        isAppReady,
        movie,
        fetchMovie,
        toggleFavorite,
        makeMovieVisited,
    } = props

    useEffect(function () {
        fetchMovie(urlId)
        window.scrollTo({top: 0, left: 0})
    }, [urlId, fetchMovie])

    useEffect(function () {
        if(movie.isFetched) makeMovieVisited(movie.id)
    }, [movie.id, makeMovieVisited])

    return (
        <React.Fragment>
            <MovieInfo  
                movie={movie} 
                loaded={isAppReady && 
                movie.isFetched} 
                onFavorite={toggleFavorite}
            />
            <MovieRecommendations {...props} id={urlId}/>
        </React.Fragment>
    )
}

function MovieInfo({ movie, loaded, onFavorite}) {
    const {
        id,
        title,
        genres,
        duration,
        budget,
        posterImageUrl,
        releaseDate,
        productionCountries,
        voteAverage,
        overview,
        isFavorite
    } = movie


    const poster = posterImageUrl || require('./abstract_movie_poster.svg')
    return (
        <main>
            <div className={style.backdrop}>
                <img  src={poster} alt={title}/>
                <div className={style.overly}></div>
            </div>
            <Row className={style.movieContainer} >
                {loaded ?              
                    <div className={style.imgDiv}>
                        <Col >
                            <img  src={poster} alt={"Poster of " + title}/>
                            <Button     
                                onClick={() => onFavorite(id)}
                                className={isFavorite ? "contained" : "outlined"}>
                                {isFavorite ? <HeartFilled /> : <HeartOutlined />}
                            </Button>  
                        </Col>
                        
                        <Col className={style.movieDetalies}>

                        <Col className={style.movieName}>
                            {title}
                        </Col>

                        <Col>
                            {Formatter.formatDate(releaseDate)}
                             ({productionCountries.join(', ')})
                        </Col>

                        <Col>
                            {genres.map((genre,id)=> (
                                <span key={id}>
                                <span >{genre}</span>{' '}
                                </span>
                            ))}
                        </Col>
                        
                        <Col>
                            <div value={voteAverage / 2} />
                            <span>{voteAverage}/10</span>
                        </Col>
                        <Col>
                            <Rate allowHalf defaultValue={voteAverage/2.3} />
                        </Col>
                        
                        <Col>
                            <Col>
                                <b>Duration:</b> {duration} min.
                            </Col>
                            <Col>
                                <b>Budget:</b> {
                                budget ? 
                                '$' + Formatter.numberWithCommas(budget) : 
                                 '-'
                                 }
                            </Col>
                        </Col>
                            <Col className={style.desc}>{overview}</Col>
                    
                        </Col>
                    </div>:
                    null}
            </Row>
        </main>
    )
}

function MovieRecommendations(props) {
    const {
        id,

        movie,
        entities,
        user,

        toggleFavorite,
        fetchSimilarMovies,
        fetchRecommendedMovies,
    } = props

    const {recommendedMovies: recommended, similarMovies: similar} = movie

    const MOVIES_PER_LIST = 6

    const recommendedMovies = recommended.ids.slice(0, MOVIES_PER_LIST).map(id => getMovie(id, entities, user))
    const similarMovies = similar.ids.slice(0, MOVIES_PER_LIST).map(id => getMovie(id, entities, user))

    const fetchSimilarMoviesCb = useCallback(() => fetchSimilarMovies(id), [id, fetchSimilarMovies])
    const fetchRecommendedMoviesCb = useCallback(() => fetchRecommendedMovies(id), [id, fetchRecommendedMovies])

    return (
        <>
            <section>
                <h2>Recommended movies</h2>
                <div height={400}>
                    <MovieList
                        isFetching={recommended.isFetching}
                        isFetched={recommended.isFetched}
                        movies={recommendedMovies}
                        amount={MOVIES_PER_LIST}
                        fetch={fetchRecommendedMoviesCb}
                        onFavorite={toggleFavorite}
                    />
                </div>
            </section>
            <section>
                <h2>Similar movies</h2>
                <div height={400}>
                    <MovieList
                        isFetching={similar.isFetching}
                        isFetched={similar.isFetched}
                        movies={similarMovies}
                        amount={MOVIES_PER_LIST}
                        fetch={fetchSimilarMoviesCb}
                        onFavorite={toggleFavorite}
                    />
                </div>
            </section>
        </>
    )
}


function MovieList({isFetching, isFetched, movies = [], amount, fetch, onFavorite}) {

    useEffect(function () {
        fetch()
    }, [fetch])

    if (isFetched && !movies.length) return (
        <EmptyBlock text={"There is no data for this movie"} />
    )

    return (
        <MovieBrowser 
            placeholdersAmount={amount}
            isFetching={isFetching}
            isFetched={isFetched}
            movies={movies}
            onFavorite={onFavorite}
        />
    )
}

function mapStateToProps(state) {
    let movie = state.movie.isFetched ? getMovie(state.movie.id, state.entities, state.user) : {}
    movie = {...movie, ...state.movie}
    return {
        isAppReady: state.common.isAppReady,
        movie: movie,
        entities: state.entities,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovie: (id) => dispatch(fetchMoviePage(id)),
        fetchSimilarMovies: (id) => dispatch(fetchSimilarMovies(id)),
        fetchRecommendedMovies: (id) => dispatch(fetchRecommendedMovies(id)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id)),
        makeMovieVisited: (id) => dispatch(makeMovieVisited(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
