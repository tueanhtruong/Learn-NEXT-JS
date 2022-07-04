import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

export const DateFormat = 'MM/DD/YYYY';
export const DateFormatDisplay = 'MMMM DD, YYYY';
export const DateFormatDisplayShort = 'MMM DD, YYYY';

export const TimeFormat = 'HH:mm';

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getDateDisplay = (value: string) => {
  return dayjs(value).format(DateFormat);
};

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getTimeDisplay = (value: string) => {
  return dayjs(value).format(TimeFormat);
};
