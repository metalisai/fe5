import React, { useState, useContext, useMemo, useEffect, useRef } from 'react';
import CartIcon from '../assets/images/icon-cart.svg'
import Delete from '../assets/images/icon-delete.svg'
import { CartContext } from './App';

import './Cart.css';

const Cart = ((props) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const {cart, setCart} = useContext(CartContext);
  let popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // need to use setTimeout in case user clicks on cart icon
      setTimeout(() => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          if (isCartOpen) {
            setIsCartOpen(false);
          }
        }
      }, 0);
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => document.removeEventListener('mouseup', handleClickOutside);
  });

  const removeItemFromCart = (idx) => {
    setCart(x => x.filter((_, i) => i !== idx));
  }

  /* in the real world, app store.getProduct would probably be an API call, so cache it */
  const cartContent = useMemo(() => {
    return cart.map(item => ({
      product: props.store.getProduct(item.productId), 
      quantity: item.quantity
    }))
  }, [cart]);


  const cartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  return (
    <React.Fragment>
      <div>
      <img src={CartIcon} className="cartImg" alt="Cart" onClick={() => {
        setIsCartOpen(true);
        }
      } />
      { cartCount() > 0 && (<div className="cartCount"><span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span></div>) }
      </div>
      <div className={`${"cartContent" + (isCartOpen ? "" : " hide")}`} ref={popupRef} >
        <h2>Cart</h2>
        <hr />
        {cartContent.length === 0 && <p className="cartEmpty">Your cart is empty.</p>}
        <ul className="cartItems">
          {cartContent.map((item, index) =>
            <li key={index}>
              <img src={item.product.images[0].thumb} alt={item.product.name} className="cartThumb" />
              <div>
                <h3>{item.product.name}</h3>
                <p>${item.product.price} x {item.quantity} <b>${(item.product.price*item.quantity).toFixed(2)}</b></p>
              </div>
              <button><img src={Delete} alt="Delete" onClick={() => removeItemFromCart(index)} className="delBtn" /></button>
            </li>
          )}
        </ul>
        <button className="bigBtn">Checkout</button>
      </div>
    </React.Fragment>
  );
});

export default Cart;
