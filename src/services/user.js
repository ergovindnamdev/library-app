import React from "react";
import axios from "axios";

const APIURL = process.env.REACT_APP_API_URL;

export async function userLogin(req) {
  try {
    let reqdata = ''
    if (req.email) {
        reqdata = JSON.stringify({
        email: req.email,
        password: req.password,
      });
    } else if (req.username) {
        reqdata = JSON.stringify({
        username: req.username,
        password: req.password, 
      });
    } else {
      // Handle the case where neither email nor username is present in req
      return ({
        status: 400,
        msg: "Neither email nor username provided in req",
        resdata: "",
      });
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIURL}/api/auth/signin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: reqdata,
    };
    
    const res = await axios.request(config);
    
    return ({ status: 200, msg: "", resdata: res.data });
  } catch (err) {
    return ({ status: 400, msg: err, resdata: err });
  }
}


export async function userSignup(req) {
  try {
    
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIURL}/api/auth/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: req,
    };
    
    const res = await axios.request(config);
    
    return ({ status: 200, msg: "", resdata: res.data });
  } catch (err) {
    return ({ status: 400, msg: err, resdata: err });
  }
}

export async function userUpdate(req) {
  try {
    
    let config = { 
      method: "put",
      url: `${APIURL}/api/users/${req.id}`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('loginToken'),
      },
      data: req,
    };
    
    const res = await axios.request(config);
    
    return ({ status: 200, msg: "", resdata: res.data });
  } catch (err) {
    return ({ status: 400, msg: err, resdata: err });
  }
}

export async function getAllUsers(req) {
  try {
    
    let config = { 
      method: "get", 
      url: `${APIURL}/api/users`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('loginToken'),
      },
      data: req,
    };
    
    const res = await axios.request(config);
    
    return ({ status: 200, msg: "", resdata: res.data });
  } catch (err) {
    return ({ status: 400, msg: err, resdata: err });
  }
}

export async function deleteUserById(req){ 
  try {
    let config = { 
      method: "delete", 
      url: `${APIURL}/api/users/${req.id}`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('loginToken'),
      },
    };
    
    const res = await axios.request(config);
    
    return ({ status: 200, msg: "", resdata: res.data });
  } catch (err) {
    return ({ status: 400, msg: err, resdata: err });
  }
}




