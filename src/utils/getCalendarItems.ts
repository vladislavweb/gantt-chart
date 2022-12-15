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
    const FIRST_DATE = moment(sortedTasksByDate[0].period_start);

    const DAY_OF_MONTH = FIRST_DATE.date();

    const START_DATE = moment(FIRST_DATE)
      .add(DAY_OF_MONTH * -1 + 1)
      .format();

    let daysCounter = 0;

    for (let i = 0; i < 8; i++) {
      const from = moment(START_DATE)
        .add(i * 7, "day")
        .format("DD MMM");

      const to = moment(START_DATE)
        .add(DAY_OF_MONTH * -1 - 1)
        .add((i + 1) * 7 - 1, "day")
        .format("DD MMM");

      const section = `${from} - ${to}`;

      const calendarItem: CalendarItem = {
        section,
        days: [],
      };

      for (let e = 0; e < 7; e++) {
        const NEXT_START_DATE = moment(START_DATE).add(daysCounter, "d").format("D");

        calendarItem.days.push(NEXT_START_DATE);

        daysCounter++;
      }

      calendarItems.push(calendarItem);
    }
  }

  return calendarItems;
};
