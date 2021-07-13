import dayjs from "dayjs"

export const getDayStr = (date) => {
  let dayStr = dayjs(date).format('ddd');
  const todayStr = dayjs().format('yyyy-mm-dd');
  const yesterdayStr = dayjs().subtract(1, 'day').format('yyyy-mm-dd');
  if (date === todayStr) {
    dayStr = 'Today'
  } else if (date === yesterdayStr) {
    dayStr = 'Yesterday';
  }
  return dayStr;
}