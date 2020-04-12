import React, { useState, useContext } from 'react';
import moment from 'moment';
import {GlobalContext} from '../context/GlobalState';
 
export const AddTransaction = () => {

    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const [date, setDate] = useState(moment().format('DD / MM / YYYY'));

    const {addTransaction} = useContext(GlobalContext);

    const onSubmit = (e)=>{
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random()* 10000000),
            text,
            amount: +amount,
            date
        };
        addTransaction(newTransaction);
    }
    return (
        <div>
            <h3>Add transaction</h3>
            <form onSubmit= {onSubmit} >
                <div className="form-control">
                    <label htmlFor="transaction">Transaction</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter Transaction" />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br /> (negative - withdrawal, positive - deposit)</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" />
                </div>
               

                <button className="btn">Add Transaction</button>
            </form>
        </div>
    )
}

/*
 <div className="form-control">
                    <label htmlFor="date">Date <br /> </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}  />
                </div>

*/