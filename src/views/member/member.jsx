import React, { useEffect, useState, useRef } from "react";
import Card from "components/card";
import { Getmember } from "../../ApiCalls/member";
import { DeleteUser } from "ApiCalls/api";
import { Form, Modal, Input, message } from "antd";
import { Addmember } from "../../ApiCalls/member";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { DeleteMember } from "../../ApiCalls/member";
import { AiFillDelete } from "react-icons/ai";

const Index = () => {
  const [members, setMember] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  const maxRecords = 10; // Maximum number of records to display

  const FetchData = async () => {
    const member = await Getmember();
    console.log(member);
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
      setVisible(false);
      if (response.success) {
        message.success(response.message);
        FetchData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error, message);
    }
  };
  const deletemembers = async (_id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteMember(_id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        FetchData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // paginate
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, maxRecords);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = members?.slice(indexOfFirstItem, indexOfLastItem);

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
              {loading &&
                currentItems?.map((item, index) => (
                  <tr
                    class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={item._id}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {item.firstname} {item.surname}
                    </th>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {item.email}
                    </th>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {item.phoneNumber}
                    </th>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {item.NinNumber}
                    </th>
                    <th
                      scope="row"
                      class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      <div className="flex">
                        <i onClick={(event) => deletemembers(item._id, event)}>
                          <AiFillDelete />
                        </i>
                      </div>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
          <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, maxRecords)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">{maxRecords}</span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              {Array.from({ length: Math.ceil(maxRecords / itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 ${
                      currentPage === index + 1
                        ? "bg-blue-50 text-blue-600 border-blue-300 hover-bg-blue-100 hover-text-blue-700 dark-border-gray-700 dark-bg-gray-700 dark-text-white"
                        : "hover-bg-gray-100 hover-text-gray-700 dark-hover-bg-gray-700 dark-hover-text-white dark-border-gray-700 dark-text-gray-400"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10l7.293 7.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
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
