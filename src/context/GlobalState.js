import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import axios from 'axios';

const InitialState = {
    transactions: [],
    error: null,
    loading: true
};

export const GlobalContext = createContext(InitialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, InitialState);


    async function getTransactions() {
        try {
            const res = await axios.get(`https://milk-tracker-api.herokuapp.com/api/v1/transactions`);

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        } catch (e) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: e
            });
        }
    }

    async function deleteTransaction(id) {
        try{
            await axios.delete(`https://milk-tracker-api.herokuapp.com/api/v1/transactions/${id}`)
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        }
        catch(e){
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: e.response.data.error
            });
        }
        


    }
  async  function addTransaction(transaction) {
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      try{
        const res = await axios.post(`https://milk-tracker-api.herokuapp.com/api/v1/transactions`, transaction, config);
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: res.data.data
        });
      }catch(e){
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: e.response.data.error
        });
      }
       
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>);
}