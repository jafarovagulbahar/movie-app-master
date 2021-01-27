
// Navbar 

import React, {useCallback, useEffect, useState} from "react"
import { Link } from "react-router-dom"
import SearchOutput from "../Search/SearchOutput"
import {cancelSearch, changeQuery, searchMovies} from "../../store/domains/search/search.actions"
import {connect} from "react-redux"
import {debounce} from "../types/debounce"

import { PageHeader, Button, Row, Input} from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import style from './style.module.scss'

const { Search } = Input;

function Navbar(props) {

    const {onMenu} = props
    const {query, foundMovies, entities, location} = props
    const {changeQuery, searchMovies, cancelSearch} = props
    const [showOutput, setShowOutput] = useState(false)

    // add 'genres' property
    const output = foundMovies.map(movie => 
        ({...movie, genres: movie.genreIds.map(id => entities.genresById[id])}
    ))

    const searchDebounce = useCallback(debounce(function (value) {
        searchMovies(value)
        setShowOutput(true)
    }, 600), [searchMovies])

    function handleSearchInput(e) {
        const value = e.target.value
        changeQuery(value)
        cancelSearch()
        if (value.length && value.trim().length < 2) return
        searchDebounce(value)
    }

    // disable/enable scrolling of body element
    useEffect(function () {
        bodyScrolling(!(showOutput && foundMovies.length))
    }, [showOutput, foundMovies])

    // hide output when location (page) has changed
    useEffect(function () {
        setShowOutput(false)
    }, [location])

  

    const desktopNavbar = () => (
        <>
        <div className={style.mainBanner}>
            <PageHeader>   
            <Search
                className={style.search}
                value={query}
                placeholder={"Search..."}
                allowClear
                onChange={handleSearchInput}
                onBlur={e => !query && setShowOutput(false) }
                onFocus={() => setShowOutput(true)}
                />
            
            <div className={style.menuBtn}>
            <Button onClick={onMenu}>
                <MenuOutlined />
                </Button>
            </div>
                <Row className={style.navbarRow}>
                    <Link to="/" className="brand">
                        <img
                            className={style.logo} 
                            src='../assets/images/mainLogo2.png' alt='Logo' />
                    </Link>
            </Row>
            </PageHeader>
        </div>
            {showOutput && 
               <div 
                    className={style.overlay} 
                    onClick={e => setShowOutput(false)}/>}
                    
            {(!!output.length && showOutput) && 
                <SearchOutput movies={output}/>}
          </>
    )

    return (
        desktopNavbar()
    )
}

function bodyScrolling(enabled) {
    document.body.style.overflow = enabled ? '' : 'hidden'
}

function mapStateToProps(state) {
    return {
        ...state.search,
        entities: state.entities,
        location: state.router.location.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchMovies: (query) => dispatch(searchMovies(query)),
        cancelSearch: () => dispatch(cancelSearch()),
        changeQuery: (value) => dispatch(changeQuery(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
