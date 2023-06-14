import React, { useState } from "react";
import { LoginStuff } from "../../ApiCalls/StuffApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password,setPassword] = useState();
 
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email,
      password
    };

     const response = await LoginStuff(payload)
   
      if(response.success ){
        toast("Loggined in Succefully !");
        navigate("/admin/data-tables")
     
      }else {
        alert("failed to login ")
      }
  };

  return (
    <div className="items-centerh-full mt-16 mb-16 flex w-full justify-center px-2 md:mx-0 md:px-0 lg:mb-10 ">
      {/* Sign in section */}
      <div className="mt-[10vh] w-[500px] max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[620px]">
          <ToastContainer />
        <h4 className="mb-2.5 text-center text-4xl font-bold text-navy-700 dark:text-white ">
          Kacyber
        </h4>
    
        <form onSubmit={handleSubmit}>
          <div class="mb-6">
            <label
              for="default-input"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Please Enter your Email"
            />
          </div>
          <div class="mb-6">
            <label
              for="default-input"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={password}
              onChange={(event) =>setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
