import axios from "axios";
export const ServiceMiddleware = store => next => async action => {
  if (action === undefined || !action.serviceName) {
    if (action === undefined) action = { type: "" };
    next(action);
    return;
  }

  const {
    serviceName,
    method,
    headers,
    onLoad,
    onSuccess,
    onFailure,
    data
  } = action;
  const { dispatch } = store;
  
  setBySentType(onLoad, dispatch);
  console.log(serviceName);
  try {
    
    let response = await axios({
      url: serviceName,
      method: method,
      headers: headers,
      data: data
    });
    setBySentType(onSuccess, dispatch, response.data);
  } catch (error) {
    console.log(error);
    setBySentType(onFailure, dispatch, error);
  }
};

const setBySentType = (callBack, dispatch, data = {}) => {
  if (typeof callBack === "function") callBack(data, dispatch);
  else if (!(callBack instanceof Array) && typeof callBack === "object") {
    if (callBack["payload"] !== undefined) callBack["payload"] = Object.assign({},data);
    dispatch(callBack);
  } else if (callBack instanceof Array && typeof callBack === "object") {
    callBack.forEach(ele => {
      dispatch(ele);
    });
  }
};
