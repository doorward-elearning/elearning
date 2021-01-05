import translate from '@doorward/common/lang/translate';
const moment = require('moment');
import { Moment } from 'moment';

const Values = {
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

const format = (now: Moment, date: Moment, max: Units, diff: number, future: boolean, unitIndex: number) => {
  const unit = units[unitIndex];
  const currentUnitValue = now.get(unit);
  let unitDiff = 0;
  if (unitIndex >= 4) {
    unitDiff = Math.abs(diff) / Values[unit];
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

  if (max === unit || Math.floor(Math.abs(diff) / Values[unit]) > 0 || unitIndex === units.length - 1) {
    if (unitDiff === 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return translate(`${unit}_0`);
    } else if (unitDiff != 1) {
      unitDiff = Math.round(Math.abs(diff) / Values[unit]);
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

export default ago;
