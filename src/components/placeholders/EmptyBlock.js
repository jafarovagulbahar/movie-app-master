
// Empty Page
import React from 'react'
import style from './style.module.scss'

function EmptyBlock({text}) {
    return (
        <div className={style.container}>
            <h3>{text}</h3>
        </div>

    )
}

export default EmptyBlock
