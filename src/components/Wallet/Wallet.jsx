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
  // const [coin, setCoin] = useState([])
  // const [price, setPrice] = useState([])
  // const [status, setStatus] = useState([])
  // const [date, setDate] = useState([])
   const [result, setResult] = useState([])

  let coin = []
  let price = []
  let status = []
  let date = []

    useEffect(() => {
        console.log("hello")
        AuthService.getTransactions(localStorage.getItem("email")).then(
          (x) => {

            console.log(x.data.coin)
            coin = x.data.coin
            price = x.data.prediction
            status = x.data.status
            date = x.data.date
            console.log(coin)
            console.log(price)
            console.log(status)
            console.log(date)

            mergeColumnWise()

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
      const options = { year: "numeric", month: "long", day: "numeric" }
      for(let i = status.length-1; i >=0; i--) {
        console.log("inside loop")
        var temp1 = new Date(date[i]).toLocaleDateString(undefined, options)
        var temp2 = new  Date(date[i]).toLocaleTimeString()
        res.push({
           coin: coin[i],
           price: price[i],
           status: status[i],
           date: temp1+" "+temp2
        });
     }
     setResult(res)
    }
  return (
    <div>
    {/* <div className='reward'>
        <div className='card_class'>
        <h2>
            Thank you for being a loyal customer. Your current reward points are
            <br></br>
        </h2>
        <span>
             {cbalance}
        </span>
        </div>
        <button onClick = {()=>{balance()}} ></button>
    </div> */}
    <div>
        <h1 id="header">RECENT TRANSACTIONS</h1>
        <table id='recent_transactions'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Predicted Price</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {result && result.map((transaction,index) =>
                        <tr key={transaction.coin}>
                            <td>{index+1}</td>
                            <td>{transaction.coin}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.status == true? "Correct" : "Incorrect"}</td>
                        </tr>
                    )}
                </tbody>
        </table>
      </div>
    </div>
  )
}

export default Wallet
