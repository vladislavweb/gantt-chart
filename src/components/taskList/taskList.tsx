import { FC, useContext } from "react";
import moment from "moment";
import { DataContext } from "../../providers";
import { taskListMapper } from "../../utils";
import "./taskList.scss";

const TaskList: FC = () => {
  const { data } = useContext(DataContext);

  return (
    <div className="task-list">
      {data &&
        taskListMapper(data).map((taskData) => (
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
    </div>
  );
};

export default TaskList;
