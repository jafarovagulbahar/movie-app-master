import {
    UPCOMING_MOVIES_FETCH_FAIL,
    UPCOMING_MOVIES_FETCH_REQUEST,
    UPCOMING_MOVIES_FETCH_SUCCESS,

    POPULAR_MOVIES_FETCH_FAIL,
    POPULAR_MOVIES_FETCH_REQUEST,
    POPULAR_MOVIES_FETCH_SUCCESS, 

    TOP_RATED_MOVIES_FETCH_FAIL,
    TOP_RATED_MOVIES_FETCH_REQUEST,
    TOP_RATED_MOVIES_FETCH_SUCCESS,

    NOW_PLAYING_MOVIES_FETCH_FAIL,
    NOW_PLAYING_MOVIES_FETCH_REQUEST,
    NOW_PLAYING_MOVIES_FETCH_SUCCESS,

} from "./home.types"
import {moviesFetchReducer} from "../shared"

const initialState = {
    popularMovies: moviesFetchReducer("POPULAR_MOVIES", undefined, {}),
    topRatedMovies: moviesFetchReducer("TOP_RATED_MOVIES", undefined, {}),
    upcomingMovies: moviesFetchReducer("UPCOMING_MOVIES", undefined, {}),
    nowPlayingMovies: moviesFetchReducer("NOW_PLAYING_MOVIES", undefined, {}),
}

export function homeReducer(state = initialState, action) {
    const {type} = action
    switch (type) {
        case POPULAR_MOVIES_FETCH_REQUEST:
        case POPULAR_MOVIES_FETCH_SUCCESS:
        case POPULAR_MOVIES_FETCH_FAIL:
            return {
                ...state,
                popularMovies: moviesFetchReducer("POPULAR_MOVIES", state.popularMovies, action)
            }

        case TOP_RATED_MOVIES_FETCH_REQUEST:
        case TOP_RATED_MOVIES_FETCH_SUCCESS:
        case TOP_RATED_MOVIES_FETCH_FAIL:
            return {
                ...state,
                topRatedMovies: moviesFetchReducer("TOP_RATED_MOVIES", state.topRatedMovies, action)
            }

        case UPCOMING_MOVIES_FETCH_REQUEST:
        case UPCOMING_MOVIES_FETCH_SUCCESS:
        case UPCOMING_MOVIES_FETCH_FAIL:
            return {
                ...state,
                upcomingMovies: moviesFetchReducer("UPCOMING_MOVIES", state.upcomingMovies, action)
            }

        case NOW_PLAYING_MOVIES_FETCH_REQUEST:
        case NOW_PLAYING_MOVIES_FETCH_SUCCESS:
        case NOW_PLAYING_MOVIES_FETCH_FAIL:
            return {
                ...state,
                nowPlayingMovies: moviesFetchReducer("NOW_PLAYING_MOVIES", state.nowPlayingMovies, action)
            }
        default:
            return state
    }
}
