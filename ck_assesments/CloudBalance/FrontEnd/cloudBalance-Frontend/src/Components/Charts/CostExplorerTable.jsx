import React, { useState, useMemo, useEffect } from "react";
import CostBarChart from "./CostBarChart";
import Loading from "../Loading/Loading";
import { groupByApi } from "../../Axios/CostExplorer/groupByApi.js";
import { getDatesApi } from "../../Axios/CostExplorer/getDatesApi.js";
import CostExplorerFilters from "../../Pages/Dashboards/CostExplorerDashboard/CostExplorerFilters.jsx";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getAccountIdByEmailApi } from "../../Axios/AccountOnboardingApi/getAccountIdByEmailApi.js";
import { getGroupByColumnByAccountIdApi } from "../../Axios/CostExplorer/getGroupByColumnByAccountIdApi.js";
import { groupByOptions, labelColors } from "./costExplorerData.js";

const CostExplorerTable = () => {
  const userRole = useSelector((state) => state.role?.userRole ?? null);

  const userEmail = useSelector((state) => state.email?.userEmail ?? null);

  const [groupBy, setGroupBy] = useState("SERVICE");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [snowflakeData, setSnowflakeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billDates, setBillDates] = useState(null);
  const [groupByColumnFieldData, setGroupByColumnFieldData] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [customerAccountIds, setCustomerAccountIds] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    if (userRole === "ROLE_CUSTOMER" && !selectedAccount) {
      setLoading(false);
    }
  }, [userRole, selectedAccount]);

  useEffect(() => {
    if (
      userRole !== "ROLE_CUSTOMER" ||
      !groupBy ||
      !startDate ||
      !endDate ||
      !selectedAccount
    ) {
      return;
    }
    // if (userRole === "ROLE_CUSTOMER" && !selectedAccount) {
    //   setLoading(false);
    // }

    const fetchCustomerGroupByData = async () => {
      try {
        setLoading(true);

        const response = await getGroupByColumnByAccountIdApi(
          groupBy,
          startDate,
          endDate,
          selectedAccount
        );

        setGroupByColumnFieldData(response);
        setSnowflakeData([]);
      } catch (error) {
        console.error("Customer GroupBy API error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerGroupByData();
  }, [userRole, selectedAccount, groupBy, startDate, endDate]);

  useEffect(() => {
    const fetchcustomerAccountIds = async () => {
      try {
        const response = await getAccountIdByEmailApi(userEmail);
        const accounts = response.data || [];

        setCustomerAccountIds(accounts);

        if (accounts.length > 0 && !selectedAccount) {
          setSelectedAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error fetching customer account IDs:", error);
      }
    };

    if (userRole === "ROLE_CUSTOMER") {
      fetchcustomerAccountIds();
    }
  }, [userEmail, userRole]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await getDatesApi();
        const dates = response.data.map((i) => i.BILL_DATE).sort();

        setBillDates(dates);

        if (dates.length >= 4) {
          setStartDate(dates[0]);
          setEndDate(dates[3]);
        } else if (dates.length > 0) {
          setStartDate(dates[0]);
          setEndDate(dates[dates.length - 1]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchDates();
  }, []);

  useEffect(() => {
    if (!groupBy || !startDate || !endDate) return;
    if (userRole === "ROLE_CUSTOMER") return;

    const fetchGroupByData = async () => {
      try {
        setLoading(true);
        const response = await groupByApi(groupBy, startDate, endDate);

        setSnowflakeData(response.data);
        setGroupByColumnFieldData(null);
      } catch (err) {
        console.error("GroupBy API error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupByData();
  }, [groupBy, startDate, endDate, userRole]);

  const finalDataSource = useMemo(() => {
    if (
      Array.isArray(groupByColumnFieldData) &&
      groupByColumnFieldData.length > 0
    ) {
      return groupByColumnFieldData;
    }
    return snowflakeData;
  }, [groupByColumnFieldData, snowflakeData]);

  const availableDates = useMemo(() => {
    return Array.from(
      new Set(finalDataSource.map((d) => d.BILL_DATE.slice(0, 10)))
    ).sort();
  }, [finalDataSource]);

  const filteredData = useMemo(() => {
    return finalDataSource.filter((item) => {
      const billYMD = item.BILL_DATE.slice(0, 10);
      if (startDate && billYMD < startDate) return false;
      if (endDate && billYMD > endDate) return false;
      return true;
    });
  }, [startDate, endDate, finalDataSource]);

  const costExplorerData = useMemo(() => {
    const labels = availableDates.filter((d) => {
      if (startDate && d < startDate) return false;
      if (endDate && d > endDate) return false;
      return true;
    });

    const datasets = Object.values(
      filteredData.reduce((acc, item) => {
        const groupKey = item.GroupByColumn || "Unknown";
        const dateKey = item.BILL_DATE.slice(0, 10);

        if (!acc[groupKey]) {
          acc[groupKey] = {
            label: groupKey,
            data: Array(labels.length).fill(0),
            total: 0,
          };
        }

        const dateIndex = labels.indexOf(dateKey);
        if (dateIndex > -1) {
          const cost = Number(item.COST) || 0;
          acc[groupKey].data[dateIndex] += cost;
          acc[groupKey].total += cost;
        }

        return acc;
      }, {})
    );

    datasets.sort((a, b) => b.total - a.total);

    return { labels, datasets };
  }, [filteredData, startDate, endDate, availableDates]);

  const chartDataForChartJS = useMemo(() => {
    return {
      labels: costExplorerData.labels,
      datasets: costExplorerData.datasets.map((ds, index) => {
        const color = labelColors[index];
        return {
          label: ds.label,
          data: ds.data,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        };
      }),
    };
  }, [costExplorerData]);

  return (
    <div className="  p-6">
      <div>
        {loading ? (
          <div className=" ">
            {" "}
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex items-center flex-wrap gap-2">
              <h1 className="mr-5 text-lg font-bold">Group By:</h1>
              {groupByOptions.map((option, index) => {
                if (userRole === "ROLE_CUSTOMER" && option === "ACCOUNT_ID") {
                  return null;
                }
                return (
                  <button
                    key={index}
                    className={`bg-blue-50 border border-blue-300 px-3 py-1 text-sm shadow hover:bg-blue-200 transition ${
                      groupBy === option ? "bg-blue-300 font-semibold" : ""
                    }`}
                    onClick={() => setGroupBy(option)}
                  >
                    {option.replace("_", " ")}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end ">
              <select
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border text-sm px-2 py-1 mt-6 rounded border-[#85c6f8] mr-5"
              >
                <option value="">Select start date</option>
                {billDates &&
                  billDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
              </select>
              <select
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border text-sm border-[#85c6f8] mt-6 px-2 py-1 rounded"
              >
                <option value="">Select end date</option>
                {billDates &&
                  billDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
              </select>
              {userRole === "ROLE_CUSTOMER" && (
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="border text-sm border-[#85c6f8] mt-6 px-2 py-1 ml-5 rounded"
                >
                  <option value="">Select Account</option>
                  {customerAccountIds.map((acc) => (
                    <option key={acc} value={acc}>
                      {acc}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button
              onClick={() => setIsFiltersOpen((prev) => !prev)}
              className={`px-3 py-1 border rounded ml-5 mb-5 transition${
                isFiltersOpen
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-blue-50 text-blue-500 border-[#85c6f8]"
              }`}
            >
              <BsFillFilterSquareFill />
            </button>
            <CostBarChart chartData={chartDataForChartJS} />
            <div className="overflow-x-auto mt-5">
              <table className="table-auto w-full border-collapse">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2">{groupBy.replace("_", " ")}</th>
                    {costExplorerData.labels.map((label, index) => (
                      <th key={index} className="px-4 py-2">
                        {label}
                      </th>
                    ))}
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {costExplorerData.datasets.map((dataset, index) => (
                    <tr
                      key={index}
                      className="bg-gray-50 hover:bg-blue-50 text-blue-800 transition"
                    >
                      <td className="px-4 py-2 text-center text-gray-700 text-sm">
                        {dataset.label}
                      </td>
                      {dataset.data.map((value, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-700 text-sm"
                        >
                          ${value.toLocaleString()}
                        </td>
                      ))}
                      <td className="px-4 py-2 text-center font-semibold">
                        ${dataset.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-semibold">
                    <td className="px-4 py-2 text-center text-blue-800">
                      Total
                    </td>
                    {costExplorerData.labels.map((_, dateIndex) => {
                      const dateTotal = costExplorerData.datasets.reduce(
                        (sum, ds) => sum + ds.data[dateIndex],
                        0
                      );
                      return (
                        <td
                          key={dateIndex}
                          className="px-4 py-2 text-center text-blue-800"
                        >
                          ${dateTotal.toLocaleString()}
                        </td>
                      );
                    })}
                    <td className="px-4 py-2 text-center text-blue-800 font-bold">
                      $
                      {costExplorerData.datasets
                        .reduce(
                          (sum, ds) => sum + ds.data.reduce((a, b) => a + b, 0),
                          0
                        )
                        .toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {isFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
          <div className="bg-white  rounded shadow-lg w-96 relative">
            <CostExplorerFilters
              setIsFiltersOpenFun={setIsFiltersOpen}
              startDate={startDate}
              endDate={endDate}
              setGroupByColumnFieldFun={setGroupByColumnFieldData}
              selectedAccount={selectedAccount}
              userRole={userRole}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CostExplorerTable;
