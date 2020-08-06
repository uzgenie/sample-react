import * as endpoint from "./endpoints";

export const requestFactory = (props) => {
  let {
    name = null,
    data = {},
    onLoad = null,
    onSuccess = null,
    onFailure = null,
    headers = {},
    url_data = null
  } = Object.assign({}, props);

  if (name === null || endpoint.allEndpoints[name] === undefined) return;

  let endpointData = Object.assign({}, endpoint.allEndpoints[name]);

  if (onLoad) endpointData["onLoad"] = onLoad;

  if (onSuccess) endpointData["onSuccess"] = onSuccess;

  if (onFailure) endpointData["onFailure"] = onFailure;

  if (url_data) endpointData["endpoint"] = endpointData["endpoint"] + url_data;

  endpointData["data"] = data;
  endpointData["headers"] = headers;

  let r = new Request(Object.assign({}, endpointData));
  return r.send();
};

export class Request {
  constructor(props) {
    let {
      endpoint = null,
      method = "GET",
      authentication_required = true,
      onLoad = null,
      onSuccess = null,
      onFailure = null,
      data = {},
      headers = {}
    } = props;

    this.url = endpoint;
    this.method = method;
    this.onLoad = onLoad;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.data = data;

    this.headers = headers;
    this.shouldHaveHeader();

    if (authentication_required) this.tokenHeader();
  }

  tokenHeader = () => {
    let token = window.localStorage.getItem("token");
    this.headers["Authorization"] = `Bearer ${token}`;
  };
  shouldHaveHeader = () => {
    this.headers["Content-Type"] = "application/json";
  };

  send = () => {
    return {
      serviceName: this.url,
      method: this.method,
      headers: this.headers,
      data: this.data,
      onLoad: this.onLoad ? this.onLoad : { type: "" },
      onSuccess: this.onSuccess ? this.onSuccess : { type: "" },
      onFailure: this.onFailure ? this.onFailure : { type: "" }
    };
  };
}
