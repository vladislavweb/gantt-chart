import { FC, useContext } from "react";
import classNames from "classnames";
import moment from "moment";
import { DataContext } from "../../../providers";
import { EnrichedChart, sortTasksByDate } from "../../../utils";
import "./taskDuration.scss";

const CELL_WIDTH = 22;
const MARGIN_TOP = 40;
const CELL_PADDING = 11;
const TASK_HEADER_HEIGHT = 48;

interface Props {
  data: EnrichedChart;
}

const TaskDuration: FC<Props> = ({ data }) => {
  const { tasks, hiddenLevels } = useContext(DataContext);

  if (!tasks) {
    return null;
  }

  const sortedTasksByDate = sortTasksByDate(tasks);

  const SMALLEST_DATE = sortedTasksByDate[0].period_start;

  const START_OF_THE_MONTH = moment(SMALLEST_DATE)
    .add(Number(moment(SMALLEST_DATE).format("D")) * -1 + 1, "day")
    .format();

  const DIFFERENCE_IN_DAYS = moment(data.period_start).diff(START_OF_THE_MONTH, "days");

  const TASK_DURATION = moment(data.period_end).diff(data.period_start, "day") + 1;

  return (
    <>
      <div
        className="task-duration"
        style={{
          top: MARGIN_TOP * (data.index ? data.index + 1 : 1) + CELL_PADDING + TASK_HEADER_HEIGHT,
          left: CELL_WIDTH * DIFFERENCE_IN_DAYS,
        }}
        key={data.id}
      >
        <div
          className={classNames("task-duration__interval", {
            "task-duration__interval--blue": data.level === 1,
            "task-duration__interval--green": data.level === 3 || data.level === 4,
            "task-duration__interval--yellow": data.level === 2 || data.level === 5,
          })}
          style={{
            width: CELL_WIDTH * TASK_DURATION || CELL_WIDTH,
          }}
        ></div>

        <div className="task-duration__title">{data.title}</div>
      </div>

      {!hiddenLevels.includes(data.id) &&
        data.sub?.map((elementData) => <TaskDuration key={elementData.id} data={elementData} />)}
    </>
  );
};

export default TaskDuration;
