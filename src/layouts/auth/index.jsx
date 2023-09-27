
import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";
import SignIn from "../../views/auth/SignIn"


export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative  h-full max-auto min-h-screen w-full !bg-white dark:!bg-navy-900">
      
        <main className={`mx-auto min-h-screen`}>
          <div className="relative max-auto ">
            <div className=" flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[100%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className=" flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[70%] lg:pl-0 xl:max-w-full">
    
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<SignIn/>}
                  />
                </Routes>
              
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
