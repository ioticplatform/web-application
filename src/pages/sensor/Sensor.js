import {globalData} from "../../repo/api";
import React from "react";

export default function Sensor(){
    return <p>{globalData.sensor.type}</p>;
}