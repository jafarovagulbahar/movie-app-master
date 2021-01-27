
// App 
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {Switch, Route} from "react-router-dom"
import {fetchGenres} from "../../store/domains/common/common.actions"
import Notifier from "../Notifier"
import Home from "../../container/Home/Home"
import Movie from "../../container/MovieInfo/Movie"
import Favorites from "../../container/Favorites"
import Visited from "../../container/Visited"
import Sidebar from "../Sidebar/Sidebar"
import Navbar from "../Navbar/Navbar"
import Page404 from "../Page404"
import "antd/dist/antd.css";

function App(props) {
    const {isLoading, location, fetchGenres} = props
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(function () {
        fetchGenres()
    }, [fetchGenres])

    useEffect(function () {
        setShowSidebar(false)
    }, [location])

    return (
        <>
            <Notifier/>
                {isLoading}
            <Navbar onMenu={() => setShowSidebar(!showSidebar)}/>
            <Sidebar open={showSidebar} onClose={() => setShowSidebar(!showSidebar)} />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/movie/:id" component={Movie}/>
                <Route path="/favorites" component={Favorites}/>
                <Route path="/visited" component={Visited}/>
                <Route component={Page404}/>
            </Switch>
        </>
    );
}

function mapStateToProps(state) {
    return {
        isLoading: !state.common.isGenresLoaded || state.search.isFetching || state.movie.isFetching,
        errors: state.ui.errors,
        location: state.router.location.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGenres: () => dispatch(fetchGenres()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
