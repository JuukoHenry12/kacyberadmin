import React, { useEffect, useState } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apiCalls/user";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { setUser } from "../redux/UserSlice";

const PageProtected = ({ children }) => {
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.users)
  const dispatch = useDispatch()
  const validateToken = async () => {
    try {
      dispatch(setLoader(true))
      const response = await GetCurrentUser();
      dispatch(setLoader(false))
      if (response.success) {
         dispatch(setUser(response.data))
      } else {
        dispatch(setLoader(false))
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false))
      navigate("/login");
      message.error(error.message);
    }
  }; 
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
        <div>
          {/*header */}
          <div 
          className="flex justify-between items-center bg-tahiti p-5 ">
            <h2 className="text-2xl text-white">Shop</h2>
            <div className="bg-white py-2 px-5 rounded-3xl flex gap-1 text-lg">
               <i className="ri-shield-user-fill" ></i> 
              <span
              className="underline cursor-pointer"
                // onClick={navigate("/profile")}
              >
                  {user.name}
              </span>
              <i className="ri-logout-box-r-line ml-3" ></i> 
            </div>
          </div>
          <div className="p-5">
          {children}
        </div>
        </div>
      )

  );
};

export default PageProtected;