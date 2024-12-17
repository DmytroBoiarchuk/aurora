import React from 'react';
import {Outlet} from "react-router";
import NavBar from "../../components/NavBar/NavBar";

function RootLayout(): JSX.Element {
    return (
        <>
            <NavBar />
            <Outlet/>
        </>
    );
}

export default RootLayout;
