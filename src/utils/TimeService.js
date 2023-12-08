import moment from 'moment';
import 'moment/locale/fr';
import I18n from 'i18n-js';

export function getMonth() {
  // get the index of the month in the year => start at index 0 for january
  return moment().month();
}

// get an hour in hh:mm format and return number of minutes from midnight
// for example 1:30 will return 90
export function formatToMinFromMidnight(hour) {
  const hours = hour?.split(':')[0];
  const mins = hour?.split(':')[1];
  const res = parseFloat(hours) * 60 + parseFloat(mins);
  return res;
}

// get minutes from midnight and return hour in hh:mm
// for example 90 will return 1:30
export function formatFromMinFromMidnight(mins) {
  if (mins !== null) {
    const midnight = new Date().setHours(0, 0, 0, 0);
    const date = new Date(midnight).setMinutes(mins);
    const res = `${new Date(date).getHours().toString()}:${new Date(date)
      .getMinutes()
      .toString()
      .padStart(2, 0)}`;
    return res;
  } else {
    return '-- : --';
  }
}

// function to display duration from a past date from now
// for example a date yesterday will display "1j" and a date today but 2 hours ago will display "2h"
export function displayDayFromNow(date) {
  let now = new Date();
  let compDate = new Date(date);
  let diffDay = Math.floor(
    (now.getTime() - compDate.getTime()) / (24 * 60 * 60 * 1000),
  ); // get the difference between today(at 00:00:00) and the date
  if (diffDay <= 0) {
    // means it's today
    const nbOfHour = (now.getTime() - compDate.getTime()) / (60 * 60 * 1000);
    return `${Math.floor(nbOfHour)}${I18n.t('time.hourShort')}`;
  } else if (diffDay < 7) {
    // means it's less than 1 week ago
    return `${diffDay}${I18n.t('time.dayShort')}`;
  } else if (diffDay < 31) {
    // means it's less than 1 month ago
    return `${Math.floor(diffDay / 7)} ${I18n.t('time.weekShort')}`;
  } else if (diffDay < 365) {
    // means it's less than 1 year ago
    return `${Math.floor(diffDay / 31)}${I18n.t('time.monthShort')}`;
  } else if (diffDay > 365) {
    // means it's less than 1 year ago
    return `${Math.floor(diffDay / 365)}${I18n.t('time.yearShort')}`;
  }
}
