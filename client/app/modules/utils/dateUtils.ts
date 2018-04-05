import moment = require('moment');

export enum DateFormats {
  YYYYMMDD = 'YYYY#DLM#MM#DLM#DD',
}

export enum Delimiters {
  DASH = '-',
  SLASH = '/',
  SPACE = ' ',
}

const DLM_REGEX = /#DLM#/g;

function formatDate(format: DateFormats, delimiter: Delimiters = Delimiters.DASH) {
  return (date: any): string => {
    if (!date) {
      return '';
    }
    return moment(date).format(format.replace(DLM_REGEX, delimiter));
  };
}

function parseDate(format: DateFormats, delimiter: Delimiters = Delimiters.DASH) {
  return (date: any): moment.Moment => {
    if (!date) {
      return moment(null);
    }
    return moment(date, format.replace(DLM_REGEX, delimiter));
  };
}

export {
  formatDate,
  parseDate,
};
