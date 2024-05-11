import { FC, useEffect, useState } from "react"
import CartItem from "../components/Cart/CartItem"
import { useSelector } from "react-redux";
import { fetchTotalPricing, fetchCartItem } from "../redux/cart/asyncAction";
import { selectCart } from "../redux/cart/selectors";
import { useAppDispatch } from "../redux/store";
import { selectAuth } from "../redux/auth/selectors";
import { Link } from "react-router-dom";
import { IUser } from "../models/IUser";
import UserService from "../service/UserService";
import ZakazService from "../service/ZakazService";
export const Order: FC = () => {
    const [userInfo, setUserInfo] = useState<IUser>();
    const { items, totalPrice, count } = useSelector(selectCart);
    const { iduser } = useSelector(selectAuth);
    const [city, setCity] = useState<string>(userInfo?.city || "");
    const [country, setCountry] = useState<string>(userInfo?.country || "");
    const [home, setHome] = useState<string>(userInfo?.home || "");
    const [street, setStreet] = useState<string>(userInfo?.street || "");
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchData() {
            const userData = await UserService.getOneuser(iduser);
            setUserInfo(userData.data);
            setCity(userData.data?.city || "");
            setCountry(userData.data?.country || "");
            setHome(userData.data?.home || "");
            setStreet(userData.data?.street || "");
        }
        fetchData();
    }, [iduser]);
    useEffect(() => {
        dispatch(fetchTotalPricing());
        dispatch(fetchCartItem());
    }, []);
    const handleDeleteCart = () => {
        const cartItem = localStorage.removeItem('cart');
        dispatch(fetchCartItem());
        dispatch(fetchTotalPricing());
    }
    async function createZakaz (){
        const zakaz ={
            iduser:iduser,
            country: country,
            city:city,
            street:street,
            home: home,
            tovars:items
        }
        const response = await ZakazService.createZakaz(zakaz)
        console.log(response)
    }
    return (
        <div className="cart">
            <div className="cart__top">
                <h2 className="content__title"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                    Товары</h2>
                <div className="cart__clear">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span onClick={handleDeleteCart}>Очистить корзину</span>
                </div>
            </div>
            <div className="content__items">
            {
                items.map((item) => (
                    <CartItem
                        idtovar={item.idtovar}
                        image={''}
                        name={item.name}
                        sizes={Array.isArray(item.sizes) ? item.sizes : []}
                        colors={Array.isArray(item.colors) ? item.colors : []} // Проверяем, является ли colors массивом
                        price={item.price}
                        count={0}
                    />
                ))
            }
            </div>
            <div className="cart__bottom">
                <div className="cart__bottom-details">
                    <span> Всего: <b>{count} шт.</b> </span>
                    <span> Сумма заказа: <b>{totalPrice}₽</b> </span>
                </div>
                <br />
                <br />
                <div className="delivery-history client-profile__delivery-history">
            <div className="delivery-info">
            <h2 className="contet-title delivery-info__contet-title">Адрес доставки</h2>
            <div className="adress-info delivery-info__adress-info">
                <div className="inputBlock inputBlock__edit">
                    <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} id="country" placeholder="Страна" />
                    <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
                </div>
                <div className="inputBlock inputBlock__edit">
                    <input type="text" name="email" id="email" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Улица" />
                    <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
                </div>
                <div className="inputBlock inputBlock__edit">
                    <input type="text" name="email" id="email" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" />
                    <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
                </div>
                <div className="inputBlock inputBlock__edit">
                    <input type="text" name="email" value={home} onChange={(e) => setHome(e.target.value)} id="email" placeholder="Дом" />
                    <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
                </div>
            </div>
        </div>
                
            </div>
                <div className="cart__bottom-buttons">
                    <a href="/cart" className="button button--outline button--add go-back-btn">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span>Вернуться назад</span>
                    </a>
                    <div className="button pay-btn">
                                <span onClick={createZakaz}> Оплатить сейчас</span>
                    </div>
                </div>
            </div>
        </div>
    )
}