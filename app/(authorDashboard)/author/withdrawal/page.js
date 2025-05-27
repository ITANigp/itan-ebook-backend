"use client";

import { useState } from "react";
import { Plus, Wallet } from "lucide-react";

export default function WalletPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen mt-12 bg-white flex flex-col items-center justify-start py-10 px-4 relative">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-orange-300 to-orange-500 text-black w-full max-w-md p-6 rounded-xl shadow-md border-4 border-orange-600">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm font-bold">itan</p>
            <p className="text-lg font-semibold">Available Balance</p>
          </div>
          <p className="text-sm">{new Date().toLocaleDateString()}</p>
        </div>

        <p className="text-4xl font-bold mb-8">$0</p>

        <div className="flex justify-between items-center text-sm text-black/80">
          <p>Chimdindu Ezulike</p>
          <p>itan wallet</p>
        </div>
      </div>

      {/* Withdraw Button */}
      <button className="mt-6 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md text-sm flex items-center gap-2">
        <Wallet className="w-4 h-4" />
        Withdraw
      </button>

      {/* Add New Details Trigger */}
      <div
        className="mt-10 w-full max-w-md p-6 rounded-xl border border-gray-200 bg-white shadow-sm cursor-pointer hover:border-gray-400"
        onClick={() => setShowModal(true)}
      >
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
          <Plus className="w-6 h-6 text-red-600 mb-2" />
          <p className="text-gray-600">Add New Details</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8 relative mx-2">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <div className="mb-6">
              <img src="/images/logo.png" alt="itan" className="w-12 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-6 text-center">
              Add New Details
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Bank Name"
                  className="w-full placeholder:text-gray-500 placeholder:text-sm border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full placeholder:text-gray-500 placeholder:text-sm border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Number
                </label>
                <input
                  type="number"
                  placeholder="Enter Account Number"
                  className="w-full placeholder:text-gray-500 placeholder:text-sm border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold"
              >
                Add Details
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
