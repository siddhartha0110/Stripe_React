import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';


function App() {

  const [product, setProduct] = useState({
    name: "React from Facebook",
    price: 200,
    productBy: "Facebook"
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch('http://localhost:9000/stripe_payments', {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(res => {
        console.log(res);
        const { status } = res;
        console.log(status);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          currency="INR"
          name="Buy Best React Courses"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >

          <button className="btn-large blue">Pay to Learn {product.name} for {product.price}</button>

        </StripeCheckout>

      </header>
    </div>
  );
}

export default App;
