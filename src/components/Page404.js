import React from 'react'
import {Row} from "antd"
import {Link} from "react-router-dom"




function Page404(props) {
    return (
        <Row className="container">
            <div className="title">Ooops! We're sorry! </div>
            <div className="subtitle">
                Try searching or go to
                <Link className="action" to="/">Home page.</Link>
            </div>
        </Row>
    )
}

export default Page404
