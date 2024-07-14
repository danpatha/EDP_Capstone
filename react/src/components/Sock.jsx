import React from 'react';
import { Link } from 'react-router-dom';

const Sock = (props) => {

    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
               <Link to={`/product/${props.data._id}`}>
                <div className="card-text">Brand: {props.data.brand}</div>
                </Link> 
                <div className="card-text">Price: {props.data.Price}</div>
                <div className="card-text">Category: {props.data.Categories}</div>
                {/* <div className="card-text">Condition: {props.data.sockDetails.condition}</div>
                <div className="card-text">For Foot: {props.data.sockDetails.forFoot}</div>
            </div>
            <div className="card-body">
                <h5 className="card-title">Additional Features</h5>
                <div className="card-text">Water Resistant: {props.data.additionalFeatures.waterResistant ? "Yes" : "No"}</div>
                <div className="card-text">Padded: {props.data.additionalFeatures.padded ? "Yes" : "No"}</div>
                <div className="card-text">Anti Bacterial: {props.data.additionalFeatures.antiBacterial ? "Yes" : "No"}</div>
            </div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <small className="text-muted">Added: {props.data.addedTimestamp}</small> 
                <button className="btn btn-sm btn-danger" onClick={() => props.handleDelete(props.data._id)}>Delete</button> */}
            </div>
        </div>
    );
};

export default Sock;