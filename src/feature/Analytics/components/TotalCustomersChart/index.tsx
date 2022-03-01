/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getCustomers } from '../../store/selectors';
import Chart from '../Chart';
import { DataGraphType, getAmount } from '../../utils';

type IPropsType = {
  name: string;
  from: string;
  to: string;
};

const TotalCustomersChart: React.FC<IPropsType> = ({ name, from, to }) => {
  const [customersData, setCustomersData] = useState<DataGraphType[]>([]);
  const customers = useSelector(getCustomers);

  useEffect(() => {
    if (customers.length) {
      setCustomersData(
        customers.map((customer) => ({
          x: moment(customer.date).format('DD MMM YYYY'),
          y: +customer.count,
        })),
      );
    }
  }, [customers, from, to]);

  return (
    <Chart
      name={name}
      xAxisLabel=""
      title="Number of Clients"
      total={getAmount(customersData)}
      description="Number of active paying clients throughout the hub."
      subtitle="Number of clients"
      items={[
        {
          data: customersData,
          styles: { color: '#49E3D7' },
        },
      ]}
    />
  );
};

export default TotalCustomersChart;
