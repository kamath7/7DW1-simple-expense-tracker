import React , {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

export const Transaction = ({transaction}) => {
    const {deleteTransaction} = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-': '+';
    return (
        <div>
            <li className={transaction.amount < 0 ? 'minus': 'plus'}>
                {transaction.text}<span>{transaction.date}</span> <span>{sign}₹ {Math.abs(transaction.amount)}</span>
                <button onClick={()=>{
                    let isDelete = window.confirm("Do you want to delete?");
                    if(isDelete){deleteTransaction(transaction._id)}
                    return;
                    
                }} className="delete-btn">X</button>
            </li>
        </div>
    )
}
