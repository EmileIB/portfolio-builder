import { ApiCall } from "./global-functions";

export const addUpdateInfo = async (info) => {
  const response = await ApiCall({
    api: "info",
    body: info,
    post: true,
  });
  return response;
};
