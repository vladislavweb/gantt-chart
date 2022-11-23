import { FC, useContext } from "react";
import { DataContext } from "../../../providers";
import { EnrichedChart } from "../../../utils";
import "./labelElement.scss";

import CollapseArrow from "../../../assets/images/svg/collapse_arrow.svg";
import FirstLevelIcon from "../../../assets/images/svg/level_1_icon.svg";
import SecondLevelIcon from "../../../assets/images/svg/level_2_icon.svg";
import ThirdLevelIcon from "../../../assets/images/svg/level_3_icon.svg";
import FourthLevelIcon from "../../../assets/images/svg/level_4_icon.svg";
import FifthLevelIcon from "../../../assets/images/svg/level_5_icon.svg";

interface Props {
  data: EnrichedChart;
}

const LabelElement: FC<Props> = ({ data }) => {
  const { hiddenLevels, toggleLevel } = useContext(DataContext);
  const { level } = data;

  const getLevelIcon = () => {
    switch (level) {
      case 1: {
        return FirstLevelIcon;
      }
      case 2: {
        return SecondLevelIcon;
      }
      case 3: {
        return ThirdLevelIcon;
      }
      case 4: {
        return FourthLevelIcon;
      }
      default: {
        return FifthLevelIcon;
      }
    }
  };

  return (
    <>
      <li
        className="label-element"
        style={{
          paddingLeft: level ? 20 * level : 20,
        }}
      >
        {data.sub && (
          <button className="label-element__collapse-button" onClick={() => toggleLevel(data.id)}>
            <img src={CollapseArrow} alt="collapse button" />
          </button>
        )}

        {data.title && (
          <>
            <img
              className="label-element__icon"
              src={getLevelIcon()}
              alt="label icon"
              style={{ marginLeft: data.sub ? 0 : 16 }}
            />

            <span className="label-element__counter">{data.sub?.length || 0}</span>

            <span className="label-element__title">{data.title}</span>
          </>
        )}
      </li>

      {!hiddenLevels.includes(data.id) &&
        data.sub?.map((elementData) => <LabelElement data={elementData} />)}
    </>
  );
};

export default LabelElement;
