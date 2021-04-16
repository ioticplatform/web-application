import axios from 'axios';
import {useState} from "react";

let API_HOST = "http://65.21.110.202:5000/api"
// let API_HOST = "http://127.0.0.1:5000/api"

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

async function deleteDevice(device) {
    let res = axios.delete(API_HOST + `/users/${user.id}/devices/${device._id}`,{headers: {Authorization: `jwt ${token}`}});
    console.log(res)
    return res;
}

async function editDevice(device, name, description) {
    let res = axios.put(API_HOST + `/users/${user.id}/devices/${device._id}`, {name: name, description: description}, {headers: {Authorization: `jwt ${token}`}});
    return res;
}

async function forgotPassword(credential) {
    let res = await axios.post(API_HOST + "/users/forgotPassword", {credential: credential});
    return res;
}

async function resetPassword(credential, newPassword, resetPasswordCode) {
    let res = await axios.post(API_HOST + "/users/resetPassword", {credential: credential,
                                                                            newPassword: newPassword,
                                                                            resetPasswordCode: resetPasswordCode});
    return res;
}

let api = {
    login, register, getDevices, getSensors, getDeviceSensors,
    getSensorData, editAccount, deleteDevice, editDevice,
    forgotPassword, resetPassword}
export {api, globalData}
