import { FC, HTMLProps, ReactNode, useContext, useEffect } from "react";
import { DataContext } from "../../providers";
import "./layout.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { loadData } = useContext(DataContext);

  useEffect(() => {
    loadData();
  }, []);

  return <div className="layout">{children}</div>;
};

export default Layout;
