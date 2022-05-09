import React, {useState, useEffect,useRef} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input,Typography,Statistic, Button } from 'antd';
import styled from 'styled-components';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { AuthService } from '..';
import { Select } from 'antd';
import './Wallet.css';

function Wallet() {
  const [cbalance, setBalance] = useState(250)
  const [coin, setCoin] = useState([])
  const [price, setPrice] = useState([])
  const [status, setStatus] = useState([])
  const [date, setDate] = useState([])
  const [result, setResult] = useState([])
  


    useEffect(() => {
        console.log("hello")
        AuthService.getTransactions(localStorage.getItem("email")).then(
          (x) => {
            console.log(x.data.coin)
            setCoin([... x.data.coin, {
                id: x.data.coin.length,
                value: x.data.coin
            }])
            setPrice(x.data.price)
            setStatus(x.data.status)
            setDate(x.data.prediction)
            mergeColumnWise()
            console.log(coin)
            console.log("Updated Main Table")
            
        }
        ).catch((error) => {
        // Error
        if (error.response) {
            window.alert("Error Fetching Transactions")
        } else if (error.request) {
            window.alert("Error Fetching Transactions Details")
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Erro
            console.log('Error', error.message);
        }
        console.log(error.config);
    });  
     }, [])
    // const balance = () =>{
    //     AuthService.getBalanceUser().then((e) =>
    //         {
    //             let obj = JSON.parse(e)
    //             console.log(obj.balance)
    //             setBalance(obj.balance)
    //         }
    //     )
    // }


    const mergeColumnWise = () => {
      console.log("Hereee")
      let res = []
      for(let i = 0; i < status.length; i++) {
        console.log("inside loop")
        res.push({
           coin: coin[i],
           price: price[i],
           status: status[i],
           date: date[i]
        });
     }
     setResult(res)
    }
  return (
    <div>
    <div className='reward'>
        <div className='card_class'>
        <h2>
            Thank you for being a loyal customer. Your current reward points are
            <br></br>
        </h2>
        <span>
             {cbalance}
        </span>
        </div>
        {/* <button onClick = {()=>{balance()}} ></button> */}
    </div>
    <div className='recent_transactions'>
      <div className='transactions_header'>
        <h3 className="p-3 text-center">Recent Transactions</h3>
        <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Predicted Price</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {result && result.map((transaction,index) =>
                        <tr key={transaction.coin}>
                            <td>{transaction.price}</td>
                            <td>{transaction.status}</td>
                        </tr>
                    )}
                </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Wallet
