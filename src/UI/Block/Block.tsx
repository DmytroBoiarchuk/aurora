import React, {  ReactNode } from 'react';
import classes from './Block.module.scss';

interface BlockInterface {
    children: ReactNode;
    classNames?: string;
}
function Block({children, classNames=''}:BlockInterface): JSX.Element {
    return (
        <div className={`${classes.blockStyle} ${classNames}`}>
            {children}
        </div>
    );
}

export default Block;
