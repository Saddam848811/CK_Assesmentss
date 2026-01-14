import React, { useState } from "react";
import { IoMdCopy } from "react-icons/io";
import Iamrole from "../../../assets/Accounts/IamRole.png";
import { useNavigate } from "react-router-dom";

function AccountsIAMRole() {
  const roleName = "CK-Tuner-Role-dev2";

  const navigate = useNavigate();

  return (
    <div className="min-h-screen  bg-[#f6f2f2] flex flex-col">
      <div className="fixed top-18 left-64 w-full bg-blue-50  z-50 border-b">
        <div className="flex items-center gap-4 px-6 py-4 text-sm text-gray-600">
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
            <span>A. Create an IAM Role</span>
          </div>

          <span className="text-gray-400">{">"}</span>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-gray-400" />
            <span>B. Add Customer Managed Policies</span>
          </div>

          <span className="text-gray-400">{">"}</span>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-gray-400" />
            <span>E. Create CUR</span>
          </div>
        </div>
      </div>

      <div className="mt-15 flex-1 overflow-y-auto">
        <div className="mx-9 mt-8 mb-6 flex flex-col items-start">
          <h1 className="text-2xl font-bold mb-2">Create an IAM Role</h1>
          <p className="text-gray-700">
            Create an IAM Role by following these steps
          </p>
        </div>
        <div className="shadow-2xl mx-9 bg-white rounded p-6 space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              1
            </div>
            <p className="text-gray-900">
              Log into AWS account &{" "}
              <a
                href="https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fiamv2%2Fhome%3Fregion%3Dus-east-1%26state%3DhashArgs%2523%252Froles%252Fcreate%253Fstep%253DselectEntities%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fiamv2&forceMobileApp=0&code_challenge=eaCUJEhTBD5vhoHKNQkxrZXnlXiFSpCJuVVzJdmusW8&code_challenge_method=SHA-256"
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create an IAM Role.
              </a>
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium">
              2
            </div>
            <p className="text-gray-900">
              In the <b>Trusted entity type</b> section, select
              <b> Custom trust policy.</b> Replace the prefilled policy with the
              policy provided below:
            </p>
          </div>
          <div className="bg-[#fafafa] p-4 rounded border h-64 overflow-y-auto flex items-start space-x-2 mx-9">
            <pre className="text-sm whitespace-pre-wrap leading-5 flex-1 overflow-auto">
              {`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`}
            </pre>
            <button className="px-2 py-1 bg-blue-50 border border-[#85c6f8] rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <IoMdCopy />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-medium leading-none">
              3
            </div>
            <p className="text-gray-900">
              Click on <b>Next</b> to go to the Add permissions page
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-medium leading-none">
              4
            </div>
            <p className="text-gray-900">
              In the Role name field, enter the below-mentioned role name, and
              click on <b>Create Role</b>
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
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-medium leading-none">
              5
            </div>
            <p className="text-gray-900">
              Go to the newly create IAM Role and copy the Role ARN
            </p>
          </div>
          <div className=" flex justify-center items-center overflow-y-auto ">
            <img src={Iamrole} alt="IAM Role" className="max-h-full" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-medium leading-none">
                6
              </div>
              <p className="text-gray-900">Paste the copied Role ARN below</p>
            </div>
            <div className=" my-7 mx-9">
              <p className="mb-1">Enter the IAM Role ARN *</p>
              <input
                type="text"
                placeholder="Enter the IAM Role ARN"
                className="px-3 py-2 my-4 rounded-lg border border-[#85c6f8] shadow focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mx-9 mt-6 mb-12 py-4">
          <button className="bg-blue-50 text-black px-4 py-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => {
              navigate("/accounts-customer-managed-policies");
            }}
            className="bg-blue-50 text-black px-4 py-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
          >
            Next - Add Customer Managed Policies
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountsIAMRole;
