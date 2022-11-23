import { createContext, FC, ReactNode, useState } from "react";
import {
  DisplayTaskElements,
  enrichData,
  EnrichedData,
  flatTasks,
  sortTasksByDate,
  taskListMapper,
  Tasks,
} from "../../utils";

export interface Chart {
  id: number;
  period_end: string;
  period_start: string;
  sub?: Chart[];
  title: string;
}

export interface Data {
  chart: Chart;
  period: string;
  project: string;
}

interface DataContext {
  data?: EnrichedData;
  displayTaskElements?: DisplayTaskElements;
  tasks?: Tasks;
  sortedTasksByDate?: Tasks;
  loadData: () => Promise<void>;
}

interface Props {
  children?: ReactNode;
}

export const Context = createContext<DataContext>({
  loadData: async () => undefined,
});

const DataProvider: FC<Props> = ({ children }) => {
  const [data, setData] = useState<EnrichedData>();
  const [displayTaskElements, setDisplayTaskElements] = useState<DisplayTaskElements>();
  const [tasks, setTasks] = useState<Tasks>();
  const [sortedTasksByDate, setSortedTasksByDate] = useState<Tasks>();

  const loadData = async () => {
    fetch("http://82.202.204.94/tmp/test.php")
      .then((data) => data.json())
      .then((data: Data) => {
        setData(enrichData(data));
        const flatedTasks = flatTasks(data.chart);
        const sortedTasks = sortTasksByDate(flatedTasks);
        setData(data);
        setTasks(flatedTasks);
        setSortedTasksByDate(sortedTasks);
        setDisplayTaskElements(taskListMapper(sortedTasks));
      });
  };

  return (
    <Context.Provider value={{ data, displayTaskElements, tasks, sortedTasksByDate, loadData }}>
      {children}
    </Context.Provider>
  );
};

export default DataProvider;
