import axios from "axios";

export const getGroupByColumnByAccountIdApi = async (groupBy,startDate,endDate,selectedAccount) => {

    console.log(groupBy,"asdasd");
    
    
  const response = await axios.post(
    "http://localhost:8080/costExplorer/getGroupByColumnByAccountId",
    {
        "GroupByColumn":groupBy,
        "StartDate":startDate,
        "EndDate": endDate,
        "AccountId":selectedAccount
    },
    { withCredentials: true }
  );

  
  
  return response.data;
};
