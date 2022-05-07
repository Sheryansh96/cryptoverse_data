import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, WalletOutlined, LogoutOutlined, FundProjectionScreenOutlined} from '@ant-design/icons';
import './Navbar.css';

import icon from '../../images/cryptocurrency.png'

const Navbar = (props) => {
    function Logout(){
        localStorage.setItem("isLoggedIn","false");
    }
  return (
        <div className= {props.nav_open?"navbar":"navbar_close"}>
        <div className = "nav-container">
            <div className = "logo-container">
                <Avatar src = {icon} size = "large" />
                <Typography.Title level = {2} className = "logo">
                    <Link to = "/">CryptoTracker</Link>
                </Typography.Title>
            </div>
            <Menu theme = "dark">
                <Menu.Item icon = {<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon = {<FundOutlined/>}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                {/* <Menu.Item icon = {<MoneyCollectOutlined/>}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item> */}
                <Menu.Item icon = {<BulbOutlined/>}>
                    <Link to="/news">News</Link>
                </Menu.Item>
                <Menu.Item icon = {<FundProjectionScreenOutlined/>}>
                    <Link to="/prediction">Prediction</Link>
                </Menu.Item>
                <Menu.Item icon = {<WalletOutlined/>}>
                    <Link to="/wallet">Wallet</Link>
                </Menu.Item>
                <Menu.Item icon = {<LogoutOutlined/>}>
                     <span onClick={()=>{console.log("clicked");localStorage.setItem("isLoggedIn","false");
                 window.location.reload();}}>Logout</span>
                </Menu.Item>
            </Menu>
        </div>
        </div>
  )
}

export default Navbar
