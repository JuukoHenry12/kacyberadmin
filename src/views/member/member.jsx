import React, { useEffect, useState, useRef } from "react";
import Card from "components/card";
import { Getmember } from "../../ApiCalls/member";
// import { DeleteUser } from "ApiCalls/api";
import { Form, Modal, Input, message } from "antd";
import { Addmember } from "../../ApiCalls/member";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { DeleteMember } from "../../ApiCalls/member";
import { AiFillDelete } from "react-icons/ai";
import { GetUser } from "ApiCalls/api";
import Select from "react-select";
import moment from 'moment';

const Index = () => {
  const [members, setMember] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  const maxRecords = 10; // Maximum number of records to display

  const options = [
    {
      label: "Wallet Card",
      value: "WalletCard",
    },
    {
      label: "Crubs",
      value: "CrubsCard",
    },
    {
      label: "Key Holder",
      value: "KeyHolder",
    },
    {
      label: "Blue Watch",
      value: "BlueWatch",
    },
  ];

  const FetchData = async () => {
    const member = await Getmember();
    console.log(member);
    setMember(member.member);
  };

  const GetWishList = async () => {
    const user2 = await GetUser();
    const usersData = user2.user?.map((user) => ({
      value: user._id,
      label: `${user.firstname} ${user.surname}`,
      phoneNumber: user.phoneNumber, // Add the phoneNumber to the user object
    }));
    setUser(usersData);
  };

  useEffect(() => {
    FetchData();
    GetWishList();
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
    // Your form submission logic
    try {
        dispatch(setLoader(true));
        const payload = {
          name:values.name.label,
          phoneNumber:values.name.phoneNumber,
          cardnumber:values.cardnumber,
          IssuedBy:values.IssuedBy,
          cardType:values.cardType
        }
        console.log(payload)
        const response = await Addmember(payload);
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

    // Custom validation function for 3 digits
  const validateThreeDigits = (rule, value, callback) => {
    const regex = /^\d{3}$/; // Regular expression to match exactly 3 digits

    if (value && !regex.test(value)) {
      callback('Card Number must be exactly 3 digits');
    } else {
      callback(); // Validation passed
    }
  };

    const rules2 = [
      {
        validator: validateThreeDigits, // Use the custom validation function
      },
    ];

  return (
    <Card extra={"w-full sm:overflow-auto p-4"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Assign Card to User
        </div>
      </header>
      <div className="flex justify-end">
        <button
          className="mr-2 mb-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover-bg-gray-700 dark:focus:ring-gray-700"
          onClick={() => setVisible(true)}
        >
          Assign Card to User
        </button>
        <Modal
          title="Assign Card to User"
          visible={visible}
          onCancel={handleCancel}
          okText="Add Card Member"
          onOk={form.submit}
        >
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              label="Select Card User"
              name="name"
              rules={rules}
            >
              <Select
                className="react-select-container"
                options={user}
                placeholder="Select a user..."
                onChange={(selectedOption) => {
                  setSelectedUser(selectedOption);
                  // Autofill phone number input with the selected user's phone number
                  form.setFieldsValue({
                    // name: selectedOption ? selectedOption.label : undefined,
                    phoneNumber: selectedOption ? selectedOption.phoneNumber : undefined,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="PhoneNumber" name="phoneNumber" rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item
                label="Card Number"
                name="cardnumber"
                
                rules={[
                  {
                    required: true,
                    message: 'Card Number is required',
                  },
                  {
                    pattern: /^\d{3}$/, // Pattern to match exactly 3 digits
                    message: 'Card Number must be exactly 3 digits',
                  },
                ]}
              >
                <Input  maxLength={3} />
              </Form.Item>
            <Form.Item label="Issued By" name="IssuedBy" rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item label="Select Card Type" name="cardType" rules={rules}>
              <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                {options.map((item) => (
                  <option key={item.value}>{item.label} </option>
                ))}
              </select>
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
                  phoneNumber
                </th>
                <th scope="col" class="px-6 py-3">
                IssuedBy
                </th>
                <th scope="col" class="px-6 py-3">
                 Card Type
                </th>
                <th scope="col" class="px-6 py-3">
                 Card Number
                </th>
                <th scope="col" class="px-6 py-3">
                 Status
                </th>
                <th scope="col" class="px-6 py-3">
                 Date Issed
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
                      {item.name}
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
                      {item.IssuedBy}
                    </th>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {item.cardType}
                    </th>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {item.cardnumber}
                    </th>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {item.status}
                    </th>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                    {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')} 
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
          <nav
            className="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, maxRecords)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {maxRecords}
              </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <a
                  href="#"
                  className="dark:hover-bg-gray-700 dark:hover-text-white ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
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
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              {Array.from({ length: Math.ceil(maxRecords / itemsPerPage) }).map(
                (_, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 ${
                        currentPage === index + 1
                          ? "hover-bg-blue-100 hover-text-blue-700 dark-border-gray-700 dark-bg-gray-700 dark-text-white border-blue-300 bg-blue-50 text-blue-600"
                          : "hover-bg-gray-100 hover-text-gray-700 dark-hover-bg-gray-700 dark-hover-text-white dark-border-gray-700 dark-text-gray-400"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                )
              )}
              <li>
                <a
                  href="#"
                  className="hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500"
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
