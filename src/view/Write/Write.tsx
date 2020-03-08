import React from 'react'
import './Write.css'
export default function Recommend(props:any) {
    console.log(props.match.params)
    let id = props.match.params.id
    return (
        <div className="write-container">
            <h2>{id}write</h2>
        </div>
    )
}