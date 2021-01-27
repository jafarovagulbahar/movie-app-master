import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import EmptyBlock from "../components/placeholders/EmptyBlock"
import {getMovie} from "../store/utils"
import MovieCardFetch from "../components/MovieCardFetch"
import {fetchMovie} from "../store/domains/entities/entities.actions"
import {clearVisitedMovies, 
        toggleFavorite
        } from "../store/domains/user/user.actions"
import MovieList, {MovieListItem} from "../components/MovieList"
import {Row, Col, Button} from 'antd'
import { ClearOutlined } from '@ant-design/icons'
import style from './style.module.scss'

function Visited({isAppReady, 
                  movieIds, 
                  entities, 
                  user, 
                  fetchMovie, 
                  toggleFavorite, 
                  cleanVisitedMovies}) {
    return (
        <Col className={style.FavVisContainer}>
            <Row className={style.nav}>
              <Col span={10} className={style.ColFlex}>
              <h3>
               <Link to='/'>
                    Home
                </Link>
               </h3>
              </Col>
               <Col  span={10}  className={style.ColFlex} >
               <Button 
                    onClick={cleanVisitedMovies} 
                    disabled={!movieIds.length}>
                        <ClearOutlined />
                        Clear history
                </Button>
               </Col>
            </Row>
            <Row className={style.title}>
                <h3>
                   Visited movies
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
                            <div minheight={400} key={id}>
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

function mapStateToProps(state){
    return {
        isAppReady: state.common.isAppReady,
        movieIds: state.user.visitedMovieIds,
        entities: state.entities,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovie: (id) => dispatch(fetchMovie(id)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id)),
        cleanVisitedMovies: () => dispatch(clearVisitedMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Visited)
