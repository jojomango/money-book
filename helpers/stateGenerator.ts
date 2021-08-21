import dayjs from "dayjs";

export const genByDateState = records => {
  const allrecords = records.sort((a,b) => b.createTimeStamp - a.createTimeStamp);
  return allrecords.reduce((acc, record) => {
    const dateString = record.date;
    if(acc.records[dateString]) {
      acc.records[dateString].push(record);
    } else {
      acc.records[dateString] = [record];
      acc.allDates.push(dateString);
    }
    return acc;
  }, {
    records: {},
    allDates: [],
  })
}

export const genByMonthState = records => {
  return records.reduce((acc, record) => {
    const monthString = dayjs(record.createTimeStamp).format('YYYY-MM');
    if(acc.records[monthString]) {
      acc.records[monthString].unshift(record.transaction);
    } else {
      acc.records[monthString] = [record.transaction];
      acc.allMonths.unshift(monthString);
    }
    return acc;
  }, {
    records: {},
    allMonths: [],
  })
}