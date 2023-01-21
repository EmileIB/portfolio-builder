import { ApiCall } from "./global-functions";

export const addUpdateExperiences = async (experiences) => {
  const response = await ApiCall({
    api: "experiences",
    body: experiences,
    post: true,
  });
  return response;
};
