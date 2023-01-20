import axios from "axios";

const backendIP = "http://localhost:8080";

export const ApiCall = async ({
  api,
  body = {},
  post = false,
  put = false,
  del = false,
  params = {},
  isFile = false,
}) => {
  const headers = {
    "Content-Type": isFile ? "multipart/form-data" : "application/json",
    "x-access-token": localStorage.getItem("token"),
  };
  const url = `${backendIP}/api/${api}`;
  try {
    const response = post
      ? await axios.post(url, body, {
          headers: headers,
          params: params,
        })
      : put
      ? await axios.put(url, body, {
          headers: headers,
          params: params,
        })
      : del
      ? await axios.delete(
          url,
          {
            headers: headers,
            params: params,
          },
          body
        )
      : await axios.get(
          url,
          {
            headers: headers,
            params: params,
          },
          body
        );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
