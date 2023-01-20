import { ApiCall } from "./global-functions";

export const login = async (email, password) => {
  const response = await ApiCall({
    api: "auth/login",
    body: { email, password },
    post: true,
  });
  return response;
};

export const register = async (body) => {
  const response = await ApiCall({
    api: "auth/register",
    body: body,
    post: true,
  });
  return response;
};

export const auth = async () => {
  const response = await ApiCall({
    api: "auth/user",
  });
  return response;
};
