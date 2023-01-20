import { ApiCall } from "./global-functions";

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("images", image);
  const response = await ApiCall({
    api: "image/upload",
    body: formData,
    post: true,
    isFile: true,
  });
  return response;
};
