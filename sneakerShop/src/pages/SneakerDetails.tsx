import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TovarsService from "../service/TovarsService";
import { ISneaker } from "../models/ISneaker";
import { useAppDispatch } from "../redux/store";
import { fetchCartItem, fetchTotalPricing } from "../redux/cart/asyncAction";
import { useSelector } from "react-redux";
import { selectCart } from '../redux/cart/selectors';

export const SneakerDetails: FC = () => {
    const [sneaker, setSneaker] = useState<ISneaker>();
    const [activeColor, setActiveColor] = useState<string>(sneaker?.colors[0] ?? '');
    const [activeSize, setActiveSize] = useState<number>(sneaker?.sizes[0] ?? 0);
    const dispatch = useAppDispatch();
    const {id} = useParams();

    const { items} = useSelector(selectCart);

    

    function translateColorToEnglish(color: string): string {
        switch (color) {
            case 'Красные':
                return 'red';
            case 'Синий':
                return 'blue';
            case 'Черный':
                return 'black';
            case 'Розовые':
                return 'pink';
            case 'Серые':
                return 'gray';
            case 'Оранжевые':
                return 'orange';
            case 'Белый':
                return 'white';
            case 'Зеленые':
                return 'green';
            default:
                return color;
        }
        
    }
    async function getDetailsSneaker(){
        console.log(parseInt(id ?? '0'))
        const data = await TovarsService.getOneSneaker(parseInt(id ?? '0'));
        console.log(data.data)
        setSneaker(data.data)
    }
    async function addToCart() {
        const item = {
          idtovar:sneaker?.idtovar,
          name:sneaker?.name,
          price: parseInt(sneaker?.price ?? '0'),
          sizes: [activeSize],
          colors: [activeColor]
        };

        const cartItem = localStorage.getItem('cart');
        const currentCart = cartItem ? JSON.parse(cartItem) : [];
        const existingIndex = currentCart.findIndex((cartItem: any) => cartItem.idtovar === sneaker?.idtovar);
        if (existingIndex !== -1) {
            currentCart.splice(existingIndex, 1); // Remove existing item
          } else {
            currentCart.push(item); // Add new item
          }
          localStorage.setItem('cart', JSON.stringify(currentCart));
        dispatch(fetchCartItem());
        dispatch(fetchTotalPricing());
        
    }

    useEffect(()=>{
        getDetailsSneaker()
        console.log(activeColor)
        console.log(activeSize)
    }, [])
    return (
            <div className="tovarPage">
            <div className="tovar-picture">
                <div className="tovarPage__mainPic">
                    <img src="https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-og-sp-travis-scott-olive-1.png?v=1679486047&width=1940" alt="" />
                </div>
                <div className="tovarPage__morePic">
                    <div className="morePicBlock">
                        <img src="https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-og-sp-travis-scott-olive-1.png?v=1679486047&width=1940" alt="" />
                    </div>
                    <div className="morePicBlock">
                        <img src="https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-og-sp-travis-scott-olive-1.png?v=1679486047&width=1940" alt="" />
                    </div>
                    <div className="morePicBlock">
                        <img src="https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-og-sp-travis-scott-olive-1.png?v=1679486047&width=1940" alt="" />
                    </div>
                    <div className="morePicBlock">
                        <img src="https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-og-sp-travis-scott-olive-1.png?v=1679486047&width=1940" alt="" />
                    </div>
                        
                </div>
            </div>
            <div className="tovar-desc">
                <div className="nameBlock tovarPage__nameblock">
                    <h2 className="content__title tovarPage__title">Название</h2>
                    <p className="content__name">
                        {sneaker?.name}
                    </p>
                </div>
                <div className="descBlock tovarPage__descblock">
                    <h2 className="content__title">Описание</h2>
                    <p className="content__desc">
                        {sneaker?.description}
                    </p>
                </div>
                <div className="colorblock tovarPage__colorblock">
                    <h2 className="content__title">Цвет</h2>
                    <div className="colors-row">
                        {
                            sneaker?.colors.map((color) => (
                                <div className={`color color__${translateColorToEnglish(color)} ${activeColor === color ? 'color__active' : ''}`} onClick={() => setActiveColor(color)}></div>
                            ))
                        }
                       
                    </div>
                </div>
                <div className="sizeblock tovarPage__sizeblock">
                    <h2 className="content__title">Размер</h2>
                    <select name="sizeSelected sizeSelected__tovarPage">
                        {
                            sneaker?.sizes.map((size) => (
                                <option value={`${size}`} onClick={() => setActiveSize(size)}>{size}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="button button--add-to-cart" onClick={()=>addToCart()}>
                <span>
                    {
                        items.some(item => Number(item.idtovar) === sneaker?.idtovar) ? 'Удалить' : 'Добавить'
                    }
                </span>
                  </div>
            </div>
          </div>
    )
}