import { FC, useContext } from "react";
import moment from "moment";
import { DataContext } from "../../providers";
import { TaskDuration } from "./taskDuration";
import "./taskList.scss";

const TaskList: FC = () => {
  const { data, displayTaskElements } = useContext(DataContext);

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

      {data && <TaskDuration data={data.chart} />}
    </div>
  );
};

export default TaskList;
