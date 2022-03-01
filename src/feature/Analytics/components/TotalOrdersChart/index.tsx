/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getOrders } from '../../store/selectors';
import Chart from '../Chart';
import { getAmount, DataGraphType } from '../../utils';

type IPropsType = {
  name: string;
  from: string;
  to: string;
};

const TotalOrdersChart: React.FC<IPropsType> = ({ name, from, to }) => {
  const [ordersData, setOrdersData] = useState<DataGraphType[]>([]);
  const orders = useSelector(getOrders);

  useEffect(() => {
    if (orders.length) {
      setOrdersData(
        orders.map((order) => ({
          x: moment(order.date).format('DD MMM YYYY'),
          y: +order.count,
        })),
      );
    }
  }, [orders, from, to]);

  return (
    <Chart
      name={name}
      xAxisLabel=""
      title="Total Orders"
      total={getAmount(ordersData)}
      description="Number of total orders/purchases throughout the hub (e.g. one time passes, multi entry cards,  subscriptions, and VOD)."
      subtitle="ORDERS OVER TIME"
      items={[
        {
          data: ordersData,
          styles: { color: '#49E3D7' },
        },
      ]}
    />
  );
};

export default TotalOrdersChart;
