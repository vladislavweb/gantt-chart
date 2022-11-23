import moment from "moment";
import { Data } from "../providers/data/data";
import { flatTasks, Tasks } from "./flatTasks";
import { sortTasksByDate } from "./sortTasksByDate";

export interface DisplayTaskElement {
  section: string;
  days: string[];
}

export type DisplayTaskElements = DisplayTaskElement[];

export const taskListMapper = (sortedTasksByDate?: Tasks) => {
  const result: DisplayTaskElements = [];

  if (sortedTasksByDate) {
    const firstDate = new Date(sortedTasksByDate[0].period_start);
    let start = new Date(`${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-01`);

    for (let i = 0; i < 8; i++) {
      const element: DisplayTaskElement = {
        section: `${moment(start).format("DD MMM")} - ${moment(start)
          .add(6, "day")
          .format("DD MMM")}`,
        days: [],
      };

      for (let e = 0; e < 7; e++) {
        element.days.push(moment(start).format());

        start = new Date(start.setDate(start.getDate() + 1));
      }

      result.push(element);
    }
  }

  return result;
};
