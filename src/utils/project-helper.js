import { ApiCall } from "./global-functions";

export const addUpdateProjects = async (projects) => {
  const response = await ApiCall({
    api: "projects",
    body: projects,
    post: true,
  });
  return response;
};
