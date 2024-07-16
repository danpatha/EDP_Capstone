import React , {useMemo} from 'react';

const CartItem = (props) => {
    const formatPrice = useMemo(() => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(props.item.Price);
    }, [props.item.Price]);
   
   
    return (
      <div>
              

            <div className="card-text">Brand: {props.item.brand}</div>
            <div className="card-text">Price: {formatPrice}</div>
            <div className="card-text">Size: {props.item.Size}</div>
         
        
        
     </div>
    );
  };
  
  export default CartItem;