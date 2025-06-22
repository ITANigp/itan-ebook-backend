import React from "react";

const SignupPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section (Sign Up Form) */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-8">
            <img src="./faith.png" className="h-16 w-auto" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Mechanic Sign up
          </h2>

          <form className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="fullName" className="sr-only">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 placeholder-gray-500"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 placeholder-gray-500"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobileNumber"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Enter Mobile Number
              </label>
              <div className="flex">
                {/* Country Code Dropdown (Simplified) */}
                <select className="shadow-sm appearance-none border rounded-l py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100">
                  <option value="+234">🇳🇬</option> {/* Nigeria flag emoji */}
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="tel"
                  id="mobileNumber"
                  className="shadow-sm appearance-none border rounded-r w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 placeholder-gray-500"
                  placeholder="Enter Mobile Number"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="expertise" className="sr-only">
                Expertise
              </label>
              <input
                type="text"
                id="expertise"
                className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 placeholder-gray-500"
                placeholder="Expertise"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 placeholder-gray-500"
                placeholder="Password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="rePassword" className="sr-only">
                Re-Password
              </label>
              <input
                type="password"
                id="rePassword"
                className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 placeholder-gray-500"
                placeholder="Re-Password"
              />
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="termsOfService"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="termsOfService"
                className="ml-2 block text-sm text-gray-900"
              >
                I have read and agree to{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Terms of Service
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              Next
            </button>
          </form>
        </div>
      </div>

      {/* Right Section (Asoro Automotive Branding - same as before) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 items-center justify-center flex-col p-8">
        <img src="./faith.png" className="h-48 w-auto mb-8" whiteText={true} />
        <h3 className="text-white text-4xl font-semibold mb-4">
          Asoro Automotive
        </h3>
        <div className="flex space-x-2">
          <span className="h-2 w-2 bg-white rounded-full opacity-75"></span>
          <span className="h-2 w-2 bg-white rounded-full opacity-50"></span>
          <span className="h-2 w-2 bg-white rounded-full opacity-25"></span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
