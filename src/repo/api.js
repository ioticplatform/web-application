import axios from 'axios';
import {useState} from "react";

let API_HOST = "http://192.168.100.111:5000/api"

let token = localStorage.getItem("token") || "";

let user = {};
let userStr = localStorage.getItem("user");
if(userStr){
    user = JSON.parse(userStr);
}

let globalData = {user: {}}

async function login(username, pass) {
    let res = await axios.post(API_HOST + "/users/login", {username: username, password: pass});
    if (res.status === 201) {
        token = res.data.access_token;
        user = {
            id: res.data._id,
            email: res.data.email,
            username: res.data.username
        }
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        globalData.user = user;
    }
    return res;
}

async function register(username, password, email) {
    let res = await axios.post(API_HOST + "/users", {username: username, password: password, email: email});
    if (res.status === 201) {
        token = res.data.access_token;
        user = {
            id: res.data._id,
            email: res.data.email,
            username: res.data.username
        }
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        globalData.user = user;
    }
    return res;
}

async function getDevices() {
    return axios.get(API_HOST + `/users/${user.id}/devices`, {headers: {Authorization: `jwt ${token}`}});
}

async function getSensors() {
    return axios.get(API_HOST + `/users/${user.id}/sensors`, {headers: {Authorization: `jwt ${token}`}});
}

async function getDeviceSensors() {
    return axios.get(API_HOST + `/users/${user.id}/devices/${globalData.device._id}/sensors`, {headers: {Authorization: `jwt ${token}`}});
}

async function getSensorData() {
    let res = axios.get(API_HOST + `/users/${user.id}/devices/${globalData.sensor.id_device}/sensors/${globalData.sensor._id}/data`, {headers: {Authorization: `jwt ${token}`}});
    return res;
}

async function editAccount(password) {
    let res = axios.put(API_HOST + `/users/${user.id}`, {password: password}, {headers: {Authorization: `jwt ${token}`}});
    return res;
}

let api = {login, register, getDevices, getSensors, getDeviceSensors, getSensorData, editAccount}
export {api, globalData}
