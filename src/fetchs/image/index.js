import instance from "../../axios";

export const POST_UploadImage = async (imageUpload, setLoading) => {
  const form = new FormData();
  form.append("file", imageUpload);

  setLoading(true);
  try {
    const response = await instance.post("/image/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.request);

    setLoading(false);
    return response?.data?.data;
  } catch (e) {
    setLoading(false);
    throw e;
  }
};
