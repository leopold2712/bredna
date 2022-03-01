import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { Card } from '@shopify/polaris';
import { PieChart } from 'react-minimal-pie-chart';
import type { LabelRenderProps } from 'react-minimal-pie-chart/types/Label';

import { Loading } from './Loading';
import { MonthSwitch } from '../../../../../shared/components/MonthSwitch';
import { useAppDispatch, useAppSelector } from '../../../../../main/store/hooks';
import { getRevShareAsync } from '../../../store/actions/getRevShareAsync';
import { totalColumns } from '../../../constants';
import { EColors } from '../../../constants/total';

import type { TTotal } from '../../../types';

import styles from './styles.module.scss';

export const Total: FC = () => {
  const dispatch = useAppDispatch();

  const { total, isLoaded } = useAppSelector((state) => state.earning);

  const [currentDate, setCurrentDate] = useState(moment());

  const [startTime, setStartTime] = useState(moment().startOf('month').unix());
  const [endTime, setEndTime] = useState(moment().unix());

  useEffect(() => {
    dispatch(getRevShareAsync({ startTime, endTime }));
  }, [startTime, endTime]);

  const setNewDates = ({ start, end }: { start: Date; end: Date }) => {
    setStartTime(moment(start).unix());
    setEndTime(moment(end).unix());
  };

  const makePieChartData = (total?: TTotal) => {
    const grey = {
      value: 0.001,
      color: 'grey',
    };

    if (total) {
      const mappedObj = Object.entries(total)
        .filter(([key]) => key !== 'total')
        .map(([key, value]) => ({
          value: value.earnings.total,
          // @ts-ignore
          color: EColors[key],
        }));

      if (mappedObj.every((el) => el.value === 0)) {
        return [grey];
      }

      return mappedObj;
    }

    return [grey];
  };

  const makePieChartLabel = ({ dataEntry }: LabelRenderProps) =>
    dataEntry.value !== 0 && dataEntry.value !== 0.001 ? `$${dataEntry.value}` : '';

  return (
    <div className={styles.total}>
      <MonthSwitch
        setNewDates={setNewDates}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      {!isLoaded ? (
        <Loading />
      ) : (
        <div className={styles.total__card_wrapper}>
          <Card>
            <Card.Section>
              <div className={styles.card__main}>
                <h3 className={styles.card__title}>{`Total $${total?.total.earnings.total}`}</h3>
                <div className={styles.card__circle_wrapper}>
                  <PieChart
                    data={makePieChartData(total)}
                    label={makePieChartLabel}
                    className={styles.card__circle}
                    radius={30}
                    lineWidth={35}
                    labelPosition={112}
                  />
                </div>
                <div className={styles.info__wrapper}>
                  {totalColumns.map((el) => (
                    <div className={styles.info__element}>
                      <div className={styles.info__color_square} style={{ background: el.color }} />
                      <div className={styles.info__text_wrapper}>
                        <p className={styles.info__title}>{el.title}</p>
                        <p className={styles.info__subtitle}>{el.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.card__footer}>
                Including both show & no-show upto current date
              </div>
            </Card.Section>
          </Card>
        </div>
      )}
    </div>
  );
};
