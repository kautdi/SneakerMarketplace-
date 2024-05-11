import { FC, useEffect, useState} from 'react';
import { selectAuth } from "../redux/auth/selectors";
import { useSelector } from 'react-redux';
import CompanyService from '../service/CompanyService';
import { ICompany } from '../models/ICompany';

const CompanyProfile: FC = () => {
    const { idcompany } = useSelector(selectAuth)
    const [company, setCompany] = useState<ICompany>();
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function updateInfo(){
      await CompanyService.updateCompanyInfo(idcompany, name, description, email, password);
    }

    
    useEffect(() => {
        async function fetchData() {
            const companyData = await CompanyService.getOnecompany(idcompany);
            setCompany(companyData.data)
            setEmail(companyData.data?.email || "");
            setName(companyData.data?.name || "");
            setDescription(companyData.data?.description || "");
        }
        fetchData();
    },[])
    
    return (
      <div className="company-profile">
        <div className="profile">
        <div className="avtr profile__avtr">
          <img src="" alt=""/>
        </div>
        <div className="user-info profile__user-info">
          <div className="inputBlock inputBlock__edit ">
            <input type="email" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название организации"/>
            <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </button>
          </div>
          <div className="inputBlock inputBlock__edit ">
            <input type="email" name="email" value={description} onChange={(e) => setDescription(e.target.value)} id="email" placeholder="Описание"/>
            <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </button>
          </div>
          <div className="inputBlock inputBlock__edit ">
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.ru"/>
            <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </button>
          </div>
          <div className="inputBlock inputBlock__edit ">
            <input type="email" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="*******" />
            <button><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.7085 1.58333H7.12516C3.16683 1.58333 1.5835 3.16667 1.5835 7.125V11.875C1.5835 15.8333 3.16683 17.4167 7.12516 17.4167H11.8752C15.8335 17.4167 17.4168 15.8333 17.4168 11.875V10.2917" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.6985 2.39083L6.46015 8.62917C6.22265 8.86667 5.98515 9.33375 5.93765 9.67417L5.59723 12.0571C5.47057 12.92 6.08015 13.5217 6.94307 13.4029L9.32598 13.0625C9.65848 13.015 10.1256 12.7775 10.371 12.54L16.6093 6.30167C17.686 5.225 18.1926 3.97417 16.6093 2.39083C15.026 0.8075 13.7751 1.31417 12.6985 2.39083Z" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.8037 3.28542C12.3341 5.1775 13.8145 6.65792 15.7145 7.19625" stroke="#828282" stroke-opacity="0.88" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </button>
          </div>
        </div>
        <button className="button button--submit" onClick={updateInfo}>Сохранить</button>
       
      </div>
      </div>
    );
}

export default CompanyProfile

