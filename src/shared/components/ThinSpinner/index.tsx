import React from 'react';

import './thin-spinner.scss';
import spinner from './images/spinner.svg';

type IProps = {
  className?: string;
  style?: React.CSSProperties;
};

const ThinSpinner = ({ className, style }: IProps): JSX.Element => (
  <div className={`thin-spinner ${className || ''}`} style={style}>
    <img src={spinner} alt="thin-spinner" />
  </div>
);

export default ThinSpinner;
