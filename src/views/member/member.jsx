import React, { useEffect, useState } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import  {GetStuff}  from "../../ApiCalls/StuffApi";
import { AiFillDelete,AiFillEdit } from "react-icons/ai";
import { DeleteUser } from "ApiCalls/api";
import { Form, Modal,Input, message } from "antd";
import { Addmember } from "ApiCalls/member";

const Index = () => {
    const [users,setUsers]=useState()
    const [loading,setLoading] =useState(false)
    const [visible, setVisible] = useState(false);

    const FetchData=async()=>{
         const data = await GetStuff()
         setUsers(data.message)
    }

    
 
    useEffect(()=>{
       FetchData()
       setLoading(true)
     },[])

    
    const deleteUser=async(id)=>{
        try {
            const  response = await DeleteUser(id)
            if(response.success){
               alert("user has been deleted")
            }else {
                alert("failed to delete user")
            }
        }catch(errror){

            console.log(errror)
        }
     }

     const handleOk = () => {
        setVisible(false);
      };
    
      const handleCancel = () => {
        setVisible(false);
      };
 
    
      const handleSubmit=async(values)=>{
          const response = await  Addmember(values)
          if(response.success){
              message.success(response.message)
          }else {
             alert("failed to submit Data")
          }
      }

  
  return (
    <Card extra={"w-full sm:overflow-auto p-4"}>
   
    <header className="relative flex items-center justify-between">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
        Member
      </div>


    </header>
     <div className="flex justify-end">
        <button   className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
           onClick={()=>setVisible(true)}
        > 
            Add Card Member
        </button>
        <Modal
           title="Add  Card Member"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            okText="Add Card Member"
        >
        
             <Form onSubmit={handleSubmit}>
                 <Form.Item label="First Name" name="FirstName"
                    rules={[{ required: true, message: 'Please input your FirstName' }]}
                 >
                    <Input
                     />
                 </Form.Item>
                 <Form.Item label="SurName" name="SurName"
                         rules={[{ required: true, message: 'Please input your SurName' }]}
                 >
                    <Input 
                     />
                 </Form.Item>
                 <Form.Item 
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email' }]}
                 >
                    <Input
                     />
                 </Form.Item>
                 <Form.Item label="PhoneNumber" name="PhoneNumber"
                    rules={[{ required: true, message: 'Please input your Email' }]}
                 >
                    <Input
                     />
                 </Form.Item>
                 <Form.Item label="NinNumber" name="NinNumber"
                  rules={[{ required: true, message: 'Please input your NinNumber' }]}
                 >
                    <Input
                     />
                 </Form.Item>
             </Form>
         
        </Modal>
        
     </div>
    <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
    
     
<div class="relative overflow-x-auto">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    NinNumber
              </th>
             
          </tr>
      </thead>
      <tbody>

        {/* { users?.map((item)=>(
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
     
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.name}  
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.email}
                </th>
                <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
            
                    <div className="flex">
                        <i href=""><AiFillDelete 
                          onClick={()=>deleteUser}
                        /></i>
                     
                    </div>
              
                  </th>
            </tr> 
          ))
        } */}
       
      </tbody>
  </table>
  <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
      <ul class="inline-flex items-center -space-x-px">
          <li>
              <a href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span class="sr-only">Previous</span>
                  <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              </a>
          </li>
          <li>
              <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
              <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
              <a href="#" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
              <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
          </li>
          <li>
              <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
          </li>
          <li>
              <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span class="sr-only">Next</span>
                  <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              </a>
          </li>
      </ul>
  </nav>
</div>


     
    </div>
  </Card>
  )
}

export default Index
