import React from 'react';
import MediumButton from "../../UI/M-Button/MediumButton";
import classes from './SearchInput.module.scss';

function SearchInput():JSX.Element {
    return (
        <div className={classes.inputContainer}>
            <input type='search'/>
            <MediumButton>
                <p>Find Your Master</p>
            </MediumButton>
        </div>
    );
}

export default SearchInput;