import React, { useState,useRef } from "react";
import { LoginStuff } from "../../ApiCalls/StuffApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { setLoader } from "../../redux/loaderSlice";
import { message } from "antd";
import logo from "../../assets/img/logo.png"
import { setToken } from '../../redux/tokenSlice';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
export default function SignIn() {
  const [email, setEmail] = useState();
  const [password,setPassword] = useState();

  const [recaptchaValue, setRecaptchaValue] = useState(""); // To store the ReCAPTCHA response
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recaptchaRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email,
      password
    };
      // Check if ReCAPTCHA is solved
      if (!recaptchaValue) {
        // If ReCAPTCHA is not solved, show ReCAPTCHA
        setShowRecaptcha(true);
        return;
      }

     try{  
          

          dispatch(setLoader(true))
          const response = await LoginStuff(payload)
          console.log(response)
          dispatch(setLoader(false))
          if(response.success ){
            message.success(response.message)
            localStorage.setItem("token",response.token)
            dispatch(setToken(response.token));
            navigate("/admin/dashboard")
        
          }else {
            message.error(response.message)
               // Show ReCAPTCHA on submission failure
              setShowRecaptcha(true);
              // Reset ReCAPTCHA value
              setRecaptchaValue("");
          }
     }catch(error){
          dispatch(setLoader(false))
          message.error(error.message)
            // Show ReCAPTCHA on submission failure
          setShowRecaptcha(true);
          // Reset ReCAPTCHA value
          setRecaptchaValue("");
     }
  };
  const handleRecaptchaChange = (value) => {
    // This function will be called when the user solves the reCAPTCHA.
    // You can store the ReCAPTCHA response in state.
    setRecaptchaValue(value);
    console.log(value)
    setRecaptchaCompleted(true);
  };


  return (
    <div className="items-centerh-full mt-16 mb-16 flex w-full justify-center px-2 md:mx-0 md:px-0 lg:mb-10 ">
      {/* Sign in section */}
      <div className="mt-[10vh] w-[500px] max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[620px]">
          <ToastContainer />
        {/* <h4 className="mb-2.5 text-center text-4xl font-bold text-navy-700 dark:text-white ">
          Kacyber
        </h4> */}
        <img src={logo} alt="not found" width={"300px"} height={"300px"} className="mx-auto"/>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
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
             <div>      
                {showRecaptcha && (
                  <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                          <ReCAPTCHA
                            sitekey="6Le-rMcoAAAAAH2z3wAQhcyuSdH5JscWS5WImx7q"
                            onChange={handleRecaptchaChange}
                            ref={recaptchaRef}
                          />
                        </div>
                      )}
             </div>
            <p className="text-center"><Link to="/restpassword">Did you forget your password?</Link></p>
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Sign In
          </button>
             <p className="text-center mt-2 ml-2"><a href="https://kacyber.africa/privacy-policy-2/" className="mr-2">Terms of use </a>|<a href="https://kacyber.africa/terms-of-use/" className="ml-2">Privacy policy</a></p>
        </form>
      </div>
    </div>
  );
}
