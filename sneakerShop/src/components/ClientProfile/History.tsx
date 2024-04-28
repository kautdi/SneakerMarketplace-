import { FC } from 'react';
import HistoryItem from './HistoryItem';

const History: FC = () => {
    return (
        <div className="history">
            <h2 className="contet-title">История заказов</h2>
            <div className="content__items">
                <HistoryItem/>
                <HistoryItem/>
                <HistoryItem/>
            </div>
        </div>
    );
}

export default History

