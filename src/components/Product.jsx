import React, { useState, useContext } from 'react';
import Cart from '../assets/images/icon-cart-white.svg'
import './Product.css';
import { CartContext } from './App';

const Product = ((props) => {

  const product = props.product;
  const [addCount, setAddCount] = useState(1);

  const Discount = ((product) => {
    return (
      typeof product.undiscountedPrice === 'number'
        && product.undiscountedPrice > product.price
        ? <div className="discount">{Math.round((product.undiscountedPrice - product.price) / product.undiscountedPrice * 100)}%</div>
        : null
    );
  });

  const AddToCartWidget = (() => {

    const {cart, setCart} = useContext(CartContext);

    const IncrementCount = () => {
      setAddCount(x => x + 1);
    }

    const DecrementCount = () => {
      if (addCount > 1) {
        setAddCount(x => x - 1);
      }
    }

    const SetCount = (e) => {
      if (e.target.value < 1) {
        setAddCount(1);
        return;
      }
      setAddCount(parseInt(e.target.value));
    }

    const AddToCart = () => {
      setCart(cart => {
        if (addCount === 0) {
          return cart;
        }
        const newCart = [...cart];
        const oldItem = newCart.find(item => item.productId === product.id);
        if (oldItem) {
          oldItem.quantity += addCount;
        } else {
          newCart.push({productId: product.id, quantity: addCount});
        }
        setAddCount(0);
        return newCart;
      });
    }

    return (
      <React.Fragment>
        <div className="addToCartWidget">
          <div className="countWidget">
            <button onClick={DecrementCount}>-</button>
            <label htmlFor="addCountInput" hidden>Quantity</label>
            <input id="addCountInput" type="number" step="1" value={addCount} onChange={SetCount} />
            <button onClick={IncrementCount}>+</button>
          </div>
          <button className="bigBtn" onClick={AddToCart}><img src={Cart} alt="Cart" /> Add to cart</button>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="product">
      <div className="productCompany">Sneaker Company</div>

      <h1>{product.name}</h1>
      <p>{product.description}</p>

      <div className="price">
        <div className="priceTag">
          <div className="curPrice">${product.price.toFixed(2)}</div>
          {Discount(product)}
        </div>
        <div className="oldPrice">${product.undiscountedPrice.toFixed(2)}</div>
      </div>

      <AddToCartWidget />
    </div>
  );
});

export default Product;
