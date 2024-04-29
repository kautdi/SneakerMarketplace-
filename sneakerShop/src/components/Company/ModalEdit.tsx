import { FC, useState } from 'react';
import { ISneaker } from '../../models/ISneaker';
import { useAppDispatch } from '../../redux/store';
import { fetchCartItem, fetchTotalPricing } from '../../redux/cart/asyncAction';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/selectors';
import { Link } from 'react-router-dom';


export interface ModalEdit {
    active: boolean;
}
export const ModalEdit: FC<ModalEdit> = ({ active }) => {

    return (
        <div className={`modal modal--edit ${active === true ? 'modal__active' : ""}`}>
            <div className="modal-body">
                <div className="modal-top">
                    <h3 className="modal__title">
                        Изменение товара
                    </h3>
                </div>
                <div className="content modal__content">
                    <form action="">
                        <div className="avtr profile__avtr">
                            <img src="" alt="" />
                        </div>
                        <div className="modal-form">
                            <div className="inputBlock auth-form__inputBlock">
                                <label >Название</label>
                                <input type="email" name="email" id="email" placeholder="example@example.com" />
                            </div>
                        </div>
                        <div className="modal-form">
                            <div className="inputBlock auth-form__inputBlock">
                                <label >Описание</label>
                                <textarea name="email" id="email" placeholder="Описание"></textarea>
                            </div>
                        </div>
                    </form>
                    <div className="modal__sizeColor">
                        <div className="colorblock tovarPage__colorblock">
                            <h2 className="content__title">Доступные цвета</h2>
                            <div className="colors-row">
                                <div className="color color__red"></div>
                                <div className="color color__blue"></div>
                                <div className="color color__black"></div>
                                <div className="color color__pink"></div>
                                <div className="color color__orange"></div>
                                <div className="color color__white"></div>
                                <div className="color color__green"></div>
                            </div>
                        </div>
                        <div className="sizeblock">
                            <h2 className="content__title">Доступные размеры</h2>
                            <div className="size-row">
                                <div className="size-item size-item__active"><p>36</p></div>
                                <div className="size-item"><p>37</p></div>
                                <div className="size-item"><p>38</p></div>
                                <div className="size-item"><p>39</p></div>
                                <div className="size-item"><p>40</p></div>
                                <div className="size-item"><p>41</p></div>
                                <div className="size-item"><p>42</p></div>
                            </div>
                        </div>
                        <button className="button button--submit" >Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}