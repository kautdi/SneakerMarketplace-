import { FC, useState } from 'react';
import { ISneaker } from '../../models/ISneaker';
import { useAppDispatch } from '../../redux/store';
import { fetchCartItem, fetchTotalPricing } from '../../redux/cart/asyncAction';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/selectors';
import { Link } from 'react-router-dom';
import { ModalEdit } from './ModalEdit';

export const TovarItem: FC<ISneaker> = ({ idtovar, name, price, img, sizes, colors }) => {
  const { items} = useSelector(selectCart);
  const [activeModal, setActiveModal] = useState<boolean>(false)
  return (
    <>
    <div  className="pizza-block">
      <img
        className="pizza-block__image"
        src="https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-og-sp-travis-scott-olive-1.png?v=1679486047&width=1940"
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>

      <div className="pizza-block__selector">
        <ul>
          {
            sizes.map((size, index) => (
              <li key={size} className='active'>{size}</li>
            ))
          }
        </ul>
        <ul>
          {
            colors.map((colors, index) => (
              <li key={index} className='active'>{colors}</li>
            ))
          }
        </ul>
      </div>
      
      <div className="pizza-block__bottom" >
        <div className="pizza-block__price">от {price} ₽</div>
        <div className={`button button--outline button--add `} onClick={()=> setActiveModal(!activeModal)} >
          <span>Изменить</span>
        </div>
      </div>
    </div>

    <ModalEdit active={activeModal}/>
    </>


  );
}