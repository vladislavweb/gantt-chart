import { FC, useContext } from "react";
import { Button } from "../../components";
import { DataContext } from "../../providers";
import "./header.scss";

import DownloadArrow from "../../assets/images/svg/download_arrow.svg";

const Header: FC = () => {
  const { data } = useContext(DataContext);

  return (
    <header className="header">
      <div className="header__title">
        <span>{data ? `${data.project} / ${data.period}` : ""}</span>
      </div>

      <div className="header__button-wrapper">
        <Button className="download-button">
          <img className="download-button__icon" src={DownloadArrow} alt="download arrow" />
          <span className="download-button__text">Export</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
