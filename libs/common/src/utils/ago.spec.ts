import ago from '@doorward/common/utils/ago';
import * as moment from 'moment';
import configureLang from '@doorward/common/lang/backend.config';

describe('ago()', () => {
  let date;
  beforeAll(async () => {
    await configureLang(null, '../../../../locales');

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return 1609668279101;
    });
    // Sunday 3rd January 2021 at 13:04:39

    date = moment(Date.now());
  });

  it('should check max unit YEAR', () => {
    expect(ago(date.clone(), 'year')).toEqual('this year');
    expect(ago(date.clone().add(6, 'months'), 'year')).toEqual('this year');
    expect(ago(date.clone().add(12, 'months'), 'year')).toEqual('next year');
    expect(ago(date.clone().add(24, 'months'), 'year')).toEqual('in 2 years');
    expect(ago(date.clone().add(35, 'months'), 'year')).toEqual('in 3 years');

    expect(ago(date.clone().subtract(6, 'months'), 'year')).toEqual('last year');
    expect(ago(date.clone().subtract(12, 'months'), 'year')).toEqual('last year');
    expect(ago(date.clone().subtract(24, 'months'), 'year')).toEqual('2 years ago');
    expect(ago(date.clone().subtract(35, 'months'), 'year')).toEqual('3 years ago');
  });

  it('should check max unit MONTH', () => {
    expect(ago(date.clone(), 'month')).toEqual('this month');

    expect(ago(date.clone().add(1, 'weeks'), 'month')).toEqual('this month');
    expect(ago(date.clone().add(6, 'weeks'), 'month')).toEqual('next month');
    expect(ago(date.clone().add(6, 'months'), 'month')).toEqual('in 6 months');
    expect(ago(date.clone().add(12, 'months'), 'month')).toEqual('next year');
    //
    expect(ago(date.clone().subtract(1, 'weeks'), 'month')).toEqual('last month');
    expect(ago(date.clone().subtract(6, 'weeks'), 'month')).toEqual('last month');
    expect(ago(date.clone().subtract(6, 'months'), 'month')).toEqual('6 months ago');
    expect(ago(date.clone().subtract(12, 'months'), 'month')).toEqual('last year');
  });

  it('should check max unit WEEKS', () => {
    expect(ago(date.clone(), 'week')).toEqual('this week');

    expect(ago(date.clone().add(6, 'day'), 'week')).toEqual('this week');
    expect(ago(date.clone().add(7, 'day'), 'week')).toEqual('next week');
    expect(ago(date.clone().add(14, 'day'), 'week')).toEqual('in 2 weeks');
    expect(ago(date.clone().add(50, 'day'), 'week')).toEqual('next month');
    // //

    expect(ago(date.clone().subtract(1, 'day'), 'week')).toEqual('last week');
    expect(ago(date.clone().subtract(7, 'day'), 'week')).toEqual('last week');
    expect(ago(date.clone().subtract(14, 'day'), 'week')).toEqual('2 weeks ago');
    expect(ago(date.clone().subtract(5, 'week'), 'week')).toEqual('last month');
    expect(ago(date.clone().subtract(50, 'day'), 'week')).toEqual('2 months ago');
  });

  it('should check max unit DAYS', () => {
    expect(ago(date.clone(), 'day')).toEqual('today');

    expect(ago(date.clone().add(12, 'hour'), 'day')).toEqual('tomorrow');
    expect(ago(date.clone().add(24, 'hour'), 'day')).toEqual('tomorrow');
    expect(ago(date.clone().add(37, 'hour'), 'day')).toEqual('in 2 days');
    expect(ago(date.clone().add(8, 'day'), 'day')).toEqual('next week');
    expect(ago(date.clone().add(5, 'week'), 'day')).toEqual('next month');

    expect(ago(date.clone().subtract(12, 'hour'), 'day')).toEqual('today');
    expect(ago(date.clone().subtract(24, 'hour'), 'day')).toEqual('yesterday');
    expect(ago(date.clone().subtract(50, 'hour'), 'day')).toEqual('2 days ago');
    expect(ago(date.clone().subtract(8, 'day'), 'day')).toEqual('last week');
    expect(ago(date.clone().subtract(5, 'week'), 'day')).toEqual('last month');
  });

  it('should check max unit HOURS', () => {
    expect(ago(date.clone(), 'hour')).toEqual('within the hour');

    expect(ago(date.clone().add(53, 'minutes'), 'hour')).toEqual('within the hour');
    expect(ago(date.clone().add(1, 'hour').add(55, 'minutes'), 'hour')).toEqual('in 2 hours');
    expect(ago(date.clone().add(2, 'hour'), 'hour')).toEqual('in 2 hours');
    expect(ago(date.clone().add(12, 'hour'), 'hour')).toEqual('in 12 hours');
    expect(ago(date.clone().add(24, 'hour'), 'hour')).toEqual('tomorrow');
    expect(ago(date.clone().add(4, 'day'), 'hour')).toEqual('in 4 days');
    expect(ago(date.clone().add(8, 'day'), 'hour')).toEqual('next week');
    expect(ago(date.clone().add(5, 'week'), 'hour')).toEqual('next month');
    //

    expect(ago(date.clone().subtract(59, 'minutes'), 'hour')).toEqual('within the hour');
    expect(ago(date.clone().subtract(1, 'hour').subtract(20, 'minutes'), 'hour')).toEqual('an hour ago');
    expect(ago(date.clone().subtract(2, 'hour'), 'hour')).toEqual('2 hours ago');
    expect(ago(date.clone().subtract(12, 'hour'), 'hour')).toEqual('12 hours ago');
    expect(ago(date.clone().subtract(24, 'hour'), 'hour')).toEqual('yesterday');
    expect(ago(date.clone().subtract(4, 'day'), 'hour')).toEqual('4 days ago');
    expect(ago(date.clone().subtract(8, 'day'), 'hour')).toEqual('last week');
    expect(ago(date.clone().subtract(5, 'week'), 'hour')).toEqual('last month');
  });

  it('should check max unit in MINUTES', () => {
    expect(ago(date.clone(), 'minute')).toEqual('just now');

    expect(ago(date.clone().add(59, 'second'), 'minute')).toEqual('just now');
    expect(ago(date.clone().add(90, 'second'), 'minute')).toEqual('in 2 minutes');
    expect(ago(date.clone().add(180, 'second'), 'minute')).toEqual('in 3 minutes');
    expect(ago(date.clone().add(18000, 'second'), 'minute')).toEqual('in 5 hours');
    expect(ago(date.clone().add(5000, 'minutes'), 'minute')).toEqual('in 3 days');
    expect(ago(date.clone().add(8, 'day'), 'minute')).toEqual('next week');
    expect(ago(date.clone().add(5, 'week'), 'minute')).toEqual('next month');
    expect(ago(date.clone().add(12, 'month'), 'minute')).toEqual('next year');

    expect(ago(date.clone().subtract(59, 'second'), 'minute')).toEqual('just now');
    expect(ago(date.clone().subtract(90, 'second'), 'minute')).toEqual('2 minutes ago');
    expect(ago(date.clone().subtract(180, 'second'), 'minute')).toEqual('3 minutes ago');
    expect(ago(date.clone().subtract(18000, 'second'), 'minute')).toEqual('5 hours ago');
    expect(ago(date.clone().subtract(5000, 'minutes'), 'minute')).toEqual('3 days ago');
    expect(ago(date.clone().subtract(8, 'day'), 'minute')).toEqual('last week');
    expect(ago(date.clone().subtract(5, 'week'), 'minute')).toEqual('last month');
    expect(ago(date.clone().subtract(12, 'month'), 'minute')).toEqual('last year');
  });

  it('should check max unit in SECONDS', () => {
    expect(ago(date.clone(), 'second')).toEqual('just now');

    expect(ago(date.clone().add(1, 'second'), 'second')).toEqual('in a second');
    expect(ago(date.clone().add(59, 'second'), 'second')).toEqual('in 59 seconds');
    expect(ago(date.clone().add(90, 'second'), 'second')).toEqual('in 2 minutes');
    expect(ago(date.clone().add(180, 'second'), 'second')).toEqual('in 3 minutes');
    expect(ago(date.clone().add(18000, 'second'), 'second')).toEqual('in 5 hours');
    expect(ago(date.clone().add(5000, 'minutes'), 'second')).toEqual('in 3 days');
    expect(ago(date.clone().add(8, 'day'), 'second')).toEqual('next week');
    expect(ago(date.clone().add(5, 'week'), 'second')).toEqual('next month');
    expect(ago(date.clone().add(12, 'month'), 'second')).toEqual('next year');
    //
    expect(ago(date.clone().subtract(1, 'second'), 'second')).toEqual('a second ago');
    expect(ago(date.clone().subtract(59, 'second'), 'second')).toEqual('59 seconds ago');
    expect(ago(date.clone().subtract(90, 'second'), 'second')).toEqual('2 minutes ago');
    expect(ago(date.clone().subtract(180, 'second'), 'second')).toEqual('3 minutes ago');
    expect(ago(date.clone().subtract(18000, 'second'), 'second')).toEqual('5 hours ago');
    expect(ago(date.clone().subtract(5000, 'minutes'), 'second')).toEqual('3 days ago');
    expect(ago(date.clone().subtract(8, 'day'), 'second')).toEqual('last week');
    expect(ago(date.clone().subtract(5, 'week'), 'second')).toEqual('last month');
    expect(ago(date.clone().subtract(12, 'month'), 'second')).toEqual('last year');
  });
});
