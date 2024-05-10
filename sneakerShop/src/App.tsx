import { Route, Routes } from 'react-router-dom'
import Header from './components/ClientHeader'
import './style/scss/main.scss'
import { Main } from './pages/Main'
import { Auth } from './pages/Auth'
import { Cart } from './pages/Cart'
import ClientProfile from './pages/ClientProfile'
import { SneakerDetails } from './pages/SneakerDetails'
import { useAppDispatch } from './redux/store'
import { selectAuth } from './redux/auth/selectors'
import { useSelector } from 'react-redux'
import { refreshTokenCompany, refreshTokenUser } from './redux/auth/asyncAction'
import { setAuth } from './redux/auth/slice'
import CompanyNavbar from './components/CompanyNavbar'
import CompanyProfile from './pages/CompanyProfile'
import CompanyTax from './pages/CompanyTax'
import CompanyTovars from './pages/CompanyTovars'
import CompanyZakazs from './pages/CompanyZakazs'
import { Order } from './pages/Order'

function App() {
  const dispatch = useAppDispatch();
  const systemUser = localStorage.getItem("iduser")
  const systemComapny = localStorage.getItem("idcompany")
  const { isAuth, role } = useSelector(selectAuth)


  if (isAuth === false) {
    if (localStorage.getItem("refreshToken") !== null) {
      const refreshToken = localStorage.getItem("refreshToken");
        
      if (systemUser !== null && systemUser !== "0") {
        dispatch(refreshTokenUser({ idUser: parseInt(systemUser), refreshToken: refreshToken ?? '' }));
        dispatch(setAuth(true))
      } 
      else if (systemComapny !== null && systemComapny !== "0") {
        dispatch(refreshTokenCompany({ idcompany: parseInt(systemComapny), refreshToken: refreshToken ?? '' }));
        dispatch(setAuth(true))
      }
    }
  }
  
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          {role === 'client' ? (
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/sneaker-details/:id" element={<SneakerDetails />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/clientprofile/:id" element={<ClientProfile />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          ) : role === 'company' ? (
            <div className="company-container">
            <CompanyNavbar />
            <div className="company-pages">
            <Routes>
              <Route path="/:id" element={<CompanyProfile />} />
              <Route path="/tax" element={<CompanyTax />} />
              <Route path="/tovars" element={<CompanyTovars />} />
              <Route path="/zakazs" element={<CompanyZakazs />} />
            </Routes>
            </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/sneaker-details/:id" element={<SneakerDetails />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
