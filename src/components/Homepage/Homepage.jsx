import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { CryptoNews } from '..';
import { CurrencyCrypto } from '..';
import './Homepage.css';

const { Title } = Typography

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10); 
    const globalStats = data?.data?.stats;
    if(isFetching) return 'Loading...';
    
  return (
    <>
    <Title level={2} className="heading">
        Global Crypto Stats
    </Title>
    <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Market" value={millify(globalStats.totalMarkets)}/></Col>
    </Row>
    <div className = "heading_home">
        <Title level={2} className="title-home">Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className="home_show"><Link to="/cryptocurrencies">Show More</Link></Title>
    </div>
    <CurrencyCrypto simplified/>
    <div className = "heading_home">
        <Title level={2} className="title-home">Latest Crypto News</Title>
        <Title level={3} className="home_show"><Link to="/news">Show More</Link></Title>
    </div>
    <CryptoNews simplified/>
    </>
  )
}

export default Homepage