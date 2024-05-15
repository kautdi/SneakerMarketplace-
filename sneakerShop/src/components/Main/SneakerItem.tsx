
import { FC, useState } from 'react';
import { ISneaker } from '../../models/ISneaker';
import { useAppDispatch } from '../../redux/store';
import { fetchCartItem, fetchTotalPricing } from '../../redux/cart/asyncAction';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/selectors';
import { Link } from 'react-router-dom';

export const SneakerItem: FC<ISneaker> = ({ idtovar, name, price, img, sizes, colors }) => {
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeColor, setActiveColor] = useState<string>(colors[0]);

  const { items, totalPrice, count } = useSelector(selectCart);
  const dispatch = useAppDispatch();
  async function addToCart() {
    const item = {
      idtovar,
      name,
      price: Number(price),
      sizes:  [activeSize],
      colors: [activeColor],
    };
    const cartItem = localStorage.getItem('cart');
    const currentCart = cartItem ? JSON.parse(cartItem) : [];
    
    const existingIndex = currentCart.findIndex((cartItem: any) => cartItem.idtovar === idtovar && cartItem.sizes[0] === activeSize && cartItem.colors[0] === activeColor);
    if (existingIndex !== -1) {
      currentCart.splice(existingIndex, 1); // Remove existing item
    } else {
      currentCart.push(item); // Add new item
    }
  
    localStorage.setItem('cart', JSON.stringify(currentCart));
    dispatch(fetchCartItem());
    dispatch(fetchTotalPricing());
  }
  return (
    <div  className="pizza-block">
      <Link to={`/sneaker-details/${idtovar}`}>
      <img
        className="pizza-block__image"
        src={`http://127.0.0.1:5050/images/${img}`}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {
            sizes.slice(0, 2).map((size, index) => (
              <li key={size} className={activeSize === size ? 'active' : ''} onClick={() => setActiveSize(size)}>{size}</li>
            ))
          }
        </ul>
        <ul>
          {
            colors.slice(0, 2).map((colors, index) => (
              <li key={index} className={activeColor === colors ? 'active' : ''} onClick={() => setActiveColor(colors)}>{colors}</li>
            ))
          }
        </ul>
      </div>
      
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
  className={`button button--outline button--add ${
    items.some(
      (item: any) =>
        Number(item.idtovar) === idtovar &&
        item.sizes[0] === activeSize &&
        item.colors[0] === activeColor
    )
      ? 'button--add__active'
      : ''
  }`}
  onClick={() => addToCart()}
>
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
      fill="white"
    />
  </svg>
  <span>
    {items.some(
      (item: any) =>
        Number(item.idtovar) === idtovar &&
        item.sizes[0] === activeSize &&
        item.colors[0] === activeColor
    )
      ? 'Удалить'
      : 'Добавить'}
  </span>
</div>
      </div>
    </div>
  );
}