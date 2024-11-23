import React from 'react';
import classes from './ProcedurePlate.module.scss';

function ProcedurePlate({children}):JSX.Element {
    return <div className={classes.plate}>{children}</div>;
}

export default ProcedurePlate;
