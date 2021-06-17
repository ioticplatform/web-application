import axios from 'axios';
// let IP = "65.21.110.202";
let IP = "localhost";
let PORT = "5000"
let API_HOST = "http://" + IP + ":" + PORT + "/api"

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
            username: res.data.username,
            role: res.data.role,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            address: res.data.address,
            city: res.data.city,
            state: res.data.state,
            zipCode: res.data.zipCode,
            country: res.data.country
        }
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        globalData.user = user;
    }
    return res;
}

async function loginWithGoogle(access_token) {
    let res = await axios.post(API_HOST + "/users/loginWithGoogle", {access_token: access_token});
    if (res.status === 201) {
        token = res.data.access_token;
        user = {
            id: res.data._id,
            email: res.data.email,
            username: res.data.username,
            role: res.data.role
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

async function getActors() {
    return axios.get(API_HOST + `/users/${user.id}/actors`, {headers: {Authorization: `jwt ${token}`}});
}

async function getDeviceSensors() {
    return axios.get(API_HOST + `/users/${user.id}/devices/${globalData.device._id}/sensors`, {headers: {Authorization: `jwt ${token}`}});
}

async function getSensorData() {
    let res = axios.get(API_HOST + `/users/${user.id}/devices/${globalData.sensor.id_device}/sensors/${globalData.sensor._id}/data`, {headers: {Authorization: `jwt ${token}`}});
    return res;
}

async function editAccount(address, firstName, lastName, city, country, state, zip) {
    let res = axios.put(API_HOST + `/users/${user.id}`, {address:address, firstName:firstName, lastName:lastName, city:city, country:country, state:state, zipCode:zip},
        {headers: {Authorization: `jwt ${token}`}});
    return res;
}

async function deleteDevice(device) {
    let res = axios.delete(API_HOST + `/users/${device.id_user}/devices/${device._id}`,{headers: {Authorization: `jwt ${token}`}});
    console.log(res)
    return res;
}

async function deleteSensor(sensor) {
    let res = axios.delete(API_HOST + `/users/${sensor.id_user}/devices/${sensor.id_device}/sensors/${sensor._id}`,{headers: {Authorization: `jwt ${token}`}});
    console.log(res)
    return res;
}

async function deleteActor(actor) {
    let res = axios.delete(API_HOST + `/users/${actor.id_user}/devices/${actor.id_device}/sensors/${actor._id}`,{headers: {Authorization: `jwt ${token}`}});
    console.log(res)
    return res;
}

async function deleteData(data) {
    let res = axios.delete(API_HOST + `/users/${data.id_user}/devices/${data.id_device}/sensors/${data.id_sensor}/data/${data._id}`,{headers: {Authorization: `jwt ${token}`}});
    console.log(res)
    return res;
}

async function editDevice(device, name, description) {
    let res = axios.put(API_HOST + `/users/${user.id}/devices/${device._id}`, {name: name, description: description}, {headers: {Authorization: `jwt ${token}`}});
    return res;
}

async function editSensor(sensor, measurementUnit, name, min_val, max_val, emailNotifications, webNotifications) {
    let res = axios.put(API_HOST + `/users/${sensor.id_user}/devices/${sensor.id_device}/sensors/${sensor._id}`,
        {measure_unit: measurementUnit,
              name: name,
              min_val: min_val,
              max_val: max_val,
              emailNotifications: emailNotifications,
              webNotifications: webNotifications}, {headers: {Authorization: `jwt ${token}`}});
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

async function sendMessage(username, subject, phone, text) {
    let res = await axios.post(API_HOST + "/messages", {username: username,
        subject: subject,
        phone: phone,
        text: text
    });
    return res;
}

async function getUsers() {
    return axios.get(API_HOST + `/users`, {headers: {Authorization: `jwt ${token}`}});
}

async function getMessages() {
    return axios.get(API_HOST + `/messages`, {headers: {Authorization: `jwt ${token}`}});
}

async function deleteMessage(message) {
    let res = axios.delete(API_HOST + `/messages/${message._id}`,{headers: {Authorization: `jwt ${token}`}});
    return res;
}

async function addFAQMessage(message) {
    let res = axios.put(API_HOST + `/messages/faq/${message._id}`,{}, {headers: {Authorization: `jwt ${token}`}});
    return res;
}

async function editMessage(message, answer) {
    let res = axios.put(API_HOST + `/messages/${message._id}`,{answer: answer}, {headers: {Authorization: `jwt ${token}`}});
    return res;
}

async function getFAQ() {
    return axios.get(API_HOST + `/messages/faq`, {headers: {Authorization: `jwt ${token}`}});
}

async function getNotifications() {
    return axios.get(API_HOST + `/users/${user.id}/notifications`, {headers: {Authorization: `jwt ${token}`}});
}

async function deleteNotifications() {
    let res = axios.delete(API_HOST + `/users/${user.id}/notifications`,{headers: {Authorization: `jwt ${token}`}});
    return res;
}

let api = {
    login, register, getDevices, getSensors, getDeviceSensors,
    getSensorData, editAccount, deleteDevice, editDevice, editSensor,
    forgotPassword, resetPassword, deleteData, deleteSensor,
    sendMessage, getUsers, getMessages, deleteMessage, addFAQMessage,
    editMessage, getFAQ, loginWithGoogle, getActors, deleteActor,
    getNotifications, deleteNotifications}
export {api, globalData}
