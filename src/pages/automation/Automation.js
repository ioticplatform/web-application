import React from "react";
import Iframe from 'react-iframe'

export default function Automation() {
    return <Iframe url="http://localhost:1880"
                   width="97%"
                   height="750px"
                   id="nodered"
                   display="initial"/>
};