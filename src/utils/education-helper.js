import { ApiCall } from "./global-functions";

export const addUpdateEducations = async (educations) => {
  const response = await ApiCall({
    api: "educations",
    body: educations,
    post: true,
  });
  return response;
};
