import React, {useState, useEffect,useRef} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input,Typography,Statistic, Button } from 'antd';
import styled from 'styled-components';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Select } from 'antd';
import './Wallet.css';

function Wallet() {
  const [cbalance, setBalance] = useState(250)
    useEffect(() => {
        console.log("hello")
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
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((transaction,index) =>
                        <tr key={transaction.coin}>
                            <td>{transaction.pprice}</td>
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
