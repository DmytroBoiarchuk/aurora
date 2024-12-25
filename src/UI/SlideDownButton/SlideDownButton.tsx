import { RiArrowDownWideLine, RiArrowUpWideLine } from 'react-icons/ri';
import React, { ButtonHTMLAttributes } from 'react';
import classes from './SlideDownButton.module.scss';

interface SlideDownButtonProps {
  isDropped: boolean;
  toggleDropdown: () => void;
  classNames?: string
}
function SlideDownButton({
  isDropped,
  toggleDropdown,
  children,
  classNames='',
}: SlideDownButtonProps & ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button className={`${classes.moreAboutButton} ${classNames}`} onClick={toggleDropdown}>
      <span>{children}</span>
      {isDropped ? <RiArrowUpWideLine  size={15}/> : <RiArrowDownWideLine size={15} />}
    </button>
  );
}

export default SlideDownButton;
