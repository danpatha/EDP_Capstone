import React, {useEffect,useState} from 'react';
import {
    Link, useParams
  } from "react-router-dom";
import SportingGoodsList from './SportingGoodsList';
import Navigator from './Navigator';
  



const ProductSpecific = (props) => {
const {id} = useParams()
const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SPORTS_API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Data could not be fetched!');
      }
      const json_response = await response.json();
      setData(json_response);
    } catch (error) {
      console.error('Error fetching socks:', error);
    }
  };

  fetchData();
}, [id]);

const onclick = () =>{
    const nextCart = props.cart.items
    nextCart.push(data)
   props.setCart({...props.cart,items:nextCart})
}
//  if(data===null){
//     return
//  }

    return (
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
             { data && <SportingGoodsList data={data} /> }
             
             <button onClick={() => onclick()}>Add to Cart</button>
  </div>
    
    );
};

export default ProductSpecific;