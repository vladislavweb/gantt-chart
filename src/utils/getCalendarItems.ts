import moment from "moment";
import { Tasks } from "./getAllTasks";
import { sortTasksByDate } from "./sortTasksByDate";

export interface CalendarItem {
  section: string;
  days: string[];
}

export type CalendarItems = CalendarItem[];

export const getCalendarItems = (tasks?: Tasks): CalendarItems => {
  const calendarItems: CalendarItems = [];

  if (tasks) {
    const sortedTasksByDate = sortTasksByDate(tasks);
    const firstDate = new Date(sortedTasksByDate[0].period_start);
    let start = new Date(`${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-01`);

    for (let i = 0; i < 8; i++) {
      const calendarItem: CalendarItem = {
        section: `${moment(start).format("DD MMM")} - ${moment(start)
          .add(6, "day")
          .format("DD MMM")}`,
        days: [],
      };

      for (let e = 0; e < 7; e++) {
        calendarItem.days.push(moment(start).format());

        start = new Date(start.setDate(start.getDate() + 1));
      }

      calendarItems.push(calendarItem);
    }
  }

  return calendarItems;
};
