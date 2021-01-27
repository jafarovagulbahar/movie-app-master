import React, {useEffect, useState} from 'react'
import MovieBrowser from "../../components/MovieBrowser/MovieBrowser"

import {connect} from "react-redux"
import {fetchPopularMovies,
        fetchTopRatedMovies, 
        fetchUpcomingMovies, 
        fetchNowPlayingMovies
       } from "../../store/domains/home/home.actions"
import {toggleFavorite} from "../../store/domains/user/user.actions"
import {getMovie} from "../../store/utils"
import style from './style.module.scss'


import { Tabs } from 'antd';
import Footer from '../../components/Footer/Footer'

const { TabPane } = Tabs;


const categories = {
    POPULAR: 'popular',
    TOP_RATED: 'top-rated',
    UPCOMING: 'upcoming',
    NOW_PLAYING: 'now-playing'
}

const MOVIES_PER_PAGE = 20

function Home(props) {
    const {
        isAppReady,

        popularMovies,
        topRatedMovies,
        upcomingMovies,
        nowPlayingMovies,
    
        entities,
        user,

        toggleFavorite,
        fetchPopularMovies,
        fetchTopRatedMovies,
        fetchUpcomingMovies,
        fetchNowPlayingMovies,

      
    } = props

    const [categoryName, setCategoryName] = useState(categories.POPULAR)
    const categoryMap = {
        [categories.POPULAR]: {
            movies: popularMovies,
            fetch: fetchPopularMovies
        },
        [categories.TOP_RATED]: {
            movies: topRatedMovies,
            fetch: fetchTopRatedMovies
        },
        [categories.UPCOMING]: {
            movies: upcomingMovies,
            fetch: fetchUpcomingMovies,
        },
        [categories.NOW_PLAYING]: {
            movies: nowPlayingMovies,
            fetch: fetchNowPlayingMovies,
        }
        
    }
    const category = categoryMap[categoryName]
    const movies = isAppReady ? category.movies.ids.map(id => getMovie(id, entities, user)) : []

    function loadMore() {
        if(category.movies.totalMovies === category.movies.ids.length) return
        category.fetch(category.movies.ids.length / MOVIES_PER_PAGE + 1)
    }

    function switchTab(name){
        console.log(name)
        setCategoryName(name)
        const newCategory = categoryMap[name]
        if(!newCategory.movies.ids.length) newCategory.fetch()
    }

    useEffect(function () {
        switchTab(categories.POPULAR)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className={style.container}>
                <Tabs className={style.tabs} defaultActiveKey="1" onChange={switchTab}>
                    <TabPane  tab={<h4>Popular</h4>} key={categories.POPULAR}/>                
                    <TabPane tab={<h4>Top Rated</h4>} key={categories.TOP_RATED}/>                
                    <TabPane tab={<h4>Upciming</h4>} key={categories.UPCOMING}/>
                    <TabPane tab={<h4>Now Playing</h4>} key={categories.NOW_PLAYING}/>                
                </Tabs>
             
                <main className='movieList'>
                    <MovieBrowser
                        onLoadMore={loadMore}
                        placeholdersAmount={10}
                        movies={movies}
                        onFavorite={toggleFavorite}
                        isFetched={category.movies.isFetched}
                        isFetching={!isAppReady || category.movies.isFetching}
                        totalMovies={category.movies.totalMovies}
                    />
                     <Footer/>
                </main>
               
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAppReady: state.common.isAppReady,

        popularMovies: state.home.popularMovies,
        topRatedMovies: state.home.topRatedMovies,
        upcomingMovies: state.home.upcomingMovies,
        nowPlayingMovies: state.home.nowPlayingMovies,
        entities: state.entities,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPopularMovies: (page) => dispatch(fetchPopularMovies(page)),
        fetchTopRatedMovies: (page) => dispatch(fetchTopRatedMovies(page)),
        fetchUpcomingMovies: (page) => dispatch(fetchUpcomingMovies(page)),
        fetchNowPlayingMovies: (page) => dispatch(fetchNowPlayingMovies(page)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
