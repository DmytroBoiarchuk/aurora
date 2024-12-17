import React from 'react';
import { Outlet } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
function RootLayout() {
    return (React.createElement(React.Fragment, null,
        React.createElement(NavBar, null),
        React.createElement(Outlet, null)));
}
export default RootLayout;
