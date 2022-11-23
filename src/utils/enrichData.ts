import { Chart, Data } from "../providers/data";

export interface EnrichedChart extends Chart {
  sub?: EnrichedChart[];
  level?: number;
  index?: number;
  priority?: number;
}

export interface EnrichedData extends Data {
  chart: EnrichedChart;
}

export const enrichData = (data: Data): EnrichedData => {
  const enrichedData: EnrichedData = data;

  let counter = 1;
  let index = 0;

  enrichedData.chart.level = counter;
  enrichedData.chart.index = index;
  enrichedData.chart.priority = Math.floor(Math.random() * 3);

  (function flat(sub) {
    if (Array.isArray(sub)) {
      counter++;

      sub.forEach((el) => {
        index++;
        el.level = counter;
        el.index = index;
        el.priority = Math.floor(Math.random() * 3);

        flat(el.sub);
      });
    }
  })(enrichedData.chart.sub);

  return enrichedData;
};
