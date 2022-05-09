import React, {useState, useEffect,useRef} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input,Typography,Statistic, Button } from 'antd';
import styled from 'styled-components';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Select } from 'antd';
import './Prediction.css';
import { AuthService } from '..';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { WindowsFilled } from '@ant-design/icons';
import { DateRangeSharp } from '@mui/icons-material';




const { Title } = Typography
const { Option } = Select;

const Prediction = () => {


const [coin,setCoin] = useState("")
const [price,setPrice] = useState(0)
const [cdate,current_date] = useState(new Date())
//const [ctime,current_time] = useState()
const [pdays, predicted_days] = useState(1)
const [pdate,setPredicteddate] = useState("")
const [time,present_time] = useState()
const [val, setVal] = useState(0)
const [timereload, setreloadTime] = useState(Date.now());
const [guessPred, setguessPred] = useState()

const [bitcoin, setBitcoin] = useState(false)
const [eth, setEth] = useState(false)
const [doge, setDoge] = useState(false)
const [car, setCar] = useState(false)
const [pol, setpol] = useState(false)


const [correctPred, setcorrectPred] = useState(true);
const [timenow,setTime] = useState(new Date());

const [isLoggedIn, setLoggedIn] = useState('false')
const [isOpen, setOpen] = useState('false')


useEffect(() => {
    if(val !=0){
    console.log(time);
    }

    console.log("in use Effect")
    setVal(val+1)
    const interval = setInterval(() => {
        setreloadTime(Date.now())
        AuthService.getPrediction(localStorage.getItem("email")).then((e) =>
            {
                console.log(e.data)
                if(e.data.BITCOIN != 0){
                    CheckUpdate("BITCOIN", e.data.BITCOIN, e.data.BITCOIN_PRICE, e.data.BITCOIN_DATE)
                }
                if(e.data["ETHEREUM"] != 0){
                    
                }
                if(e.data.DOGE != 0){
                    console.log("Here")
                    CheckUpdate("DOGE", e.data.DOGE, e.data.DOGE_PRICE, e.data.DOGE_DATE)
                }
                if(e.data["CARDANO"] != 0){
                    
                }
                if(e.data["POLKA"] != 0){
                    
                }
            }
        )

      }, 5000);
      return () => clearInterval(interval);
        
    

},[time,pdays,isLoggedIn])





function handleChange(value) {
    setCoin(value)
    console.log(`selected ${value}`);

}
function handlePrice(value){
    setPrice(value.target.value)
    console.log(`selected ${value.target.value}`)

}

function handleDays(value){
    predicted_days(value)
    console.log(`selected ${value}`)
}



function get_Time(){
     //var gettime = new Date()
     //var current_time = cdate.toLocaleString('en-US',  { timeZone: 'America/Los_Angeles' }).split(',')
    //var fetched_time = timenow
    //current_date(fetched_time[0])
    //console.log('current_date:'+current_time[0])
    //current_time(fetched_time[1])
    //console.log('current_time:'+current_time[1])
    let result = new Date()
    console.log(result.getTime())
    console.log(pdays)
    result.setHours(result.getHours(),result.getMinutes() + pdays,0,0);
    //var added_date = result.toLocaleString('en-US',  { timeZone: 'America/Los_Angeles' });
    //console.log(added_date[1])
    //setPredicteddate(added_date[1])
    return result
    // var d = new Date(); // get current date
    // d.setHours(d.getHours(),d.getMinutes()+pdays,0,0);
    // predicted_date(date:d,time:d.toLocaleTimeString());
    //console.log('predicted_date:'+pdate)

    // console.log(cdate + pdays)
    // handleoutput()

}

    const { data, isFetching } = useGetCryptosQuery(20);

    if(isFetching)return 'Loading ...'

    const coins = data?.data?.coins;
    var dict ={}

    for (let [key,value] of Object.entries(coins)) {

        dict[value.symbol] = value?.price

    }

    const fetch_coin_price=(coin)=>{
        //console.log(dict)
        return dict[coin]
    }


    function CheckUpdate(coin, more, price, time){
        console.log(time)
        var gettime = new Date()
        var predictTime = new Date(time)
        console.log(gettime)
        console.log(predictTime)
        let status = 0
        let co = 'BTC'
        if(coin == "BITCOIN"){
            co = 'BTC'
        }
        else if(coin == 'ETHEREUM'){
            co = 'ETH'
        }
        else if( coin == 'DOGE'){
            co = 'DOGE'
        }
        else if ( coin == 'CARDANO'){
            co = 'ADA'
        }
        else{
            co = 'POLKA'
        }
        if(gettime > predictTime ){
            console.log("Hi")
            let status  = 0
            if(more == 1 && price < fetch_coin_price(co)){
                console.log("Here in High")
                status = 1
            }
            else if (more == 2 && price > fetch_coin_price(co)){
                console.log("Here in Low")
                status = 1
            }
            else{
                status = 0
            }
            AuthService.setPrediction(localStorage.getItem("email"), coin, price, time, status).then(
                () => {
                    console.log("Updated Main Table")
                }
            ).catch((error) => {
                // Error
                if (error.response) {
                    window.alert("Enter correct email/password")
                } else if (error.request) {
                    window.alert("Enter correct email/password")
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    window.alert("Enter correct email/password")
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

            AuthService.updateTransactionTable(localStorage.getItem("email"), coin, price, time, status).then(
                () => {
                    console.log("Updated Main Table")
                }
            ).catch((error) => {
                // Error
                if (error.response) {
                    window.alert("Enter correct email/password")
                } else if (error.request) {
                    window.alert("Enter correct email/password")
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    window.alert("Enter correct email/password")
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        }
    
    }













    const handleoutput = () =>{
        var dtime = get_Time()
        console.log(dtime)
        AuthService.getPrediction(localStorage.getItem("email")).then(
            (x) => { 
                
                console.log(x.data[coin])
                if(x.data[coin]!== 0){
                    console.log("Helooooooo")
                    // return(
                    //     <Popup trigger={<button> CLOSE</button>} position="right center">
                    //     <div>Already Prediction In Progress For Selected Coin </div>
                    //     </Popup>
        
                    // )
                    window.alert("Already Prediction In Progress For Selected Coin ")
                    return
                }
                else{
                var l = 2
                let co = 'BTC'
                if(coin == "BITCOIN"){
                    co = 'BTC'
                }
                else if(coin == 'ETHEREUM'){
                    co = 'ETH'
                }
                else if( coin == 'DOGE'){
                    co = 'DOGE'
                }
                else if ( coin == 'CARDANO'){
                    co = 'ADA'
                }
                else{
                    co = 'POLKA'
                }
                if(price > fetch_coin_price(co)){
                    l=1
                }
                console.log("Value of l")
                console.log(l)
                AuthService.postCoinPrediction(localStorage.getItem("email"), coin, dtime, price, l).then(
                    () => {
                    }).catch((error) => {
                    // Error
                    if (error.response) {
                        window.alert("Enter correct email/password")
                    } else if (error.request) {
                        window.alert("Enter correct email/password")
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        window.alert("Enter correct email/password")
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });}
            }).catch((error) => {
            // Error
            if (error.response) {
                window.alert("Enter correct email/password")
            } else if (error.request) {
                window.alert("Enter correct email/password")
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                window.alert("Enter correct email/password")
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
        
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

    function check_prediction_status(){

    }

    function update_after_prediction(coin_col, coin_val, coin_date, date_val){
        return axios.post(
            coin_col,
            coin_val,
            coin_date,
            date_val
        )

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
    <>
    <Title level={2} className="heading">
        AVAILABLE COINS TO PREDICT
    </Title>
    <Row>
        <Col span={12}><Statistic title="Bitcoin" value={'$' + fetch_coin_price('BTC')}/></Col>
        <Col span={12}><Statistic title="Ethereum" value={'$' +fetch_coin_price('ETH')}/></Col>
        <Col span={12}><Statistic title="Doge" value={'$' +fetch_coin_price('DOGE')}/></Col>
        <Col span={12}><Statistic title="Cordano" value={'$' +fetch_coin_price('ADA')}/></Col>
        <Col span={12}><Statistic title="Polka Dot" value={'$' +fetch_coin_price('DOT')}/></Col>
    </Row>
    <Row>
    <Col>
    <div className='prediction-form'>
    <form >
    <Title  level={4} className="prediction-heading">
        Choose Coin For Prediction
    </Title>
    <Select className='prediction-elemets' name = "selectedcoin"  defaultValue="SELECT COIN" style={{ width: 150 }} onChange={handleChange}>
      <Option value="BITCOIN">BITCOIN</Option>
      <Option value="ETHEREUM">ETHEREUM</Option>
      <Option value="DOGE">DOGE</Option>
      <Option value="CARDANO">CARDANO</Option>
      <Option value="POLKA">POLKA DOT</Option>
    </Select>
    <Title  level={4} className="prediction-heading">
        Enter Price
    </Title>
    <Input className='prediction-elemets' name="enteredprice" pattern="[0-9]*" title="Please enter only numbers" placeholder = "Enter Price" onChange = {handlePrice}  />
    <Title  level={4} className="prediction-heading">
        Select Time
    </Title>
    <Select className='prediction-elemets' name = "selecttime"  defaultValue="SELECT TIME" style={{ width: 150 }} onChange={handleDays}>
      <Option value ={1}>1M</Option>
      <Option value ={5}>5M</Option>
      <Option value={6}>6M</Option>
      <Option value={7}>7M</Option>
      <Option value={8}>8M</Option>
      <Option value={9}>9M</Option>
      <Option value={10}>10M</Option>
    </Select>

    <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleoutput} > Submit
    </Button>
    <Button type="primary" className="login-button-form" onClick={get_Time} > click me
    </Button>
    </form>
    </div>
    </Col>
    </Row>
    </>
    :''}
    </>
    )
}

export default Prediction
