import React from 'react';
import Block from "../../../../UI/Block/Block";
import GoogleMapComponent from "./components/GoogleMapComponent";

function LocationBlock():JSX.Element {
    return (
        <Block>
           <GoogleMapComponent/>
        </Block>
    );
}

export default LocationBlock;
