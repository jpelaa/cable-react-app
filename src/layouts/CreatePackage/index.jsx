import React from "react";

const CreatePackage = () => {
  return (
    <div className="flex flex-col bg-white">
      <div className="border border-gray-400 p-4">
        <h4 className="text-gray-700">Create Package</h4>
      </div>
      <div className="border border-gray-400 bg-purple-100 p-4">
        <label className="text-gray-700 my-4 block">Package Name</label>
        <input
          className="border border-gray-300 rounded my-4 block bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 br-2"
          type="text"
        />
        <label className="text-gray-700 my-4 block">Package Amount</label>
        <input
          className="border border-gray-300 rounded my-4 block bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 br-2"
          type="number"
        />
      </div>
      <div className="border border-gray-400 p-4 flex justify-end">
        <button className="text-gray-700 border border-gray-500 active:border-gray-700  rounded-md px-2 py-1">
          cancel
        </button>
        <button className="bg-purple-500 active:bg-purple-800 text-white rounded-md px-2 py-1 ml-1">
          create package
        </button>
      </div>
    </div>
  );
};

export default CreatePackage;
