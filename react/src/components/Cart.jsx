import React , {useMemo} from 'react';



const Cart = (props) => {
 const formatPrice = useMemo(() => {
   const formatter = new Intl.NumberFormat("en-US", {
     style: "currency",
     currency: "USD",
   });
   return formatter.format(props);
 }, [props]);

 console.log(props.cart.items)
    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h2>Your Cart has {props.cart.items.length} items.</h2>

                

                {
          props.cart.items.map((item) => (
            <>
            <div className="card-text">Brand: {item.brand}</div>
            <div className="card-text">Price: {formatPrice}</div>
            <div className="card-text">Size: {item.Size}</div>
        
        </>

          ))
      }

      
<form>
  <label>
    Payment Info:
    <input type="text"  placeholder='Card Number' />
    <input type="text"  placeholder='Exp. MM/YY' />
    <input type="text"  placeholder='CVV'/>
    <br></br>

    <input type="text"  placeholder='Shipping Address'/>
  </label>


  <input type="submit" value="Submit" />
</form>
   
            </div>
        </div>
    );
};

export default Cart