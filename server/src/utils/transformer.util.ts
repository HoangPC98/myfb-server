import dayjs from 'dayjs';
import { format } from 'path/win32';
import {
  MLS_DAY,
  MLS_HOUR,
  MLS_MINUTE,
  MLS_SECOND,
} from 'src/constants/datetime.constant';
import { TypeDateTime } from 'src/types/enum-types/common.enum';

export const transformWhereQuery = (
  whereQueryObject: any,
  schemaAlias: boolean,
) => {
  // if(schemaAlias){

  // }
  const stringQueryArr = Object.keys(whereQueryObject);
  const paramQueryArr = Object.values(whereQueryObject);
  let stringQuery = '';
  const paramQuery = {};
  for (let i = 0; i < stringQueryArr.length; i++) {
    if (i !== 0) stringQuery += ' AND ';
    stringQuery += `${stringQueryArr[i]} = :${stringQueryArr[i]}`;
    paramQuery[`${stringQueryArr[i]}`] = paramQueryArr[i];
  }
  console.log('transform Where', { stringQuery, paramQuery });
  return { stringQuery, paramQuery };
};

export const transformDateTime = (timestamp, typeDateTime: TypeDateTime) => {
  let format: string;
  switch (typeDateTime) {
    case TypeDateTime.Relative:
      format = formatRelativeTime(timestamp);
      break;
  }
  return format;
};

const formatRelativeTime = (timestamp): string => {
  let formated: string;
  const datetime = new Date(timestamp);
  const now = new Date();
  const untilNow = now.getTime() - datetime.getTime();
  console.log('EOEOEO', datetime.getDate(), now.getDate(), untilNow, MLS_DAY);

  switch (true) {
    case untilNow < MLS_MINUTE:
      formated = `${Math.round(untilNow / MLS_SECOND)} seconds ago`;
      break;
    case untilNow < MLS_HOUR:
      formated = `${Math.round(untilNow / MLS_MINUTE)} minutes ago`;
      break;

    case datetime.getDate() === now.getDate() && untilNow < MLS_DAY:
      formated = `${Math.round(untilNow / MLS_HOUR)} hours ago`;
      break;

    case datetime.getDate() !== now.getDate() && untilNow < MLS_DAY:
      formated = `Yester day at ${dayjs(datetime).format('HH:mm')}`;
      break;
    case untilNow > MLS_DAY:
      formated = `${dayjs(datetime).format('DD-MM-YYYY HH:mm')}`;
      break;
  }
  console.log('FORMARRR', formated);
  return formated;
};
