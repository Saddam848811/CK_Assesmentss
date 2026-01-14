import React, { useState, useEffect } from "react";
import { groupByColumnApi } from "../../../Axios/CostExplorer/groupByColumnApi";
import { groupByColumnFieldApi } from "../../../Axios/CostExplorer/getGroupByColumnFieldApi";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { getGroupByColumnFieldByAccountIdApi } from "../../../Axios/CostExplorer/getGroupByColumnFieldByAccountIdApi";

const groupByOptions = [
  "SERVICE",
  "INSTANCE_TYPE",
  "ACCOUNT_ID",
  "USAGE_TYPE",
  "PLATFORM",
  "REGION",
  "USAGE_TYPE_GROUP",
  "PURCHASE_OPTION",
];

function CostExplorerFilters({
  startDate,
  endDate,
  setGroupByColumnFieldFun,
  setIsFiltersOpenFun,
  selectedAccount,
  userRole,
}) {
  const [filterValues, setFilterValues] = useState({});
  const [expandedGroup, setExpandedGroup] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    groupByOptions.forEach((g) => {
      groupByColumnApi(g).then((list) => {
        setFilterValues((prev) => ({
          ...prev,
          [g]: list,
        }));
      });
    });
  }, []);

  function toggleGroup(group) {
    setExpandedGroup((prev) => (prev === group ? "" : group));
    setSelectedItems([]);
  }

  function toggleItem(item) {
    setSelectedItems((prev) => {
      const exists = prev.includes(item);
      return exists ? prev.filter((i) => i !== item) : [...prev, item];
    });
  }

  function toggleSelectAll() {
    if (!expandedGroup) return;
    const allSelected =
      selectedItems.length === filterValues[expandedGroup]?.length;
    setSelectedItems(allSelected ? [] : [...filterValues[expandedGroup]]);
  }

  function isAllSelected() {
    if (!expandedGroup) return false;
    return (
      selectedItems.length === filterValues[expandedGroup]?.length &&
      filterValues[expandedGroup]?.length > 0
    );
  }

  const handleApply = async (group) => {
    if (!group) return;

    let result = {
      GroupByColumn: group,
      StartDate: startDate,
      EndDate: endDate,
      Fields: selectedItems,
    };

    let response;

    if (userRole === "ROLE_CUSTOMER") {
      result = { ...result, AccountId: selectedAccount };

      response = await getGroupByColumnFieldByAccountIdApi(result);

      setGroupByColumnFieldFun(response.data ?? response);
    } else {
      response = await groupByColumnFieldApi(result);
      setGroupByColumnFieldFun(response.data ?? response);
    }
  };

  return (
    <div className="filter-panel p-4 m-4   rounded   ">
      {groupByOptions.map((group) => (
        <div key={group} className="mb-4 border-b border-gray-200 pb-2">
          <div className="flex justify-between items-center">
            <div
              className="flex-1 cursor-pointer"
              onClick={() => toggleGroup(group)}
            >
              <h3 className="font-semibold">{group.replace("_", " ")}</h3>
            </div>
            <div className="flex space-x-2">
              <button className="" onClick={() => toggleGroup(group)}>
                {expandedGroup === group ? (
                  <FaArrowAltCircleUp
                    className="bg-blue-300 text-white rounded-full p-1"
                    size={"30"}
                  />
                ) : (
                  <FaArrowAltCircleDown
                    className="bg-blue-300 text-white rounded-full p-1 "
                    size={"30"}
                  />
                )}
              </button>

              <button
                className="bg-blue-50 text-black px-2 py-1 ml-4  rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
                onClick={() => handleApply(group)}
              >
                Apply
              </button>
            </div>
          </div>

          {expandedGroup === group && (
            <div className="mt-2 max-h-40 overflow-auto border-gray-100 rounded p-2">
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={isAllSelected()}
                  onChange={toggleSelectAll}
                />
                <span className="ml-2 text-sm font-medium">Select All</span>
              </label>

              {filterValues[group]?.map((item) => (
                <label key={item} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => toggleItem(item)}
                  />
                  <span className="ml-2 text-sm">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-start  space-x-2 mt-4">
        <button
          className=" bg-red-200 hover:bg-red-300 text-black px-2 py-1   rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
          onClick={() => {
            setIsFiltersOpenFun(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CostExplorerFilters;
