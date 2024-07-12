import React from 'react';

const Promotion = (props) => {

    return (
        <div className="card" a href="#">
            <div className="card bg-light">
                <div className="card-text">{props.data.feature}</div>
                <div className="card-text">{props.data.benefit}</div>
            </div>
        </div>
    );
};

export default Promotion;