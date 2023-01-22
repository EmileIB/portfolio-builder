import { ApiCall } from "./global-functions";

export const deployPortfolio = async (body) => {
  const response = await ApiCall({
    api: "portfolio",
    body: body,
    post: true,
  });
  return response;
};

export const getPortfolio = async (id) => {
  const response = await ApiCall({
    api: `portfolio/${id}`,
  });
  return response;
};

export const setCustonmLink = async (id, link) => {
  const response = await ApiCall({
    api: `portfolio/${id}/custom-link`,
    body: { customLink: link },
    put: true,
  });
  return response;
};
