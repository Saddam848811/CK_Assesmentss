import axios from "axios";

export const groupByColumnApi = async (group) => {
  const response = await axios.post(
    `http://localhost:8080/costExplorer/getGroupByColumn?GroupByColumn=${group}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};
