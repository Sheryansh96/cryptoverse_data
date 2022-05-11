import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const LineChart = ({ coinHistory, currentPrice, coinName, time }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // for(let i = 0; i < coinHistory?.data?.history?.length; i += 1){
  //   coinPrice.push(coinHistory?.data.history[i].price);
  //   coinTimestamp.push(new Date(coinHistory?.data?.history[i]?.timestamp*1000).toLocaleDateString());
  // }

  const len = coinHistory?.data?.history?.length;
  const yLen = coinHistory?.data?.history?.length;

  console.log(len)

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    //coinPrice.push(coinHistory?.data?.history[i].price);
    coinPrice.unshift(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    //coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString());
    coinTimestamp.unshift(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString('en-US', {hour:'numeric',minute:'numeric'}));
  }

  const data = {
    labels: coinTimestamp,
      datasets: [
      {
        label: `Price of ${coinName} in USD`,
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

const options = {
    elements: {
      point:{
      radius: 0
      }
    },
    scales: {
      yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
      ],
  },
};

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-Typography.Title">
          {coinName} Price Chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            {coinHistory?.data?.change}
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;