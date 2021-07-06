import React from "react";
import Iframe from 'react-iframe'
import {api} from "../../repo/api";

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default function Automation() {
    setCookie("iotic_token", api.getToken(), 1);

    return <Iframe url="http://iotic.mywire.org:1880/?access_token=token_admin"
                   width="97%"
                   height="750px"
                   id="nodered"
                   display="initial"/>
};