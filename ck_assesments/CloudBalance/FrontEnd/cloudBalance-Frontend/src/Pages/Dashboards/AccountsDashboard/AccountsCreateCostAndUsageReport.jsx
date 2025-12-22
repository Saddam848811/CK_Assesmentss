import React, { useState } from "react";
import { IoMdCopy } from "react-icons/io";
import SpecifyReportDetail from "../../../assets/Accounts/specifyReportDetails.png";
import SetDeliveryOption from "../../../assets/Accounts/SetDeliveryOption.png";
import ReportDeliveryOption from "../../../assets/Accounts/ReportDeliveryOption.png";

function AccountsCreateCostAndUsageReport() {
  const [roleName, setRoleName] = useState("ck-tuner-275595855473-hourly-cur");

  return (
    <div className="h-[100vh]  bg-[#f6f2f2] flex flex-col">
     <div className="fixed top-18 left-64 w-full bg-blue-50 z-50 ">
        <div className="flex items-center gap-4 px-6 py-4 text-sm text-gray-600">
          {/* Step A - Completed */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-gray-400" />
            <span>A. Create an IAM Role</span>
          </div>

          <span className="text-gray-400">{">"}</span>

          {/* Step B */}
            <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-gray-400" />
            <span>B. Add Customer Managed Policies</span>
          </div>

          <span className="text-gray-400">{">"}</span>

          {/* Step E */}
           <div className="flex items-center gap-2 font-medium text-gray-800">
            <span className="flex items-center justify-center w-5 h-5 rounded-full border border-green-500 bg-green-50">
              <svg
                className="w-3 h-3 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>C. Create CUR</span>
          </div>
        </div>
      </div>

      <div className="mt-15 flex-1 overflow-y-auto">
        <div className="mx-9 mt-8 mb-6 flex flex-col items-start">
          <h1 className="text-2xl font-bold mb-2">
            Create Cost & Usage Report
          </h1>
          <p className="text-gray-700">
            Create a Cost & Usage Report by following these steps{" "}
          </p>
        </div>
        <div className="shadow-2xl mx-9 bg-white rounded p-6 space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              1
            </div>
            <p className="text-gray-900">
              Go to
              <a
                href="https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fbilling%2Fhome%3Fregion%3Dus-east-1%26state%3DhashArgs%2523%252Freports%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A934814114565%3Auser%2Fportal-aws-auth&forceMobileApp=0&code_challenge=z-T5I7B_UddKWrNSJqrDYddZz1SQSFHbHQtDd__RKpg&code_challenge_method=SHA-256"
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Cost and Usage Reports
              </a>{" "}
              in the Billing Dashboard and click on <b>Create report.</b>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              2
            </div>
            <p className="text-gray-900">
              Name the report as shown below and select the
              <b> Include resource IDs</b> checkbox -
            </p>
          </div>
          <div className="bg-[#fafafa] p-3 mx-9 rounded border flex items-center w-fit">
            <pre className="text-sm  whitespace-pre-wrap leading-5 m-0">
              {roleName}
            </pre>
            <button className="ml-4 px-2 py-1 bg-blue-50 border border-[#85c6f8] rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <IoMdCopy />
            </button>
          </div>
          <p className="mx-9">
            Ensure that the following configuration is checked
          </p>
          <label className="flex mx-12 items-center space-x-2 text-gray-800 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked
              className="h-4 w-4 accent-gray-600"
            />
            <span>Include Resource IDs</span>
          </label>
          <p className="mx-9">
            Click on <b>Next</b>
          </p>
          <div className=" flex justify-start items-center overflow-y-auto mx-9 ">
            <img
              src={SpecifyReportDetail}
              alt="IAM Role"
              className="max-h-full"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              3
            </div>
            <p className="text-gray-900">
              In Configure S3 Bucket,{" "}
              <b> provide the name of the S3 bucket that was created -</b>
            </p>
          </div>
          <p className="mx-9">
            Ensure that the following configuration is checked
          </p>
          <label className="flex mx-12 items-center space-x-2 text-gray-800 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked
              className="h-4 w-4 accent-gray-600"
            />
            <span>
              The following default policy will be applied to your bucket
            </span>
          </label>
          <p className="mx-9">
            Click on <b>Save</b>
          </p>
          <div className=" flex justify-start items-center overflow-y-auto mx-9 ">
            <img
              src={SetDeliveryOption}
              alt="IAM Role"
              className="max-h-full"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              4
            </div>
            <p className="text-gray-900">
              In the Delivery options section, enter the below-mentioned Report
              path prefix -
            </p>
          </div>
          <p className="mx-9">Report path prefix:</p>
          <div className="bg-[#fafafa] p-3 mx-9 rounded border flex items-center w-fit">
            <pre className="text-sm  whitespace-pre-wrap leading-5 m-0">
              275595855473
            </pre>
            <button className="ml-4 px-2 py-1 bg-blue-50 border border-[#85c6f8] rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <IoMdCopy />
            </button>
          </div>
          <p className="mx-9">
            Additionally, ensure that the following checks are in place
          </p>
          <p className="mx-9">Time granularity:</p>
          <label className="flex items-center gap-2 text-sm cursor-pointer mx-9">
            <input
              type="radio"
              name="frequency"
              defaultChecked
              className="h-3.5 w-3.5 accent-gray-600"
            />
            <span className="font-semibold text-gray-900">Hourly</span>
          </label>
          <p className="mx-9">
            Please make sure these checks are Enabled in Enable report data
            integration for:
          </p>
          <label className="flex mx-12 items-center space-x-2 text-gray-800 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked
              className="h-4 w-4 accent-gray-600"
            />
            <span>Amazon Athena </span>
          </label>
          <div className=" flex justify-start items-center overflow-y-auto mx-9 ">
            <img
              src={ReportDeliveryOption}
              alt="IAM Role"
              className="max-h-full"
            />
          </div>
          <div className="flex items-center space-x-3 my-9">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              5
            </div>
            <p className="text-gray-900">
              Click on <b> Next</b> Now, review the configuration of the Cost and Usage Report. Once satisfied, click on <b> Create Report.</b>
            </p>
          </div>
        </div>
         <div className="flex justify-between mx-9 mt-6 mb-12 py-4">
          <button className="bg-blue-50 text-black px-4 py-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors">
            Cancel
          </button>
          <div className="w-[350px]  flex justify-between">
            <button
            onClick={() => {
              navigate("/accounts-customer-managed-policies");
            }}
            className="bg-blue-50 text-black px-4 py-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
          >
            Back - Setup CUR Replication
          </button>
          <button
            onClick={() => {
              navigate("/accounts-create-cost-usage-report");
            }}
            className="bg-blue-50 text-black px-4 py-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
          >
            Submit
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountsCreateCostAndUsageReport;
