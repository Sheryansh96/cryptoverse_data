import React, {useState, useEffect,useRef} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input,Typography,Statistic, Button } from 'antd';
import styled from 'styled-components';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { AuthService } from '..';
import { Select } from 'antd';
import './Wallet.css';
import { GoogleLogin } from 'react-google-login';


function Wallet() {
  const [cbalance, setBalance] = useState(250)
  // const [coin, setCoin] = useState([])
  // const [price, setPrice] = useState([])
  // const [status, setStatus] = useState([])
  // const [date, setDate] = useState([])
   const [result, setResult] = useState([])
   const [reward, setReward] = useState(0)
   const [isLoggedIn, setLoggedIn] = useState('false')


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
     let x = 0

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
     for(let i = 0; i<status.length; i++){
        if(status[i]){
          x+=1
        }
     }
     setReward(x)
     setResult(res)
    }

    const handleFailure = (result) => {
      alert(result);
    }


    const handleLogin = (response) => {
      if(response.profileObj.email!=null){
        console.log(response.profileObj.email);
        const email = response.profileObj.email
        // const {data} = axios.post("http://localhost:8585/api/findByEmail/",{email})
        // if(!data.email){
        //     console.log("i am here not registered yet")
        //     const res  = axios.post("http://localhost:8585/api/register/",{email})
        // }
      setLoggedIn(true);
      localStorage.setItem("isLoggedIn","true");
      localStorage.setItem("email",email);
      console.log(response.profileObj.email!=null)
        window.location.reload();

      }
    }


  return (
    <>
    {
        (localStorage.getItem("isLoggedIn")==null||localStorage.getItem("isLoggedIn")=="false")?
        <div>
        <div className='row' style={{marginLeft:'25%' ,width:'50%', padding : '5px', height: '270px'}}>
        <div>
        <Typography.Title level = {0} style={{marginLeft:'25%'}}>
                <h3>Please Login with your Google id</h3>
            </Typography.Title>
        </div>
        <div style={{marginLeft:'35%', marginTop:'20%'}}>
        <GoogleLogin
        clientId="696846841621-r3h6mebbaqg764a0fiobre96us2eloeb.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
        />
        </div></div></div>:''}
    {localStorage.getItem("isLoggedIn")=="true"?
    <div>
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
      <div className='reward'>
        <div className='card_class'>
        <h2>
            Thank you for being a loyal customer. Your current reward points are
            <br></br>
        </h2>
        <span>
             {reward*100}
        </span>
        </div>
    </div>
    </div>
    :''}
    </>
  )
}

export default Wallet