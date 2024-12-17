import React from 'react';
import classes from './ProcedurePlate.module.scss';

function ProcedurePlate({children}):JSX.Element {
    return <span className={classes.plate}>{children}</span>;
}

export default ProcedurePlate;
