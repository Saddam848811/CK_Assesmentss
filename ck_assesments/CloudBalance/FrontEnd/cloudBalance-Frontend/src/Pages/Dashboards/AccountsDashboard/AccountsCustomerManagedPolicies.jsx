import React from "react";
import CkTunerRoleImg from "../../../assets/Accounts/ckTunerRole.png";
import PermissionPolicies from "../../../assets/Accounts/permissionPolicies.png";
import OtherPermissionPolicies from "../../../assets/Accounts/OtherPermissionPolicies.png";
import { useNavigate } from "react-router-dom";

function AccountsCustomerManagedPolicies() {

    const navigate = useNavigate();
  return (
     <div className="h-[100vh]  bg-[#f6f2f2] flex flex-col">
      <div className="bg-amber-50 w-[100%] p-6 fixed top-18 left-18  z-50">
        <h1 className="text-sm">
          A. Create an IAM Role  >> &nbsp; B. Add Customer Managed Policies >>&nbsp;
          C. Create S3 Bucket >>&nbsp; D. Setup CUR Replication >>&nbsp; E. Create
          CUR
        </h1>
      </div>

      <div className="mt-15 flex-1 overflow-y-auto">
        <div className="mx-9 mt-8 mb-6 flex flex-col items-start">
          <h1 className="text-2xl font-bold mb-2">
            Add Customer Managed Policies
          </h1>
          <p className="text-gray-700">
            Create an Inline policy for the role by following these steps{" "}
          </p>
        </div>
        <div className="shadow-2xl mx-9 bg-white rounded p-6 space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              1
            </div>
            <p className="text-gray-900">
              Go to the{" "}
              <a
                href="https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fiamv2%2Fhome%3Fregion%3Dus-east-1%26state%3DhashArgs%2523%252Froles%252Fdetails%252FCK-Tuner-Role-dev2%253Fsection%253Dpermissions%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fiamv2&forceMobileApp=0&code_challenge=peYExgEENwOp8nYyVOLzOwmcE6_beKhl-fDwUBagUs8&code_challenge_method=SHA-256"
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                CK-Tuner-Role
              </a>
            </p>
          </div>
          <div className=" flex justify-center items-center overflow-y-auto m-9">
            <img src={CkTunerRoleImg} alt="IAM Role" className="max-h-full" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              2
            </div>
            <p className="text-gray-900">
              In Permission policies, click on
              <b> Add permissions > Attach Policy</b>
            </p>
          </div>
          <div className=" flex justify-center items-center overflow-y-auto m-9">
            <img
              src={PermissionPolicies}
              alt="IAM Role"
              className="max-h-full"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              3
            </div>
            <p className="text-gray-900">
              Filter by Type > Customer managed then search for
              <b>
                {" "}
                cktuner-CostAuditPolicy, cktuner-SecAuditPolicy,
                cktuner-TunerReadEssentials{" "}
              </b>{" "}
              and select them.
            </p>
          </div>
          <div className=" flex justify-center items-center overflow-y-auto m-9">
            <img
              src={OtherPermissionPolicies}
              alt="IAM Role"
              className="max-h-full"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              4
            </div>
            <p className="text-gray-900">
              Now, click on <b>Add permissions </b>
            </p>
          </div>
        </div>
        <div className="flex justify-between mx-9 mt-6 mb-12 py-4">
          <button className="bg-blue-50 text-black px-4 py-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors">
            Cancel
          </button>
          <div className="w-[450px]  flex justify-between">
            <button
            onClick={() => {
              navigate("/accounts-customer-managed-policies");
            }}
            className="bg-blue-50 text-black px-4 py-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
          >
            Back - Create an IAM Role Bucket
          </button>
          <button
            onClick={() => {
              navigate("/accounts-create-cost-usage-report");
            }}
            className="bg-blue-50 text-black px-4 py-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
          >
            Next - Create CUR
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountsCustomerManagedPolicies;
