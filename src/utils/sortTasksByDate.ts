import { Tasks } from "./getAllTasks";

export const sortTasksByDate = (tasks: Tasks): Tasks => {
  return tasks.sort((a, b) => {
    return new Date(a.period_start).getTime() < new Date(b.period_start).getTime() ? -1 : 1;
  });
};
