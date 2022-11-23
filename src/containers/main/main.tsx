import { FC } from "react";
import { LabelList, TaskList } from "../../components";
import "./main.scss";

const Main: FC = () => (
  <main className="main">
    <LabelList />
    <TaskList />
    <div className="main__shadow-box"></div>
  </main>
);

export default Main;
