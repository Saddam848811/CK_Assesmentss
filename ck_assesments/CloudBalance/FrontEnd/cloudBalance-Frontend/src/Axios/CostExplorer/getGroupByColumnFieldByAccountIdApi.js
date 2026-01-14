import axios from "axios";

export const getGroupByColumnFieldByAccountIdApi = async (result) => {

    
  const response = await axios.post(
    "http://localhost:8080/costExplorer/getGroupByColumnFieldByAccountId",
    {
        "GroupByColumn":result.GroupByColumn,
        "StartDate":result.StartDate,
        "EndDate": result.EndDate,
        "Fields":result.Fields,
        "AccountId":123456789012
    },
    { withCredentials: true }
  );

  
  
  return response.data;
};
