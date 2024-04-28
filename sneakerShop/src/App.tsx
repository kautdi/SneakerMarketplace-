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

function App() {
  const dispatch = useAppDispatch();
  const systemUser = localStorage.getItem("iduser")
  const systemComapny = localStorage.getItem("idcompany")

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
  
  return (
    <div className="wrapper">
    <Header/>
    <div className="content">
    <div className="container ">
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/sneaker-details/:id" element={<SneakerDetails/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/clientprofile" element={<ClientProfile />} />
      </Routes>
    </div>
    </div>
    </div>
  )
}

export default App
