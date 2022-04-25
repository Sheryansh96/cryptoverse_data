import React, {useState, useEffect,useRef} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input,Typography,Statistic, Button } from 'antd';
import styled from 'styled-components';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Select } from 'antd';
import './Prediction.css';



const { Title } = Typography
const { Option } = Select;

const Prediction = () => {


const [coin,setCoin] = useState("")
const [price,setPrice] = useState(0)
const [predictiontime,setTime] = useState(0)
const [time,present_time] = useState()
const [val, setVal] = useState(0)
const [ptime,predicted_time] = useState("")
const [timereload, setreloadTime] = useState(Date.now());

useEffect(() => {
    if(val !=0){
    console.log(time);
    }
    console.log("Hi world")
    setVal(val+1)
    // const interval = setInterval(() => {
    //     setreloadTime(Date.now())
    //   }, 5000);
    //   return () => clearInterval(interval);
},[time])

function handleChange(value) {
    setCoin(value)
    console.log(`selected ${value}`);

}
function handlePrice(value){
    setPrice(value.target.value)
    console.log(`selected ${value.target.value}`)

}

function handleDays(value){
    setTime(value)
    console.log(`selected ${value}`)

}
function getTime(){
    var gettime = new Date()
    present_time(gettime.toLocaleString('en-US',  { timeZone: 'America/Los_Angeles' }).split(','))
}

    const { data, isFetching } = useGetCryptosQuery(20);

    if(isFetching)return 'Loading ...'

    const coins = data?.data?.coins;
    var dict ={}

    for (let [key,value] of Object.entries(coins)) {

            dict[value.symbol] = value?.price

    }
    const fetch_coin_price=(coin)=>{
        return dict[coin]

    }
    const handleoutput = () =>{
        console.log(coin)
        console.log(price)

    }

    return (
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
      <Option value="CORDANO">CARDANO</Option>
      <Option value="POLKA DOT">POLKA DOT</Option>
    </Select>
    <Title  level={4} className="prediction-heading">
        Enter Price
    </Title>
    <Input className='prediction-elemets' name="enteredprice" pattern="[0-9]*" title="Please enter only numbers" placeholder = "Enter Price" onChange = {handlePrice}  />
    <Title  level={4} className="prediction-heading">
        Select Time
    </Title>
    <Select className='prediction-elemets' name = "selecttime"  defaultValue="SELECT TIME" style={{ width: 150 }} onChange={handleDays}>
      <Option value="1">1D</Option>
      <Option value="2">2D</Option>
      <Option value="3">3D</Option>
      <Option value="4">4D</Option>
      <Option value="5">5D</Option>
    </Select>

    <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleoutput} > Submit
    </Button>

    </form>
    </div>
    </Col>
    </Row>
    </>
    )
}

export default Prediction
