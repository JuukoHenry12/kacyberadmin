import React from 'react'
import { Input } from 'antd'

const Password = () => {
  return (
    <div className='mx-auto w-[480px] mt-40'>
       <form>
        <p>Provide Your email to reset your password via the email link</p>
            <Input 
                placeholder='Enter email to rest your password'
            />
            <button className='btn btn-primary mt-3'>Submit</button>
       </form>
    </div>
  )
}

export default Password
