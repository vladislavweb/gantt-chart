import { FC, useContext } from "react";
import moment from "moment";
import { DataContext } from "../../providers";
import "./taskList.scss";

const CELL_WIDTH = 22;
const MARGIN_TOP = 40;
const CELL_PADDING = 11;
const TASK_HEADER_HEIGHT = 48;

const TaskList: FC = () => {
  const { displayTaskElements, tasks, sortedTasksByDate } = useContext(DataContext);

  return (
    <div className="task-list">
      {displayTaskElements &&
        displayTaskElements.map((taskData) => (
          <div className="task-element" key={taskData.section}>
            <div className="task-element__section">{taskData.section}</div>

            <div className="task-element__days">
              {taskData.days.map((day) => (
                <div className="task-element__days__day" key={day}>
                  {moment(day).format("D")}
                </div>
              ))}
            </div>

            <div className="task-element__cells">
              {taskData.days.map((day) => (
                <div className="task-element__cells__cell" key={day}></div>
              ))}
            </div>
          </div>
        ))}

      {tasks &&
        sortedTasksByDate &&
        tasks.map((task, index) => {
          const SMALLEST_DATE = sortedTasksByDate[0].period_start;

          const START_OF_THE_MONTH = moment(SMALLEST_DATE)
            .add(Number(moment(SMALLEST_DATE).format("D")) * -1 + 1, "day")
            .format();

          const DIFFERENCE_IN_DAYS = moment(task.period_start).diff(START_OF_THE_MONTH, "days");

          const TASK_DURATION = moment(task.period_end).diff(task.period_start, "day") + 1;

          return (
            <div
              className="task-list__task-duration"
              style={{
                top: MARGIN_TOP * (index + 1) + CELL_PADDING + TASK_HEADER_HEIGHT,
                left: CELL_WIDTH * DIFFERENCE_IN_DAYS,
                width: CELL_WIDTH * TASK_DURATION || CELL_WIDTH,
              }}
            ></div>
          );
        })}
    </div>
  );
};

export default TaskList;
