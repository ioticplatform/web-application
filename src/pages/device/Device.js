import {globalData} from "../../repo/api";
import React from "react";

export default function Device(){
    return <p>{globalData.device.name}</p>;
}