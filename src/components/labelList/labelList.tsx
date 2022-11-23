import { FC, useContext } from "react";
import { DataContext } from "../../providers";
import { LabelElement } from "./labelElement";
import "./labelList.scss";

const LabelList: FC = () => {
  const { data } = useContext(DataContext);

  return (
    <ul className="label-list">
      <div className="label-list__header">Work Item</div>

      {data && <LabelElement data={data.chart} />}
    </ul>
  );
};

export default LabelList;
