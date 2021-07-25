import dayjs from "dayjs"

const DATE_FORMAT = 'YYYY-MM-DD'

const getTodayStr = () => dayjs().format(DATE_FORMAT);
const getYesterdayStr = () => dayjs().subtract(1, 'day').format(DATE_FORMAT);


export const getDayStr = (date) => {
  let dayStr = dayjs(date).format('ddd');
  const todayStr = getTodayStr();
  const yesterdayStr = getYesterdayStr();
  if (date === todayStr) {
    dayStr = 'Today'
  } else if (date === yesterdayStr) {
    dayStr = 'Yesterday';
  }
  return dayStr;
}

export const getDateStrMs = (timestampMs) => {
  let dateStr = dayjs(timestampMs).format(DATE_FORMAT);
  const todayStr = getTodayStr();
  const yesterdayStr = getYesterdayStr();
  if (dateStr === todayStr) {
    dateStr = 'Today'
  } else if (dateStr === yesterdayStr) {
    dateStr = 'Yesterday';
  }
  return dateStr;
}