import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Heading,
  RadioButton,
  Scrollable,
  Sheet,
  Stack,
  TextStyle,
} from '@shopify/polaris';
import { MobileCancelMajor } from '@shopify/polaris-icons';
import moment, { Moment } from 'moment-timezone';
import { useWindowSize } from '@react-hook/window-size';
import { EventInput } from '@fullcalendar/react';

import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { setCurrentSlot, setSessionLoading } from '../../store';
import { getCurrentSlot } from '../../store/selectors';
import { createSlot, deleteSlot, updateOneSlot } from '../../store/actions';
import { mapDateAndTime } from '../../utils/mapDateAndTime';

import type { SessionScopeTypes } from '../../dtos/scopeTypes.dto';
import type { TimeRange } from '../../types/TimeRange.type';
import type { SlotDTO } from '../../dtos';

import { TimeRangePicker } from '../../../../shared/components/TimeRangePicker';
import { BeautySelect } from '../../../../shared/components/BeautySelect';
import { LocalLoader } from '../../../../shared/components/LocalLoader';
import HeyToast from '../../../../shared/components/HeyToast';
import { ChooseEditModeModal } from '../ChooseEditModeModal';
import { DeleteSlotConfirm } from '../DeleteSlotConfirm';
import { RepeatPopover } from '../RepeatPopover';
import { DatePopover } from '../DatePopover';
import { DaysRepeat } from '../DaysRepeat';

import {
  RepeatCaps,
  RepeatOptions,
  SlotScopes,
  RepeatOptionsNouns,
  countsOptions,
  SessionViewModes,
  mapRepeats,
  mapRepeatsToNouns,
} from '../../constants';

import styles from './availabilityModal.module.scss';
import './availability.overload.scss';

type ExtendedProps = {
  relatedSlots: SlotDTO[];
};

type Props = {
  eventInfo: EventInput | null;
  isOpen: boolean;
  onSheetClose: () => void;
  selectedDate: Date;
  currentDates: React.MutableRefObject<{
    start: Moment;
    end: Moment;
  }>;
  onSlotsUpdate: () => void;
  updateTempSlot: (arg: TimeRange | Date) => void;
};

const AvailabilityModal: React.FC<Props> = ({
  eventInfo,
  isOpen,
  onSheetClose,
  selectedDate,
  currentDates,
  onSlotsUpdate,
  updateTempSlot,
}: Props) => {
  const dispatch = useAppDispatch();
  const { data, loading, viewMode } = useAppSelector(getCurrentSlot);

  // session repeat flag
  const [repeatOnDate, setRepeatOnDate] = useState(false);

  // selected repeat option
  const [repeatOption, setRepeatOption] = useState(RepeatOptions.DOESNT_REPEAT);
  const [repeatTouched, setRepeatTouched] = useState(false);

  // day of repeat (sun, mon, etc)
  const [repeatSuffix, setRepeatSuffix] = useState('');

  // date when repeat will end
  const [repeatEndDate, setRepeatAvailabilityEndDate] = useState<Moment>();

  const [repeatAfterCount, setRepeatAfterCount] = useState('1');

  // initial selected date
  const [availabilityDate, setAvailabilityDate] = useState(moment());

  const timezoneName = useAppSelector((state) => state.auth?.user?.time_zone?.name);

  const [selectedRepeatOptionNoun, setSelectedRepeatOptionNoun] = useState<
    RepeatOptionsNouns | string
  >(RepeatOptionsNouns.WEEK);
  const [selectedCountAmount, setSelectedCountAmount] = useState('1');

  const [{ month, year }, setDate] = useState({
    month: moment().month(),
    year: moment().year(),
  });

  const [{ endMonth, endYear }, setEndDate] = useState({
    endMonth: moment().month(),
    endYear: moment().year(),
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleDaySelect = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((v) => v !== day));
      return;
    }
    setSelectedDays([...selectedDays, day]);
  };

  const [width] = useWindowSize();
  const mobileView = width <= 600;

  const [timeRange, setTimeRange] = useState({
    start: moment().toDate(),
    end: moment().add(30, 'm').toDate(),
  });

  const [openChooseModeModal, setOpenChooseModeModal] = useState(false);
  const [deleteSlotConfirmOpen, setDeleteSlotConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteChoosing, setDeleteChoosing] = useState(false);
  const toggleDeleteSlotConfirm = () => {
    setDeleteSlotConfirmOpen((prev) => !prev);
    setDeleteChoosing(false);
  };

  useEffect(() => {
    let start = moment(data?.start_time).toDate();
    let end = moment(data?.end_time).toDate();

    const { relatedSlots } = (eventInfo?.extendedProps as ExtendedProps) || { relatedSlots: [] };
    if (relatedSlots !== undefined && relatedSlots.length > 0) {
      start = moment(relatedSlots[0].start_time).toDate();
      end = moment(relatedSlots[relatedSlots.length - 1].end_time).toDate();
    }

    if (!data) {
      start = selectedDate;
      end = moment(selectedDate).add(30, 'm').toDate();
    }

    setTimeRange({
      start,
      end,
    });

    // custom repeat option
    if (data && data.definition) {
      if (data.definition.repeat_on.length > 1) {
        setRepeatOption(RepeatOptions.CUSTOM);
      } else {
        setRepeatOption(mapRepeats[data.definition.repeat_schedule]);
      }
      setSelectedDays(data?.definition.repeat_on);
      setRepeatOnDate(!!data?.definition.ends_at);
      setSelectedCountAmount(data.definition.repeat_cycle.toString());
      setSelectedRepeatOptionNoun(mapRepeatsToNouns[data.definition.repeat_schedule]);
    }
  }, [data]);

  const toggleChooseModeModal = () => {
    if (openChooseModeModal) setDeleteChoosing(false);
    setOpenChooseModeModal((prev) => !prev);
  };

  const updateTimeRange = ({ start, end }: { start: Date; end: Date }) => {
    if (moment(start).isBefore(moment(end))) {
      updateTempSlot({ start, end });
    }
    setTimeRange({ start, end });
  };

  const handleEndDateInput = (data: { [key: string]: string }) => {
    const oldDate = repeatEndDate;
    let newDate: moment.Moment = moment(oldDate);

    const { year, month, date, time } = data;
    if (year) newDate = newDate.year(+year);
    if (month) newDate = newDate.month(+moment().month(month).format('M') - 1);
    if (date) newDate = newDate.date(+date);
    if (time) {
      const [hours, minutes] = time.split(':');
      newDate = newDate.hours(+hours).minutes(+minutes);
    }

    setRepeatAvailabilityEndDate(newDate || oldDate);
  };

  const handleRepeatSelect = (option: RepeatOptions) => {
    setRepeatOption(option);
    setRepeatTouched(true);
  };

  const handleCancelButton = () => {
    setSelectedCountAmount('1');
    setSelectedDays([]);
    setSelectedRepeatOptionNoun(RepeatOptionsNouns.WEEK);
    setRepeatOption(RepeatOptions.DOESNT_REPEAT);
    setRepeatTouched(false);
  };

  const handleDateInput = (data: { [key: string]: string }) => {
    const oldDate = availabilityDate;
    let newDate: moment.Moment = moment(oldDate);

    if (!oldDate) {
      return;
    }

    const { year, month, date, time } = data;
    if (year) newDate = newDate.year(+year);
    if (month) newDate = newDate.month(+moment().month(month).format('M') - 1);
    if (date) newDate = newDate.date(+date);
    if (time) {
      const [hours, minutes] = time.split(':');
      newDate = newDate.hours(+hours).minutes(+minutes);
    }
    updateTempSlot(newDate.toDate() || oldDate.toDate());
    setAvailabilityDate(newDate || oldDate);

    handleCancelButton();
  };

  const handleMonthChange = useCallback((month, year) => setDate({ month, year }), []);
  const handleEndMonthChange = useCallback(
    (endMonth, endYear) => setEndDate({ endMonth, endYear }),
    [],
  );

  useEffect(() => {
    setAvailabilityDate(moment(selectedDate));

    setRepeatSuffix(moment(selectedDate).format('dddd'));

    if (!data) {
      const start = selectedDate;
      const end = moment(selectedDate).add(30, 'm').toDate();

      setTimeRange({
        start,
        end,
      });
    }
  }, [selectedDate]);

  const handleChangeRepeatOnDate = useCallback(
    (_checked) => {
      setRepeatOnDate(!repeatOnDate);
    },
    [repeatOnDate],
  );

  const defineRepeatSchedule = () => {
    if (repeatOption !== RepeatOptions.DOESNT_REPEAT) {
      if (repeatOption === RepeatOptions.CUSTOM)
        return selectedRepeatOptionNoun === 'Week' ? 'weekly' : 'monthly';

      return repeatOption.toLowerCase();
    }
    return 'none';
  };

  const getRepeatUntil = (): number => {
    if (repeatOnDate && repeatEndDate) return repeatEndDate.unix();
    return parseInt(repeatAfterCount, 10);
  };

  const handleSave = async (scope?: SessionScopeTypes) => {
    try {
      dispatch(setSessionLoading(true));

      const { relatedSlots } = (eventInfo?.extendedProps as ExtendedProps) || { relatedSlots: [] };
      const slotToUpdate = relatedSlots[0];

      const dateScope =
        scope === SlotScopes.ALL ? moment(data?.definition.starts_at) : availabilityDate;

      const { start, end } = mapDateAndTime(dateScope, timeRange);

      const dto = {
        display_start_time: currentDates.current.start.unix(),
        display_end_time: currentDates.current.end.unix(),
        starts_at: start.unix(),
        ends_at: end.unix(),
        scope: scope || SlotScopes.THIS,
        ...(repeatTouched && { repeat_schedule: defineRepeatSchedule() }),
        ...(repeatTouched && {
          repeat_cycle: repeatOption !== RepeatOptions.DOESNT_REPEAT ? +selectedCountAmount : 1,
        }),
        ...(repeatOption === RepeatOptions.CUSTOM && { repeat_on: selectedDays }),
        ...(repeatOption === RepeatOptions.CUSTOM && {
          repeat_cap: repeatOnDate ? RepeatCaps.TIME : RepeatCaps.OCCURRENCES,
        }),
        ...(repeatOption === RepeatOptions.CUSTOM && {
          repeat_until: getRepeatUntil(),
        }),
      };

      if (slotToUpdate?.id) {
        await dispatch(updateOneSlot({ dto, id: slotToUpdate.id }));
        onSlotsUpdate();
        HeyToast.show({ text: 'Slots updated successfully' });
      } else {
        throw new Error("Can't update slot");
      }
    } catch (err) {
      HeyToast.show({ text: err.message, isError: true });
    } finally {
      dispatch(setSessionLoading(false));
    }
  };

  const createNewSlot = async () => {
    try {
      dispatch(setSessionLoading(true));

      const dto = {
        display_start_time: currentDates.current.start.unix(),
        display_end_time: currentDates.current.end.unix(),
        starts_at: moment(timeRange.start).unix(),
        ends_at: moment(timeRange.end).unix(),
        ...(repeatTouched && { repeat_schedule: defineRepeatSchedule() }),
        ...(repeatTouched && {
          repeat_cycle: repeatOption !== RepeatOptions.DOESNT_REPEAT ? +selectedCountAmount : 1,
        }),
        ...(repeatOption === RepeatOptions.CUSTOM && { repeat_on: selectedDays }),
        ...(repeatOption === RepeatOptions.CUSTOM && {
          repeat_cap: repeatOnDate ? RepeatCaps.TIME : RepeatCaps.OCCURRENCES,
        }),
        ...(repeatOption === RepeatOptions.CUSTOM && {
          repeat_until: getRepeatUntil(),
        }),
      };

      await dispatch(createSlot(dto));

      onSlotsUpdate();
      HeyToast.show({ text: 'Slots updated successfully' });
    } catch (err) {
      HeyToast.show({ text: err.message, isError: true });
    } finally {
      dispatch(setSessionLoading(false));
    }
  };

  const handleDelete = async (scope?: SessionScopeTypes) => {
    setDeleteLoading(true);

    try {
      if (scope === SlotScopes.THIS) {
        const req = (eventInfo?.extendedProps as { relatedSlots: SlotDTO[] }).relatedSlots.map(
          (slot) =>
            dispatch(
              deleteSlot({
                id: slot.id,

                display_start_time: currentDates.current.start.unix(),
                display_end_time: currentDates.current.end.unix(),

                scope: 'this',
              }),
            ),
        );

        await Promise.all(req);
      } else if (data)
        await dispatch(
          deleteSlot({
            id: data.id,

            display_start_time: currentDates.current.start.unix(),
            display_end_time: currentDates.current.end.unix(),

            scope: scope || SlotScopes.ALL,
          }),
        );

      await setDeleteSlotConfirmOpen(false);
      HeyToast.show({ text: 'Deleted sucessfully' });
      onSlotsUpdate();
    } catch (err) {
      HeyToast.show({ text: 'An error occured while deleting' });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSaveClick = () => {
    if (data?.id) {
      if (data?.definition.repeat_schedule === 'none') {
        handleSave();
      } else {
        toggleChooseModeModal();
      }
    } else {
      createNewSlot();
    }
  };

  const handleDeleteClick = () => {
    if (data?.definition && data?.definition.repeat_schedule === 'none') {
      toggleDeleteSlotConfirm();
    } else {
      setDeleteChoosing(true);
      toggleChooseModeModal();
    }
  };

  const confirmDelete = () => handleDelete('all');

  const handleScopeChange = (arg: SessionScopeTypes) => {
    toggleChooseModeModal();
    if (deleteChoosing) {
      handleDelete(arg);
      setDeleteChoosing(false);
    } else {
      handleSave(arg);
    }
  };

  const handleBeautySelect = (arg: string, id?: string | number) => {
    if (id !== undefined) {
      switch (id) {
        case 'countOptions': {
          setSelectedCountAmount(arg);
          break;
        }
        case 'repeatOptionNoun': {
          setSelectedRepeatOptionNoun(arg);
          break;
        }
        case 'repeatAfterCount': {
          setRepeatAfterCount(arg);
          break;
        }
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      dispatch(setCurrentSlot(null));
      handleCancelButton();
    }
  }, [isOpen]);

  const disabled = moment(availabilityDate).startOf('day') < moment().startOf('day');

  return (
    <Sheet
      open={isOpen}
      onClose={() => {
        onSheetClose();
      }}
      accessibilityLabel="availability"
    >
      <div className={styles.availabilityModalContainer}>
        <div className={styles.availabilityModalContainer__subContainer}>
          <Heading>Availability</Heading>
          <Button
            accessibilityLabel="Cancel"
            icon={MobileCancelMajor}
            onClick={onSheetClose}
            plain
          />
        </div>

        <Scrollable className={styles.availabilityModalContainer__scrollableContainer}>
          <p>Set the range of hours when you can accept meetings.</p>

          <h1 className={styles.header}>Date & Time</h1>

          <div className={styles.availabilitySection}>
            <p className={styles.componentLabel}>Date</p>
            <DatePopover
              year={year}
              month={month}
              availabilityDate={availabilityDate}
              handleDateInput={handleDateInput}
              handleMonthChange={handleMonthChange}
            />
          </div>
          <div className={styles.availabilitySection}>
            <p className={styles.componentLabel}>What hours are you available?</p>
            <TimeRangePicker values={timeRange} onChange={updateTimeRange} disabled={disabled} />
          </div>

          <div className={styles.availabilitySection}>
            <ul className={styles.listStyle}>
              <li>
                <span className={styles.timeZoneSpan}>
                  {`GMT${moment()
                    .tz(timezoneName || Intl.DateTimeFormat().resolvedOptions().timeZone)
                    .format('Z')} (${
                    timezoneName || Intl.DateTimeFormat().resolvedOptions().timeZone
                  })`}
                </span>
              </li>
            </ul>
          </div>

          <div className={styles.availabilitySection}>
            <p className={styles.repeatLabel}>Repeat</p>
            <RepeatPopover
              onSelect={handleRepeatSelect}
              selected={repeatOption}
              suffix={repeatSuffix}
              disabled={disabled}
            />
          </div>

          {moment(availabilityDate).startOf('day') < moment().startOf('day') && (
            <div className={styles.availabilitySection}>
              <TextStyle variation="negative">You cannot change past dates</TextStyle>
            </div>
          )}

          {repeatOption === RepeatOptions.CUSTOM && (
            <div>
              <div className={styles.availabilitySection}>
                <div className={styles.repeatEveryWrapper}>
                  <div className={styles.repeatSection}>
                    <p className={styles.repeatHeading}>Repeat every</p>
                  </div>
                  <div className={styles.repeatSelects}>
                    <BeautySelect
                      id="countOptions"
                      options={countsOptions}
                      onChange={handleBeautySelect}
                      value={selectedCountAmount}
                      disabled={disabled}
                    />
                    <BeautySelect
                      id="repeatOptionNoun"
                      value={selectedRepeatOptionNoun}
                      options={[
                        { label: RepeatOptionsNouns.WEEK, value: RepeatOptionsNouns.WEEK },
                        { label: RepeatOptionsNouns.MONTH, value: RepeatOptionsNouns.MONTH },
                      ]}
                      onChange={handleBeautySelect}
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>

              {selectedRepeatOptionNoun === RepeatOptionsNouns.WEEK && (
                <>
                  <div className={styles.divider} />
                  <div className={styles.availabilitySection}>
                    <p className={styles.repeatHeading}>Repeat on</p>
                    <DaysRepeat selectedDays={selectedDays} handleDaySelect={handleDaySelect} />
                  </div>
                </>
              )}

              <div className={styles.divider} />

              <div className={styles.availabilitySection}>
                <p className={styles.repeatHeading}>Ends</p>
              </div>

              <div className={`${styles.availabilitySection} radioButtons`}>
                <div className={styles.endsOn}>
                  <RadioButton
                    label="On"
                    checked={repeatOnDate}
                    id="repeatOnDate"
                    name="repeatOnDate"
                    onChange={handleChangeRepeatOnDate}
                  />

                  <div className={styles.endsOnDate} id="dateEnd">
                    <DatePopover
                      month={endMonth}
                      year={endYear}
                      handleMonthChange={handleEndMonthChange}
                      availabilityDate={repeatEndDate || moment(selectedDate)}
                      handleDateInput={handleEndDateInput}
                      disabled={!repeatOnDate}
                    />
                  </div>
                </div>
              </div>

              <div className={`${styles.availabilitySection} radioButtons`}>
                <div className={styles.endsAfter}>
                  <RadioButton
                    label="After"
                    checked={!repeatOnDate}
                    id="notRepeatOnDate"
                    name="notRepeatOnDate"
                    onChange={handleChangeRepeatOnDate}
                  />
                  <div className={styles.afterSelectWrapper}>
                    <BeautySelect
                      id="repeatAfterCount"
                      options={countsOptions}
                      onChange={handleBeautySelect}
                      value={repeatAfterCount}
                      disabled={repeatOnDate}
                    />
                    <p>Occurrences</p>
                  </div>
                </div>
              </div>

              <div className={styles.availabilitySection}>
                <Stack distribution="trailing">
                  <Button onClick={handleCancelButton}>Cancel</Button>
                </Stack>
              </div>
            </div>
          )}
        </Scrollable>
        <div className={`${styles.footer} ${mobileView ? styles.footerMobile : ''}`}>
          {!mobileView && <div className={styles.divider} />}
          <div className={styles.buttonWrapper}>
            {viewMode === SessionViewModes.EDIT_SLOT && (
              <div className={styles.deleteSlot}>
                <Button
                  outline
                  destructive
                  disabled={disabled}
                  onClick={handleDeleteClick}
                  loading={deleteLoading}
                >
                  Delete slot
                </Button>
              </div>
            )}

            <Button primary onClick={handleSaveClick} disabled={disabled}>
              Save
            </Button>
          </div>
        </div>
      </div>

      <ChooseEditModeModal
        open={openChooseModeModal}
        onClose={toggleChooseModeModal}
        onConfirm={handleScopeChange}
        deleteMode={deleteChoosing}
      />

      <DeleteSlotConfirm
        open={deleteSlotConfirmOpen}
        onClose={toggleDeleteSlotConfirm}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />

      {loading && <LocalLoader />}
    </Sheet>
  );
};

export default AvailabilityModal;
