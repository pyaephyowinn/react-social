const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

// accept auto createdAt time from mongoose and return formatted time for post
export const formatTime = (createdDate) => {
  let time;
  const now = Date.now();
  const createdDateMilli = new Date(createdDate).getTime();
  const postAge = now - createdDateMilli;

  if (postAge < 60 * 60 * 1000) {
    const minutes = (postAge / (60 * 1000)).toFixed();
    time = minutes + " min";
  } else if (postAge < 24 * 60 * 60 * 1000) {
    const hours = (postAge / (60 * 60 * 1000)).toFixed();
    time = hours + "h";
  } else if (postAge < 365 * 24 * 60 * 60 * 1000) {
    const month = MONTHS[new Date(createdDate).getMonth()];
    const date = new Date(createdDate).getDate();
    time = month + " " + date;
  } else {
    const year = new Date(createdDate).getFullYear();
    const month = MONTHS[new Date(createdDate).getMonth()];
    const date = new Date(createdDate).getDate();
    time = month + " " + date + " " + year;
  }
  return time;
}