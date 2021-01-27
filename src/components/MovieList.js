import React from 'react'
import { Row} from 'antd'

export function MovieList({children}) {
    return (
        <Row style={{justifyContent:'center'}}>
            {children}
        </Row>
    )
}

export function MovieListItem({children}) {
    return (
        <Row>
            {children}
        </Row>
    )

}

export default MovieList
