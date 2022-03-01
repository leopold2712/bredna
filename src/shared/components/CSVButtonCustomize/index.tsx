/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef, useState } from 'react';
import { Icon } from '@shopify/polaris';
import moment from 'moment';
import { ExportMinor } from '@shopify/polaris-icons';
import { CSVLink } from 'react-csv';

import './csvbutton.scss';

type Props = {
  getData: () => any;
  transformData: (item: any) => any;
  fileName: string;
  title: string;
  hideIcon?: boolean;
};

const CSVButtonCustomize: React.FC<Props> = ({
  getData,
  transformData,
  fileName,
  title,
  hideIcon = false,
}: Props) => {
  const csvRef = useRef(null);

  const [exportData, setExportData] = useState<object[]>([]);

  const onExport = async () => {
    const data = await getData();
    const list = data.payload;
    setExportData(list.map(transformData));
    if (csvRef && csvRef.current) {
      // @ts-ignore
      csvRef.current.link.click();
    }
  };

  const buttonTitle = hideIcon ? 'Export' : `Export ${title}`;

  return (
    <>
      <CSVLink
        data={exportData}
        filename={`${fileName}_${moment().format('DD.MM.YYYYTh-mma')}.csv`}
        ref={csvRef}
      />
      <div className="export-button">
        <button className="Polaris-Button Polaris-Button--outline" type="button" onClick={onExport}>
          <span className="Polaris-Button__Content">
            {!hideIcon && (
              <span className="Polaris-Button__Icon">
                <Icon source={ExportMinor} color="base" />
              </span>
            )}
            <span className="Polaris-Button__Text">{buttonTitle}</span>
          </span>
        </button>
      </div>
    </>
  );
};

export default CSVButtonCustomize;
