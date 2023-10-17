import React, {useEffect}from "react";
import Widget from "components/widget/Widget";
import Progress from "components/progress/index";
import Card from "components/card";
import PieChartCard from "views/admin/default/components/PieChartCard";
import DailyTraffic from "views/rtl/default/components/DailyTraffic";
import { MdBarChart} from "react-icons/md";
import  {Countmember} from "../../ApiCalls/member"
import {CountUsers} from "../../ApiCalls/api"
import {CountStuff} from "../../ApiCalls/StuffApi"
import { setLoader } from "redux/loaderSlice";


const Index = () => {
   
  const [membercount,setmemberCount] =React.useState()
  const [usersCount,setUsersCount] =React.useState()
  const [StuffCount,setStuffCount]=React.useState()

  const FetchMemberCoutData = async () => {
    const member = await  Countmember();
    const user=await CountUsers()
    const stuff= await CountStuff()

     setmemberCount(member.member);
     setUsersCount(user.users)
     setStuffCount(stuff.stuff)
  };

  useEffect(() => {
     FetchMemberCoutData();
     setLoader(true);
  }, []);

  return (
    <div className="mt-4">
      <div className="col-3 mt-3 flex gap-3">
            {/* <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Amount CardPayments"}
              subtitle={usersCount}
            /> */}
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Waiting List Users"}
              subtitle={usersCount}
            />

            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Card Members"}
              subtitle={membercount}
            />

         <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Number of User"}
          subtitle={StuffCount}
        />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <div className="mt-1">
          <Card>
            <PieChartCard 
              usersCount={usersCount}
              membercount={membercount}
            />
          </Card>
        </div>
        <div className="col-6">
          <Card>
            <DailyTraffic />
          </Card>
        </div>
       
      </div>
    </div>
  );
};

export default Index;
