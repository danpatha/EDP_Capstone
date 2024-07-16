import React , {useMemo} from 'react';
import CartItem from './CartItem';





const Cart = (props) => {
 const cartTotal = useMemo(() => {
 const total = props.cart.items.reduce((accumulatedValue, nextValue)=>{
    return accumulatedValue + nextValue.Price
  },0)
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(total);
 },[props.cart.items]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  // Add the current timestamp
  const submission = {
      cartItems: props.cart.item,
      cardInfo: {
        cardNumber: e.target.cardNumber.value,
        expDate: e.target.expDate.value,
        cvv: e.target.cvv.value
      },
      addedTimestamp: new Date().toISOString(),
  };

  try {
      // TODO: Make a POST request to the API to add the sock
      const response = await fetch(`${import.meta.env.VITE_SPORTS_API_URL}/transactions`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(submission),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle post submission logic (like showing a success message)
  } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
  }
};




 console.log(props.cart.items)
    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h2>Your Cart has {props.cart.items.length} items.</h2>

                

                {
          props.cart.items.map((item) => (
            <CartItem item={item}/>

          ))
      }

<div>Your Total:{cartTotal}</div>
      
<form onSubmit={handleSubmit}>
  <label>
    Payment Info:
    <input type="text" name="cardNumber"  placeholder='Card Number' />
    <input type="text" name="expDate" placeholder='Exp. MM/YY' />
    <input type="text"  name="cvv" placeholder='CVV'/>
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