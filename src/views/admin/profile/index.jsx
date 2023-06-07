import React, { useState } from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {  RegisterStuff } from "ApiCalls/StuffApi";

const ProfileOverview = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate()

  const handleSubmit =async (event) => {
    event.preventDefault();
    const payload = {
      name,
      password,
      email,
    };
    const response = await  RegisterStuff(payload)
    
      if(response.success){
        toast("Loggined in Succefully !");
        navigate("/admin/stuff")
     
      }else {
        alert("failed to submit information")
      }
      setName("")
      setEmail("")
      setPassword("")
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <Card>
        <form className="m-4" onSubmit={handleSubmit}>
          <div class="mb-6 ">
            <label
              for="name"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="Name"
              id="name"
              class="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div class="mb-6 ">
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              class="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@flowbite.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              class="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create User
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileOverview;
