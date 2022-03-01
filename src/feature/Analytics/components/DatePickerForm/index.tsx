import { Button, Checkbox, DatePicker, FormLayout, Select, TextField } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import './datepicker.scss';

type Props = {
  from: string;
  to: string;
  setNewDates: ({ start, end }: { start: Date; end: Date }) => void;
};

const initialFrom = `${moment().year()}-${moment().month() + 1}-01`;
const initialTo = `${moment().year()}-${moment().month() + 1}-${moment().endOf('month').date()}`;

const selectableOptions = [
  {
    value: 'Custom',
    label: 'Custom',
  },
];

const DatePickerForm: React.FC<Props> = ({ from, to, setNewDates }: Props) => {
  const [{ month, year }, setDate] = useState({
    month: moment(from).month(),
    year: moment(from).year(),
  });

  const [invalidDateValues, setInvalidDateValues] = useState({
    start: '',
    end: '',
  });

  const [selectedDates, setSelectedDates] = useState({
    start: moment(from).toDate(),
    end: moment(to).toDate(),
  });

  const [dirty, setDirty] = useState(false);
  const [compare, setCompare] = useState(false);

  const handleDatesChange = useCallback(
    (dates) => {
      setSelectedDates(dates);
      setDirty(true);
    },
    [selectedDates],
  );

  const handleMonthChange = useCallback((month, year) => setDate({ month, year }), []);

  const clearForm = () => {
    setDirty(false);
    setSelectedDates({ start: moment(from).toDate(), end: moment(to).toDate() });
  };

  const discardDatesHandler = () => {
    setNewDates({ start: moment(initialFrom).toDate(), end: moment(initialTo).toDate() });
  };

  const handleSetDates = () => {
    setNewDates({ start: selectedDates.start, end: selectedDates.end });
  };

  const validateDates = (date: string, param: 'start' | 'end') => {
    const [year, month, day] = date.split('-');
    if (
      moment(date, 'YYYY-MM-DD').toDate().toString() === 'Invalid Date' ||
      !year ||
      year.length !== 4 ||
      !month ||
      month.length !== 2 ||
      !day ||
      day.length !== 2
    ) {
      const newDates = invalidDateValues;
      newDates[param] = date;
      setInvalidDateValues({ ...newDates });
      return false;
    }
    setDirty(true);
    setInvalidDateValues({ start: '', end: '' });
    return true;
  };

  const handleStartChange = useCallback(
    (value: string) => {
      if (validateDates(value, 'start')) {
        setSelectedDates({ start: moment(value).toDate(), end: selectedDates.end });
      }
    },
    [selectedDates],
  );

  const handleEndChange = useCallback(
    (value: string) => {
      if (validateDates(value, 'end')) {
        setSelectedDates({ start: selectedDates.start, end: moment(value).toDate() });
      }
    },
    [selectedDates],
  );

  const handleCheckbox = () => {
    const period = Math.abs(moment(selectedDates.start).diff(moment(selectedDates.end), 'days'));
    let newDates;
    if (!compare) {
      newDates = {
        start: moment(moment(selectedDates.start).subtract(period, 'days')).toDate(),
        end: selectedDates.start,
      };
    } else {
      newDates = {
        start: selectedDates.end,
        end: moment(moment(selectedDates.end).add(period, 'days')).toDate(),
      };
    }
    setDirty(true);
    setSelectedDates({ ...newDates });
    setCompare(!compare);
  };

  useEffect(() => {
    return () => {
      clearForm();
    };
  }, []);

  return (
    <div className="datepicker__wrapper">
      <FormLayout>
        <Select label="Date Range" options={selectableOptions} />
        <FormLayout.Group>
          <TextField
            label="Starting"
            onChange={handleStartChange}
            value={
              invalidDateValues.start.length > 0
                ? invalidDateValues.start
                : moment(selectedDates.start).format('YYYY-MM-DD')
            }
          />
          <TextField
            label="Ending"
            onChange={handleEndChange}
            value={
              invalidDateValues.end.length > 0
                ? invalidDateValues.end
                : moment(selectedDates.end).format('YYYY-MM-DD')
            }
          />
        </FormLayout.Group>
        <DatePicker
          month={month}
          year={year}
          onChange={handleDatesChange}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
          multiMonth
          allowRange
        />
        <Checkbox label="Compare to Previous period" checked={compare} onChange={handleCheckbox} />
        <div className="datepicker__buttons">
          <Button size="medium" onClick={discardDatesHandler}>
            Cancel
          </Button>
          <Button onClick={handleSetDates} disabled={!dirty} primary>
            Apply
          </Button>
        </div>
      </FormLayout>
    </div>
  );
};

export default DatePickerForm;
