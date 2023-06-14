import React from 'react'
import Widget from 'components/widget/Widget'
import Progress from 'components/progress/index'
import Card from 'components/card'
import PieChartCard from "views/admin/default/components/PieChartCard";
import DailyTraffic from "views/rtl/default/components/DailyTraffic";
import { MdBarChart,MdSdCard} from 'react-icons/md'

const Index = () => {
  return (
    <div className='mt-6'>
      <div className='flex mt-3 col-3 gap-3'>
         <Widget
         icon={<MdBarChart className="h-7 w-7" />}
         title={" Waiting List Users"}
         subtitle={"40"}
         
         />
             <h2 className='text-black'> </h2>
     
         <Widget
            icon={ <MdBarChart className="h-7 w-7" />}
            title={"Card Members"}
            subtitle={"20"}
         />
         
  
         <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total Number of User"}
              subtitle={"50"}
         />

      </div>
       <div className='grid grid-cols-2 gap-3 mt-2'>
          <div className='mt-1'>
             <Card>
                <PieChartCard/>
             </Card>
          </div>
          <div className='col-6'>
             <Card>
           
                <DailyTraffic/>
             </Card>
          </div>
          {/* <div>
            <TotalSpent />
          </div> */}
       </div>
    </div>
  )
}

export default Index
