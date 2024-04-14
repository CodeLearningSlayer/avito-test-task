import { pluralize } from "./pluralize";

export const convertDuration = (mins: number) => {
  const hours = Math.floor(mins/60);
  const minutes = mins % 60;
  return `${hours} ${pluralize(hours, {
    oneTime: "час",
    fiveTimes: "часов", 
    twoTimes: "часа"
  })} ${minutes} ${pluralize(minutes, {
    oneTime: "минута",
    twoTimes: "минуты",
    fiveTimes: "минут"
  })}`;
}
