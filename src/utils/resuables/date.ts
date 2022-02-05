const setDate = (date: Date, secs = 0, mins = 0, hours = 0, days = 0) => {
  const sec = date.getSeconds() + secs;
  const min = date.getMinutes() + mins;
  const hour = date.getHours() + hours;
  const day = date.getDate() + days;
  date.setSeconds(sec);
  date.setMinutes(min);
  date.setHours(hour);
  date.setDate(day);
  return date;
};

export { setDate };
