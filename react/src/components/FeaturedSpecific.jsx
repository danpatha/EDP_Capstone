import React, {useMemo} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";

const FeaturedSpecific = (props) => {
const formatPrice = useMemo(() =>{
const formatter = new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"})
return formatter.format(props.data.Price)
},[props.data.Price]);

console.log(props)

    return (
        <div> 
            
        <div className="card" a href="#">
            <div className="card bg-light">
            <div className="card-text">Item:{props.data.Objects}</div>
            <div className="card-text">Brand: {props.data.brand}</div>
                <div className="card-text">Price: {formatPrice}</div>
            <div className="card-text">Size: {props.data.Size}</div>
              
            </div>
        </div>
        
        </div>
    );
};

export default FeaturedSpecific;