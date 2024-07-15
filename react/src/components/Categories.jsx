import React from 'react';
import CategorySpecific from './CategorySpecific';


const Categories = (props) => {
console.log(props.data)
    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h2>Browse our Categories</h2>
                {
                props.data.map((category) => (
                    <CategorySpecific key={category} data={category} />
                ))
            }
                <div className="card-text"> </div>
            </div>
            <div className="card-body">
   
            </div>
        </div>
    );
};

export default Categories