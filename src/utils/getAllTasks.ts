import { Chart } from "../providers/data/data";

export type Tasks = Omit<Chart, "sub">[];

export const getAllTasks = (data?: Chart): Tasks => {
  if (!data) {
    return [];
  }

  const tasks: Tasks = [];

  const { id, period_end, period_start, title } = data;

  tasks.push({ id, period_start, period_end, title });

  (function flat(sub) {
    if (sub) {
      sub.forEach((el) => {
        const { id, period_end, period_start, title } = el;

        tasks.push({ id, period_end, period_start, title });

        if (el.sub && el.sub.length) {
          flat(el.sub);
        }
      });
    }
  })(data.sub);

  return tasks;
};
