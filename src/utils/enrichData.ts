import { Chart, Data } from "../providers/data";

export interface EnrichedChart extends Chart {
  sub?: EnrichedChart[];
  level?: number;
  index?: number;
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

  (function flat(sub) {
    if (Array.isArray(sub)) {
      counter++;

      sub.forEach((el) => {
        index++;
        el.level = counter;
        el.index = index;

        flat(el.sub);
      });
    }
  })(enrichedData.chart.sub);

  return enrichedData;
};
