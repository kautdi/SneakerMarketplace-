import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CompanyService from '../service/CompanyService';
import { selectAuth } from '../redux/auth/selectors';
import ZakazService from '../service/ZakazService';
import { CartItem } from '../redux/cart/types';
import { IOrder, ITovar } from '../models/IZakaz';

const CompanyZakazs: FC = () => {
    const { idcompany } = useSelector(selectAuth);
    const [items, setItems] = useState<IOrder[]>([]);


    async function deleteZakaz(id: number){
        const removeZakaz = await ZakazService.deleteZakaz(id);
        console.log(removeZakaz.data);
        window.location.reload();
    }
    async function changeStatus(id: number){
        const changeStatus = await ZakazService.changeStatus(id);
        console.log(changeStatus.data);
        window.location.reload();
    }
    useEffect(() => {
        async function getAllZakazs() {
            const zakazs = await ZakazService.getAllZakaz(idcompany);
            const sortedZakazs = zakazs.data.sort((a: any, b: any) => {
                if (a.status === "Delivery" && b.status !== "Delivery") return -1;
                if (a.status !== "Delivery" && b.status === "Delivery") return 1;
                return 0;
            });
            setItems(sortedZakazs);
        }
        getAllZakazs();
    }, [idcompany]);

    return (
        <>
            {items.map((item: IOrder) => (
                <div key={item.idzakaz} className="zakaz-item">
                    <div className="zakaz-item-head">
                        <div className="item-num">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.16992 7.43994L11.9999 12.5499L20.7699 7.46994" stroke="#5553DB" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 21.61V12.54" stroke="#5553DB" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.92965 2.48004L4.58965 5.44004C3.37965 6.11004 2.38965 7.79004 2.38965 9.17004V14.82C2.38965 16.2 3.37965 17.88 4.58965 18.55L9.92965 21.52C11.0696 22.15 12.9396 22.15 14.0796 21.52L19.4196 18.55C20.6296 17.88 21.6196 16.2 21.6196 14.82V9.17004C21.6196 7.79004 20.6296 6.11004 19.4196 5.44004L14.0796 2.47004C12.9296 1.84004 11.0696 1.84004 9.92965 2.48004Z" stroke="#5553DB" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <h3>№{item.idzakaz} <span>Статус:</span> {item.status}</h3>
                        </div>
                        <div className="item-btns">
                            <button className='btn btn-success' onClick={()=>changeStatus(item.idzakaz)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.625 11.9999L9.87 16.2449L18.375 7.75488" stroke="white" stroke-opacity="0.88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <button className='btn btn-delete' onClick={()=>deleteZakaz(item.idzakaz)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.9997 6.73046C20.9797 6.73046 20.9497 6.73046 20.9197 6.73046C15.6297 6.20046 10.3497 6.00046 5.11967 6.53046L3.07967 6.73046C2.65967 6.77046 2.28967 6.47046 2.24967 6.05046C2.20967 5.63046 2.50967 5.27046 2.91967 5.23046L4.95967 5.03046C10.2797 4.49046 15.6697 4.70046 21.0697 5.23046C21.4797 5.27046 21.7797 5.64046 21.7397 6.05046C21.7097 6.44046 21.3797 6.73046 20.9997 6.73046Z" fill="white" fill-opacity="0.88" />
                                    <path d="M8.49977 5.72C8.45977 5.72 8.41977 5.72 8.36977 5.71C7.96977 5.64 7.68977 5.25 7.75977 4.85L7.97977 3.54C8.13977 2.58 8.35977 1.25 10.6898 1.25H13.3098C15.6498 1.25 15.8698 2.63 16.0198 3.55L16.2398 4.85C16.3098 5.26 16.0298 5.65 15.6298 5.71C15.2198 5.78 14.8298 5.5 14.7698 5.1L14.5498 3.8C14.4098 2.93 14.3798 2.76 13.3198 2.76H10.6998C9.63977 2.76 9.61977 2.9 9.46977 3.79L9.23977 5.09C9.17977 5.46 8.85977 5.72 8.49977 5.72Z" fill="white" fill-opacity="0.88" />
                                    <path d="M15.2104 22.7496H8.79039C5.30039 22.7496 5.16039 20.8196 5.05039 19.2596L4.40039 9.18959C4.37039 8.77959 4.69039 8.41959 5.10039 8.38959C5.52039 8.36959 5.87039 8.67959 5.90039 9.08959L6.55039 19.1596C6.66039 20.6796 6.70039 21.2496 8.79039 21.2496H15.2104C17.3104 21.2496 17.3504 20.6796 17.4504 19.1596L18.1004 9.08959C18.1304 8.67959 18.4904 8.36959 18.9004 8.38959C19.3104 8.41959 19.6304 8.76959 19.6004 9.18959L18.9504 19.2596C18.8404 20.8196 18.7004 22.7496 15.2104 22.7496Z" fill="white" fill-opacity="0.88" />
                                    <path d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z" fill="white" fill-opacity="0.88" />
                                    <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="white" fill-opacity="0.88" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="zakaz-items">
                        {
                            item.tovars.map((tovar:ITovar, index) =>(
                                <div className="sneaker-zakaz">
                            <div className="number">
                                <span>{index + 1}</span>
                            </div>
                            <div className="pic-sneaker">
                                <img src={`http://127.0.0.1:5050/images/${tovar.tovar_img}`} alt="Кроссовок" />
                            </div>
                            <div className="sneker-color">
                                <div className="sneker-color-value">{tovar.color_name}</div>
                            </div>
                            <div className="sneker-size">
                                <div className="sneker-size-value">{tovar.size_value}</div>
                            </div>
                        </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </>
    );
}
export default CompanyZakazs;