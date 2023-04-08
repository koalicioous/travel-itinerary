import moment from "moment";

export const toTitleCase = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const calculateDuration = (startDate, endDate) => {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  return duration;
};

export const formatDuration = (duration) => {
  const hours = duration.hours();
  const minutes = duration.minutes();
  return `${hours}h ${minutes}m`;
};
