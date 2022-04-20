import React, {useState, useEffect,useRef} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input,Typography,Statistic, Button } from 'antd';
import styled from 'styled-components';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Select } from 'antd';


const { Title } = Typography
const { Option } = Select;

const Prediction = () => {
    

    const [coin,setCoin] = useState("")
    const [price,setPrice] = useState(0)
    // useEffect(() => {
    //     const reloadUsingLocationHash = () => {
    //         window.location.hash = "reload";
    //       }
    //       window.onload = reloadUsingLocationHash();
        
    // },[]);
    // const refreshPage = ()=>{
    //     window.location.reload();
    //  }

function handleChange(value) {
    setCoin(value)
    console.log(`selected ${value}`);
  
}
function handlePrice(value){
    setPrice(value.target.value)
    console.log(`selected ${value.target.value}`)
    
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
        <Col span={12}><Statistic title="Bitcoin" value={millify(fetch_coin_price('BTC'))}/></Col>
        <Col span={12}><Statistic title="Ethereum" value={millify(fetch_coin_price('ETH'))}/></Col>
        <Col span={12}><Statistic title="Doge" value={millify(fetch_coin_price('DOGE'))}/></Col>
        <Col span={12}><Statistic title="Cordano" value={millify(fetch_coin_price('ADA'))}/></Col>
        <Col span={12}><Statistic title="Polka Dot" value={millify(fetch_coin_price('DOT'))}/></Col>
    </Row>
    <Row>
    <Col>        
    <div className='prediction-form'>
    <form >
    <Title  level={4} className="prediction-heading">
        Choose Coin For Prediction
    </Title>
    <Select className='prediction-elemets' name = "selectedcoin"  defaultValue="SELECT" style={{ width: 120 }} onChange={handleChange}>
      <Option value="BITCOIN">BITCOIN</Option>
      <Option value="ETHEREUM">ETHEREUM</Option>
      <Option value="DOGE">DOGE</Option>
      <Option value="CORDANO">CORDANO</Option>
      <Option value="POLKA DOT">POLKA DOT</Option>
    </Select>
    <Title  level={4} className="prediction-heading">
        Enter Price
    </Title>
    <Input className='prediction-elemets' name="enteredprice" pattern="[0-9]*" title="Please enter only numbers" placeholder = "Enter Price" onChange = {handlePrice}  />
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
