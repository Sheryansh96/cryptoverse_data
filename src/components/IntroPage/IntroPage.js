import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { CryptoNews } from '..';
import { CurrencyCrypto } from '..';

const { Title } = Typography

function IntroPage() {
  return (
    <Title level={2} className="heading">
        CryptoTracker
    </Title>
    
  )
}

export default IntroPage
