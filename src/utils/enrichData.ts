import { Chart, Data } from "../providers/data";

export interface EnrichedChart extends Chart {
  sub?: EnrichedChart[];
  level?: number;
}

export interface EnrichedData extends Data {
  chart: EnrichedChart;
}

export const enrichData = (data: Data): EnrichedData => {
  const enrichedData: EnrichedData = data;

  let counter = 1;

  enrichedData.chart.level = counter;

  (function flat(sub) {
    if (Array.isArray(sub)) {
      counter++;
      sub.forEach((el) => {
        el.level = counter;

        flat(el.sub);
      });
    }
  })(enrichedData.chart.sub);

  return enrichedData;
};
