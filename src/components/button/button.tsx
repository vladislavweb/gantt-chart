import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import "./button.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, Props>(({ children, ...restProps }, ref) => (
  <button {...restProps} ref={ref}>
    {children}
  </button>
));

export default Button;
