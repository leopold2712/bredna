/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, Icon } from '@shopify/polaris';
import { ArrowUpMinor } from '@shopify/polaris-icons';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryLegend,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory';
import './style.scss';
import { useAppSelector } from '../../../../main/store/hooks';
import AnalyticsLoader from '../LoadingOverlay';

type dataChart = {
  x: string | number;
  y: string | number;
};

type Chart = {
  data: dataChart[];
  styles?: {
    color?: string;
    dasked?: boolean;
  };
};

export interface IChart {
  name: string;
  title: string;
  description?: string;
  total: string;
  percent?: {
    value: number;
    status: 'positive' | 'negative';
  } | null;
  subtitle: string;
  items: Chart[];
  xAxisLabel: string;
}

const Chart: React.FC<IChart> = ({
  name,
  title,
  total,
  percent,
  subtitle,
  items,
  description,
  xAxisLabel,
}: IChart) => {
  const { analyticsLoading } = useAppSelector((state) => state.analytics);
  return (
    <div className="analytics__item-with-loading">
      <div className="chart">
        <Card>
          <Card.Section>
            <h3 className="chart__title">
              {title}
              {description && <span className="chart__desciption">{description}</span>}
            </h3>
            <div className="chart__head">
              <div className="chart__total">{total}</div>
              <div
                className={`chart__percent ${percent ? `chart__percent_${percent.status}` : ''}`}
              >
                {percent && (
                  <span className={`chart__percent-icon chart__percent-icon_${percent.status}`}>
                    <Icon source={ArrowUpMinor} />
                  </span>
                )}
                {percent && percent.value ? `${percent.value}%` : '-'}
              </div>
            </div>
            <div className="chart__box">
              <div className="chart__subtitle">{subtitle}</div>
            </div>
            <VictoryChart
              theme={VictoryTheme.material}
              height={250}
              width={400}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) => `${datum.x} : ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: 'white' }} />
                  }
                />
              }
            >
              {items.map((el, index) => (
                <VictoryLine
                  key={index}
                  data={el.data}
                  style={{
                    data: {
                      stroke: el.styles && el.styles.color ? el.styles?.color : '#000',
                      strokeDasharray: el.styles && el.styles.dasked ? '2 2' : '0',
                    },
                  }}
                />
              ))}
              <VictoryAxis
                label={xAxisLabel}
                axisLabelComponent={<VictoryLabel dy={-6} dx={150} />}
                fixLabelOverlap
                style={{
                  tickLabels: { margin: 10, padding: 20, angle: 45, fontSize: 10 },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickValues={items[0].data.every((i) => i.y === 0) ? [5, 10, 15, 20] : undefined}
              />
              <VictoryLegend
                orientation="horizontal"
                data={[{ name, symbol: { fill: '#49E3D7', type: 'square' } }]}
              />
            </VictoryChart>
          </Card.Section>
        </Card>
      </div>

      {analyticsLoading && <AnalyticsLoader />}
    </div>
  );
};

export default Chart;
