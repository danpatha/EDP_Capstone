import React, {useEffect,useState} from 'react';
import {
    Link, useParams
  } from "react-router-dom";
import SportingGoodsList from './SportingGoodsList';
import Navigator from './Navigator';
  



const ProductsList = () => {
const {category} = useParams()
const [data, setData] = useState([]);
const [page, setPage] = useState(1); // State to store the current page number

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SPORTS_API_URL}/${page}/10?category=${category}`);
      if (!response.ok) {
        throw new Error('Data could not be fetched!');
      }
      const json_response = await response.json();
      setData(json_response);
    } catch (error) {
      console.error('Error fetching producsts:', error);
    }
  };

  fetchData();
}, [page,category]);

    return (
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
         <Navigator setPage={setPage} page={page} />
      {
          data.map((sock) => (
              <SportingGoodsList key={sock._id} data={sock} />
          ))
      }
      <Navigator setPage={setPage} page={page} />
  </div>
    
    );
};

export default ProductsList;