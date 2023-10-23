import React from 'react'
import { Input } from 'antd'
import logo from '../../assets/img/logo.png'

const Password = () => {
  return (
    <div className='mx-auto w-[480px] mt-40'>
        <img src={logo} width={"300px"} height={"300px"}/>
        <form>
            <p>Enter your email address to receive a reset link</p>
                <Input 
                    placeholder='Enter email to rest your password'
                />
                    <button className='linear mt-2 w-[150px] rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"3'>
                        Request to Reset
                    </button>
        </form>
    </div>
  )
}

export default Password
