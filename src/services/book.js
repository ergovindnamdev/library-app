import React from "react";
import axios from "axios";

const APIURL = process.env.REACT_APP_API_URL;

export async function bookCreate(req) {
    try {
      
      let config = {
        method: "post",
        url: `${APIURL}/api/books`,
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

export async function getAllBooks(req) {
  try {
    
    let config = { 
      method: "get", 
      url: `${APIURL}/api/books`,
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

export async function deleteBookById(req){ 
  try {
    let config = { 
      method: "delete", 
      url: `${APIURL}/api/book/${req.id}`,
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




