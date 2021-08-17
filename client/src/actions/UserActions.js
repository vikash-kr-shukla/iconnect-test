import qs from "qs";
import { GET_ERRORS } from "./types";
var { mainUrl } = require("../model");

export const login = (loginData) => {
  console.log(loginData)
  return function(dispatch) {
    return fetch(mainUrl + "signIn/user", {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: qs.stringify(loginData)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {

        if(response.status === true)
        {
          dispatch({
            type: GET_ERRORS,
            payload: body.message
          });
        }
        else{
          console.log("Failed")
          dispatch({
            type: GET_ERRORS,
            payload: body.message
          });
        }
      });
  };
};




export const register = (registerData, history) => {
  return function(dispatch) {
    return fetch(mainUrl + "signUp/user", {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: qs.stringify(registerData)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {

        // if (response.ok) {
          if(response.status === true)
          {

            dispatch({
              type: GET_ERRORS,
              payload: body.message
            });
            history.push('/');
          }
          else{
            console.log("Failed")
            dispatch({
              type: GET_ERRORS,
              payload: body.message
            });
          }

       // }
      });
  };
};
