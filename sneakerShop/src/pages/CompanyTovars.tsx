import { FC, useEffect, useState } from 'react';
import CompanyService from '../service/CompanyService';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/selectors';
import { ISneaker } from '../models/ISneaker';
import { SneakerItem } from '../components/Main/SneakerItem';
import { TovarItem } from '../components/Company/TovarsItem';

const CompanyTovars: FC = () => {
  const { idcompany } = useSelector(selectAuth)
  const [sneakers, setSneakers] = useState<ISneaker[]>([])


  async function fetchCompanyTovars() {
    const response = await CompanyService.getCompanyTovars(idcompany);
    setSneakers(response.data);
  }
  useEffect(()=>{
    fetchCompanyTovars();
  },[])   

  return (
    <div className="content__items">
      {
        sneakers.map((sneaker, index) => {
          return (
            <TovarItem key={sneaker.idtovar || index}
            idtovar={sneaker.idtovar}
            idcompany={sneaker.idcompany}
            description={sneaker.description}
            idbrand={sneaker.idbrand}
            company_name={sneaker.company_name}
            name={sneaker.name} 
            price={sneaker.price} 
            img={sneaker.img} 
            sizes={sneaker.sizes} 
            colors={sneaker.colors} 
            brand_name={sneaker.brand_name} />
          );
        })
      }

    </div>
  );
}

export default CompanyTovars

