import { FC, useCallback, useEffect, useState } from "react";
import { Chart } from "../../../providers";
import "./labelElement.scss";

import CollapseArrow from "../../../assets/images/svg/collapse_arrow.svg";

interface Props {
  data: Chart;
}

const LabelElement: FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = useCallback(() => {
    setIsOpen((value) => !value);
  }, [isOpen]);

  return (
    <>
      <li className="label-element">
        {data.sub && (
          <button className="label-element__collapse-button" onClick={toggle}>
            <img src={CollapseArrow} alt="collapse button" />
          </button>
        )}

        {data.title && (
          <>
            {/* <img className="label-element__icon" src="" alt="label icon" /> */}

            <span className="label-element__counter">{data.sub?.length || 0}</span>

            <span className="label-element__title">{data.title}</span>
          </>
        )}
      </li>

      {isOpen && data.sub?.map((elementData) => <LabelElement data={elementData} />)}
    </>
  );
};

export default LabelElement;
