import axios from "axios";
import * as _ from "lodash";
export async function request(
  { url, method, auth, data, customToken, headers: incommingHeaders },
  login
) {
  console.log("this is the incomming headers", incommingHeaders);
  let headers = { "Content-Type": "application/json" };
  if (auth === true) {
    const token = localStorage.getItem("token");
    headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${customToken || token}`,
    };
  }
  if (_.isObject(incommingHeaders)) {
    headers = { ...headers, ...incommingHeaders };
  }
  try {
    return await axios({
      method,
      url,
      data,
      headers,
    });
  } catch (err) {
    if (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.error &&
      err.response.data.error.statusCode === 401
    ) {
      // localStorage.removeItem("token");
      // localStorage.removeItem("role");
      // if (!login) window.location.href = "/bedayeah/#login";
    }
    throw err;
  }
}
