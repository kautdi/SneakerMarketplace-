import { useState } from "react"
import { Link } from "react-router-dom"

function CompanyNavbar() {
    const [active, setActive] = useState<number>(0)

    async function Logout(){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("iduser")
        localStorage.removeItem("role")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("idcompany")
        window.location.reload()
    }
    const navbarItems = [
        {
            title: 'Моя организация',
            path: '/profile',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.02 2.83992L3.63 7.03992C2.73 7.73992 2 9.22992 2 10.3599V17.7699C2 20.0899 3.89 21.9899 6.21 21.9899H17.79C20.11 21.9899 22 20.0899 22 17.7799V10.4999C22 9.28992 21.19 7.73992 20.2 7.04992L14.02 2.71992C12.62 1.73992 10.37 1.78992 9.02 2.83992Z" stroke="#423FD7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.5 11.5L12.3 15.7L10.7 13.3L7.5 16.5" stroke="#423FD7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.5 11.5H16.5V13.5" stroke="#423FD7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
        },
        {
            title: 'Оплата комиссии',
            path: '/tax',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 2V5" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.5 9.09009H20.5" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M22 19C22 19.75 21.79 20.46 21.42 21.06C20.73 22.22 19.46 23 18 23C16.99 23 16.07 22.63 15.37 22C15.06 21.74 14.79 21.42 14.58 21.06C14.21 20.46 14 19.75 14 19C14 16.79 15.79 15 18 15C19.2 15 20.27 15.53 21 16.36C21.62 17.07 22 17.99 22 19Z" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.4404 18.9995L17.4304 19.9895L19.5604 18.0195" stroke="#423FD7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21 8.5V16.36C20.27 15.53 19.2 15 18 15C15.79 15 14 16.79 14 19C14 19.75 14.21 20.46 14.58 21.06C14.79 21.42 15.06 21.74 15.37 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.9955 13.7H12.0045" stroke="#423FD7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.29431 13.7H8.30329" stroke="#423FD7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.29431 16.7H8.30329" stroke="#423FD7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
        },
        {
            title: 'Товары',
            path: '/tovars',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 22H22" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 9.97023C3 9.36023 3.29 8.78029 3.77 8.40029L10.77 2.95027C11.49 2.39027 12.5 2.39027 13.23 2.95027L20.23 8.39028C20.72 8.77028 21 9.35023 21 9.97023V22.0003" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.9502 22.0002L2.9802 14.0303" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.5 11H8.5C7.67 11 7 11.67 7 12.5V22H17V12.5C17 11.67 16.33 11 15.5 11Z" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10 16.25V17.75" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.5 7.5H13.5" stroke="#423FD7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
        },
    ]
    return (
        <nav className="company-navbar">
            <ul className="navbar-items company-navbar__navbar-items">
                <li className="navbar-link company-navbar__navbar-link" onClick={() => setActive(5)}>
                    <Link to={"/zakazs"} className="link company-navbar__link">
                        <div className="item  item__zakaz">
                            <div className="desc">
                                <h3>Заказы</h3>
                                <p>Кол-во</p>
                            </div>
                            <div className="kolvo">
                                <p>5</p>
                            </div>
                        </div>
                    </Link>
                </li>

                {
                    navbarItems.map((navbarItem, index) => (
                        <li key={index} className={`navbar-link company-navbar__navbar-link ${index === active ? "navbar-link__active" : ""}`} onClick={() => setActive(index)}>
                            <Link to={`${navbarItem.path}`} className="link">
                                <div className="item">
                                    <i className="link-icon">
                                        {navbarItem.icon}
                                    </i>
                                    <p className="link-name">{navbarItem.title}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                }
                <li className="navbar-link company-navbar__navbar-signout " onClick={Logout}>
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
                </li>
            </ul>
        </nav>
    )
}

export default CompanyNavbar
