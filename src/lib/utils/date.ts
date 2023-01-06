import dayjs from "dayjs";

export const formatUTC = (timestamp: string) => {
  const localDate = timestamp.concat("Z");
  return dayjs(localDate).utc().format("MMM DD, YYYY, h:mm:ss A [(UTC)]");
};

export const dateFromNow = (timestamp: string) => {
  const localDate = timestamp.concat("Z");
  return dayjs(localDate).fromNow();
};

export const parseDate = (date: string) => new Date(`${date}Z`);

export const parseDateOpt = (dateOpt: string | undefined): Date | undefined =>
  dateOpt === undefined ? dateOpt : parseDate(dateOpt);
