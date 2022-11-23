import { Chart } from "../providers/data/data";

export type Tasks = Omit<Chart, "sub">[];

export const flatTasks = (data?: Chart) => {
  if (!data) {
    return [];
  }

  const result: Tasks = [];

  const { id, period_end, period_start, title } = data;

  result.push({ id, period_start, period_end, title });

  (function flat(sub) {
    if (sub) {
      sub.forEach((el) => {
        const { id, period_end, period_start, title } = el;

        result.push({ id, period_end, period_start, title });

        if (el.sub && el.sub.length) {
          flat(el.sub);
        }
      });
    }
  })(data.sub);

  return result;
};
