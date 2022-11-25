import { createContext, FC, ReactNode, useCallback, useState } from "react";
import {
  CalendarItems,
  enrichData,
  EnrichedData,
  getAllTasks,
  getCalendarItems,
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
  calendarItems?: CalendarItems;
  tasks?: Tasks;
  hiddenLevels: number[];
  loadData: () => Promise<void>;
  toggleLevel: (id: number) => void;
}

interface Props {
  children?: ReactNode;
}

export const Context = createContext<DataContext>({
  hiddenLevels: [],
  toggleLevel: () => undefined,
  loadData: async () => undefined,
});

const DataProvider: FC<Props> = ({ children }) => {
  const [data, setData] = useState<EnrichedData>();
  const [calendarItems, setCalendarItems] = useState<CalendarItems>();
  const [tasks, setTasks] = useState<Tasks>();
  const [hiddenLevels, setHiddenLevels] = useState<number[]>([]);

  const loadData = async () => {
    fetch("http://82.202.204.94/tmp/test.php")
      .then((data) => data.json())
      .then((data: Data) => {
        setData(enrichData(data));
        const allTasks = getAllTasks(data.chart);
        setData(data);
        setTasks(allTasks);
        setCalendarItems(getCalendarItems(allTasks));
      });
  };

  const toggleLevel = useCallback(
    (id: number) => {
      if (hiddenLevels.includes(id)) {
        const index = hiddenLevels.findIndex((el) => el === id);

        if (index >= 0) {
          setHiddenLevels((value) => [...value.slice(0, index), ...value.slice(index + 1)]);
        }
      } else {
        setHiddenLevels((value) => [...value, id]);
      }
    },
    [hiddenLevels],
  );

  return (
    <Context.Provider
      value={{
        data,
        calendarItems,
        tasks,
        hiddenLevels,
        loadData,
        toggleLevel,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default DataProvider;
