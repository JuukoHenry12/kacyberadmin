import React, { useEffect, useState, useRef } from "react";
import Card from "components/card";
import { Getmember } from "../../ApiCalls/member";
import { DeleteUser } from "ApiCalls/api";
import { Form, Modal, Input, message } from "antd";
import { Addmember } from "../../ApiCalls/member";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { DeleteMember} from '../../ApiCalls/member'
import {AiFillDelete } from "react-icons/ai"

const Index = () => {
  const [members, setMember] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const FetchData = async () => {
    const member = await Getmember();
     console.log(member)
     setMember(member.member);
  };

  useEffect(() => {
    FetchData();
    setLoading(true);
  }, []);

 

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];
  const formRef = useRef(null);

  const handleSubmit = async (values) => {
    try {
      dispatch(setLoader(true));
       const response = await Addmember(values);
       dispatch(setLoader(false));
       setVisible(false)
      if (response.success) {
        message.success(response.message);
        FetchData()
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error, message);
    }
  };
  const deletemembers= async (_id) => {
    try {
      dispatch(setLoader(true))
      const response = await DeleteMember(_id);
      dispatch(setLoader(false))
      if (response.success) {
        message.success(response.message)
        FetchData()
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  };

  return (
    <Card extra={"w-full sm:overflow-auto p-4"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Member
        </div>
      </header>
      <div className="flex justify-end">
        <button
          className="mr-2 mb-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          onClick={() => setVisible(true)}
        >
          Add Card Member
        </button>
        <Modal
          title="Add  Card Member"
          visible={visible}
          onCancel={handleCancel}
          okText="Add Card Member"
          onOk={form.submit}  
        >
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item label="First Name" name="firstname" rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item label="SurName" name="surname" rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item label="PhoneNumber" name="phoneNumber" rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item label="NinNumber" name="NinNumber" rules={rules}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <div class="relative overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  PhoneNumber
                </th>
                <th scope="col" class="px-6 py-3">
                  Nin Number
                </th>
                <th scope="col" class="px-6 py-3">
                 Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && members?.map((item,index)=>(
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id} >
     
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.firstname}  {item.surname}  
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.email}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.phoneNumber}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.NinNumber}
                </th>
                <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    <div className="flex">
                        <i onClick={(event)=>deletemembers(item._id,event)}><AiFillDelete/></i>
                    </div>
              
                  </th>
            </tr> 
          ))
        }
            </tbody>
          </table>
          <nav
           className="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <a
                  href="#"
                 className="ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                   className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                 className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                 className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                 className="z-10 border border-blue-300 bg-blue-50 px-3 py-2 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                 className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Card>
  );
};

export default Index;
