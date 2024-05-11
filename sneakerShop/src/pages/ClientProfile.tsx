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
    async function Logout(){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("iduser")
        localStorage.removeItem("role")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("idcompany")
        window.location.href = "/"
    }

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
            <button className="navbar-link company-navbar__navbar-signout " style={{background:"white"}} onClick={Logout}>
                    <p className="link-name">Выход</p>
                    <i className="link-icon">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_10_8469)">
                                <path d="M9.81738 20.706H4.0885C2.53159 20.706 1.26835 19.4381 1.26835 17.8858V4.07874C1.26835 2.52182 2.53625 1.25858 4.0885 1.25858H9.91061C10.2602 1.25858 10.5399 0.978896 10.5399 0.629291C10.5399 0.279685 10.2602 0 9.91061 0H4.0885C1.83704 0 0.00976562 1.83193 0.00976562 4.07874V17.8858C0.00976562 20.1373 1.8417 21.9646 4.0885 21.9646H9.81738C10.167 21.9646 10.4467 21.6849 10.4467 21.3353C10.4467 20.9857 10.1623 20.706 9.81738 20.706Z" fill="#423FD7" />
                                <path d="M20.1845 10.5394L16.1851 6.53991C15.938 6.29285 15.5418 6.29285 15.2947 6.53991C15.0477 6.78696 15.0477 7.18318 15.2947 7.43024L18.2221 10.3576H5.45449C5.10488 10.3576 4.8252 10.6373 4.8252 10.9869C4.8252 11.3365 5.10488 11.6162 5.45449 11.6162H18.2221L15.2947 14.5436C15.0477 14.7906 15.0477 15.1868 15.2947 15.4339C15.4159 15.5551 15.5791 15.6203 15.7376 15.6203C15.896 15.6203 16.0592 15.5597 16.1804 15.4339L20.1799 11.4344C20.4316 11.1827 20.4316 10.7818 20.1845 10.5394Z" fill="#423FD7" />
                            </g>
                            <defs>
                                <clipPath id="clip0_10_8469">
                                    <rect width="21" height="22" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    </i>
        </button>
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

