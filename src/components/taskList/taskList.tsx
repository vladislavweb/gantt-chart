import { FC, useContext } from "react";
import { DataContext } from "../../providers";
import { TaskDuration } from "./taskDuration";
import "./taskList.scss";

const TaskList: FC = () => {
  const { data, calendarItems } = useContext(DataContext);

  return (
    <div className="task-list">
      {calendarItems &&
        calendarItems.map((calendarItem) => (
          <div className="task-element" key={calendarItem.section}>
            <div className="task-element__section">{calendarItem.section}</div>

            <div className="task-element__days">
              {calendarItem.days.map((day) => (
                <div className="task-element__days__day" key={`${calendarItem.section}-${day}`}>
                  {day}
                </div>
              ))}
            </div>

            <div className="task-element__cells">
              {calendarItem.days.map((day) => (
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
