import React from 'react';
import classes from './Block.module.scss';

function Block({children, classNames=''}): JSX.Element {
    return (
        <div className={`${classes.blockStyle} ${classNames}`}>
            {children}
        </div>
    );
}

export default Block;
