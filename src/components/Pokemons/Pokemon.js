import React from 'react';

import "./Pokemon.css"

const Pokemon = ({img, name, desc}) => {
    return (
        <div className="card">
            <img src={img} alt="" className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title"> {name} </h5>
                <p className="card-text"> {desc} </p>
                <a href="#" className="btn btn-primary">See Profile</a>
            </div>
        </div>
    )
}

export default Pokemon;
