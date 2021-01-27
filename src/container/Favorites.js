import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import EmptyBlock from "../components/placeholders/EmptyBlock"
import {fetchMovie} from "../store/domains/entities/entities.actions"
import {getMovie} from "../store/utils"
import {toggleFavorite} from "../store/domains/user/user.actions"
import MovieCardFetch from "../components/MovieCardFetch"
import MovieList, {MovieListItem} from "../components/MovieList"

import {Col, Row} from 'antd'
import style from './style.module.scss'

function Favorites({isAppReady, movieIds, entities, user, fetchMovie, toggleFavorite}) {

    return (
        
        <Col className={style.FavVisContainer}>
           <Row className={style.nav}>
               <h3>
               <Link to='/'>
                    Home
                </Link>
               </h3>
           </Row>
           <Row className={style.title}>
                <h3>
                    Favorite movies
                </h3>
            </Row>
            {!movieIds.length && (
                <EmptyBlock text="You haven't marked favorite movies yet"/>
            )}
            {!!movieIds.length && (
                <MovieList>
                    {movieIds.map(id => {
                        const movie = getMovie(id, entities, user)
                        return (
                            <div minheight={400} key={id} >
                                <MovieListItem>
                                    <MovieCardFetch
                                        id={id}
                                        movie={movie}
                                        fetch={fetchMovie}
                                        ready={isAppReady}
                                        onFavorite={toggleFavorite}
                                    />
                                </MovieListItem>
                            </div>
                        )
                    })}
                </MovieList>
            )}
        </Col>
    )
}

function mapStateToProps(state) {
    return {
        isAppReady: state.common.isAppReady,
        movieIds: state.user.favoriteMovieIds,
        entities: state.entities,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovie: (id) => dispatch(fetchMovie(id)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
