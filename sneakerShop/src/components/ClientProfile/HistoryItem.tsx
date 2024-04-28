import { FC } from 'react';

const HistoryItem: FC = () => {
    return (
        <div className="pizza-block pizza-block__history">
            <img
                className="pizza-block__image"
                src="https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-og-sp-travis-scott-olive-1.png?v=1679486047&width=1940"
                alt="Pizza"
            />
            <h4 className="pizza-block__title">Nike X Cactus jack</h4>
            <div className="pizza-block__selector">
                <ul>
                    <li className="pizza-block__content-main">Размер</li>
                    <li className="active">43</li>
                </ul>
                <ul>
                    <li className="pizza-block__content-main">Цвет</li>
                    <li className="active">Черный</li>
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__content-main">Цена</div>
                <div className="pizza-block__content-price">2690 ₽</div>

            </div>
        </div>
    );
}

export default HistoryItem

