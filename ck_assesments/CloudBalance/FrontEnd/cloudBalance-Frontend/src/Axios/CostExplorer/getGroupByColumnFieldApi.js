import axios from "axios";

export const groupByColumnFieldApi = async (result) => {
  const response = await axios.post(
    "http://localhost:8080/costExplorer/getGroupByColumnField",
    {
        "GroupByColumn":result.GroupByColumn,
        "StartDate":result.StartDate,
        "EndDate": result.EndDate,
        "Fields":result.Fields
    },
    { withCredentials: true }
  );

  
  return response.data;
};
