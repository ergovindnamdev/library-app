import React from "react";
import axios from "axios";

const APIURL = process.env.REACT_APP_API_URL;

export async function createTrans(req) {
    try {
      
      let config = {
        method: "post",
        url: `${APIURL}/api/libtrans`,
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

export async function getAllTrans(req) {
  try {
    
    let config = { 
      method: "get", 
      url: `${APIURL}/api/libtrans`,
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

export async function deleteTransById(req){ 
  try {
    let config = { 
      method: "delete", 
      url: `${APIURL}/api/libtrans/${req.id}`,
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




