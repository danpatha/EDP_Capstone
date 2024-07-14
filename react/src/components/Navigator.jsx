import React from 'react';

const Navigator = (props) => {
    const handleNextPage = () => {
        props.setPage(props.page + 1); // Increment the page state by 1
    };

    const handlePreviousPage = () => {
        props.setPage(props.page - 1); // Decrement the page state by 1
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button className='btn btn-primary' disabled={props.page===1} onClick={handlePreviousPage}>Back</button>
            <button className='btn btn-primary' onClick={handleNextPage}>Next</button>
        </div>
    );
};

export default Navigator;