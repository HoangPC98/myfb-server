const MAX_OT_HOURS_WEEKDAY = 4;

const MIN_OT_HOURS_REGISTER = 0.25;

const MAX_OT_HOURS_WEEKEND = 12;

const MAX_OT_HOURS_A_WEEK = 32;

const MAX_OT_HOURS_A_MONTH = 40;

const MAX_OT_HOURS_A_YEAR = 300;

const LATEST_WORKING_TIME = 19;

const MIN_REMOTE_HOURS_REGISTER = 0.5;

const DELAY_TIMER_NOTIFY_FORGOT_CHECKOUT = 10 * 60 * 1000;

const NUMBER_OF_MINUTE_CHECK_WOKRTIME_RECORD_NOT_CHECKOUT_YET = 10 * 60 * 1000;

const StartWorkingHour = 8;

const EndWorkingHour = 19;

const StartLunchHour = 12;

const EndLunchHour = 13;

const DayToMilisecond = 1000 * 3600 * 24;

const HourToMilisecond = 1000 * 3600;

const ListManualHoliday = ['01/01', '30/04', '01/05', '02/09'];

export const commonConstants = {
  MAX_OT_HOURS_WEEKDAY,
  MAX_OT_HOURS_WEEKEND,
  MIN_OT_HOURS_REGISTER,
  MAX_OT_HOURS_A_WEEK,
  MAX_OT_HOURS_A_MONTH,
  MAX_OT_HOURS_A_YEAR,
  LATEST_WORKING_TIME,
  MIN_REMOTE_HOURS_REGISTER,
  DELAY_TIMER_NOTIFY_FORGOT_CHECKOUT,
  NUMBER_OF_MINUTE_CHECK_WOKRTIME_RECORD_NOT_CHECKOUT_YET,
  DayToMilisecond,
  HourToMilisecond,
  StartWorkingHour,
  EndWorkingHour,
  StartLunchHour,
  EndLunchHour,
  ListManualHoliday,
};
