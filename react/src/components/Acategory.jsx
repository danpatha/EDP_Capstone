import React from 'react';


const Acategory = (props) => {

    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
          
                <h5 className="card-title">{props.data.title}</h5>

        </div>
    );
};

export default Acategory;