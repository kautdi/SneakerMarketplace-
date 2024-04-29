import { FC, useEffect, useState } from 'react';
import History from '../components/ClientProfile/History';
import { useParams } from 'react-router-dom';
import UserService from '../service/UserService';
import { IUser } from '../models/IUser';

const ClientProfile: FC = () => {
    const [userInfo, setUserInfo] = useState<IUser>();
    const [email, setEmail] = useState<string>(userInfo?.email || "");
    const [firstname, setFirstname] = useState<string>(userInfo?.firstname || "");
    const [lastname, setLastname] = useState<string>(userInfo?.lastname || "");
    const [password, setPassword] = useState<string>("");
    const [city, setCity] = useState<string>(userInfo?.city || "");
    const [country, setCountry] = useState<string>(userInfo?.country || "");
    const [home, setHome] = useState<string>(userInfo?.home || "");
    const [street, setStreet] = useState<string>(userInfo?.street || "");
    const {id} = useParams();
    
    useEffect(() => {
        async function fetchData() {
            const userData = await UserService.getOneuser(parseInt(id || '', 10));
            setUserInfo(userData.data);
            setEmail(userData.data?.email || "");
            setFirstname(userData.data?.firstname || "");
            setLastname(userData.data?.lastname || "");
            setPassword(userData.data?.password || "");
            setCity(userData.data?.city || "");
            setCountry(userData.data?.country || "");
            setHome(userData.data?.home || "");
            setStreet(userData.data?.street || "");
        }
    
        fetchData();
    }, [id]);

    async function updateUserData(){
        try {
            const userInfo = await UserService.updateUserInfo(parseInt(id || "", 0), firstname, lastname, email, password);
            const deliveryInfo = await UserService.updateDelivery(parseInt(id || '', 0), country, city, street, home);

            console.log(userInfo)
            console.log(deliveryInfo)
        } catch (error) {
            console.log(error)
        }
       

    }

    
    return (
        <div className="client-profile">
            <div className="profile client-profile__profile">
            <div className="avtr profile__avtr">
                <img src="" alt="" />
            </div>
            <div className="user-info profile__user-info">
                <div className="inputBlock inputBlock__edit ">
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="example@example.com" />
                    <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
                </div>
                <div className="inputBlock inputBlock__edit ">
                    <input type="email" name="name" id="name" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Имя..." />
                    <button>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="inputBlock inputBlock__edit ">
                    <input type="email" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Фамилия..." />
                    <button>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="inputBlock inputBlock__edit ">
                    <input type="email" name="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Пароль..." />
                    <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
                </div>
            </div>
            <button className="button button--submit" onClick={updateUserData} >Сохранить</button>
        </div>
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
                <History iduser={parseInt(id || "", 0)}/>
            </div>
        </div>
    );
}

export default ClientProfile

