import { createContext, FC, ReactNode, useState } from "react";
  enrichData,
  EnrichedData,

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

  const loadData = async () => {
    fetch("http://82.202.204.94/tmp/test.php")
      .then((data) => data.json())
      .then((data: Data) => {
        setData(enrichData(data));
      });
  };

  return <Context.Provider value={{ data, loadData }}>{children}</Context.Provider>;
};

export default DataProvider;
