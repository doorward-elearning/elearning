import translate from '@doorward/common/lang/translate';
import { Moment } from 'moment';

const moment = require('moment');

export const TimeValues = {
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000,
  week: 604800000,
  month: 2592000000,
  year: 31104000000,
};

export type Units = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

const units: Array<Units> = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

const unitValues = {
  month: 12,
  week: 4,
  day: 7,
  hour: 24,
  minute: 60,
  second: 60,
};

const numUnits = (unitIndex: number, diff: number, date: Moment, now: Moment, future: boolean) => {
  const unit = units[unitIndex];
  const currentUnitValue = now.get(unit);
  let unitDiff = 0;
  if (unitIndex >= 4) {
    unitDiff = Math.abs(diff) / TimeValues[unit];
    if (unitDiff > 1) {
      unitDiff = Math.round(unitDiff);
    } else {
      unitDiff = Math.floor(unitDiff);
    }
  } else {
    unitDiff = currentUnitValue - date.get(unit);

    if (future && unitDiff > 0) {
      unitDiff = currentUnitValue - unitValues[unit] - date.get(unit);
    }
    if (!future && unitDiff < 0) {
      unitDiff = currentUnitValue + unitValues[unit] - date.get(unit);
    }

    unitDiff = Math.abs(unitDiff) || 0;
  }

  return unitDiff;
};

const formatPrecise = (now: Moment, date: Moment, diff: number, future: boolean): string => {
  if (Math.abs(diff) / TimeValues.minute < 1) {
    return translate(future ? 'minute_0' : 'minute_0');
  }

  if (Math.abs(diff) / TimeValues.hour < 1) {
    return translate(future ? 'minuteFutureWithCount' : 'minuteAgoWithCount', {
      count: Math.ceil(Math.abs(diff) / TimeValues.minute),
    });
  }

  if (Math.abs(diff) / TimeValues.day < 1) {
    return moment(date).format('HH:mm');
  }

  if (Math.abs(diff) / TimeValues.week < 1) {
    const daysCount = numUnits(3, diff, date, now, future);
    if (daysCount === 1) {
      return translate(future ? 'dayFutureWithCount' : 'dayAgoWithCount', { count: 1 });
    }
    return moment(date).format('ddd');
  }

  if (Math.abs(diff) / TimeValues.year < 1) {
    return moment(date).format('MMM D');
  }

  return moment(date).format('D/MMM/yyyy');
};

const format = (now: Moment, date: Moment, max: Units, diff: number, future: boolean, unitIndex: number) => {
  const unit = units[unitIndex];

  let unitDiff = numUnits(unitIndex, diff, date, now, future);

  if (max === unit || Math.floor(Math.abs(diff) / TimeValues[unit]) > 0 || unitIndex === units.length - 1) {
    if (unitDiff === 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return translate(`${unit}_0`);
    } else if (unitDiff != 1) {
      unitDiff = Math.round(Math.abs(diff) / TimeValues[unit]);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return translate(future ? `${unit}FutureWithCount` : `${unit}AgoWithCount`, { count: unitDiff });
  }
  return format(now, date, max, diff, future, unitIndex + 1);
};

const ago = (date: Date | Moment, max: Units = 'second'): string => {
  const now = moment(Date.now());
  const diff = moment(now).toDate().getTime() - moment(date).toDate().getTime();

  return format(now, moment(date), max, Math.abs(diff), diff < 0, 0);
};

export const agoPrecise = (date: Date | Moment) => {
  const now = moment(Date.now());
  const diff = moment(now).toDate().getTime() - moment(date).toDate().getTime();

  return formatPrecise(now, moment(date), Math.abs(diff), diff < 0);
};

export default ago;
