import React from 'react';
import {
    Link
  } from "react-router-dom";
import Categories from './Categories';


const Acategory = (props) => {

    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
          <Link to={`/products/${props.data}`}>
                 <h5 className="card-title">{props.data}</h5> 
                 </Link>

        </div>
    );
};

export default Acategory;