import instance from "../../axios";

export const GET_Items = async (gameId, setLoading) => {
  setLoading(true);
  try {
    const response = await instance.get("/item/" + gameId);
    setLoading(false);
    return response?.data?.data;
  } catch (e) {
    setLoading(false);
    throw e;
  }
};

export const POST_AssignItem = async (paylaod, gameId, setLoading) => {
  setLoading(true);
  try {
    const response = await instance.post("/item/assign/" + gameId, paylaod);
    setLoading(false);
    return response?.data?.data;
  } catch (e) {
    setLoading(false);
    throw e;
  }
};

export const GET_LoadVariant = async (gameId, available, setLoading) => {
  setLoading(true);
  try {
    const response = await instance.get(
      `/item/load/variant/${gameId}?available=${available}`
    );
    setLoading(false);
    return response?.data?.data;
  } catch (e) {
    setLoading(false);
    throw e;
  }
};
