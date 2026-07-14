import React, { useState } from 'react'
import './Customerlogin.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Customerlogin = () => {
  const navigate = useNavigate()
  const [val, setVal] = useState({
    email: "",
    password: ""
  })
  const GetData = (e) => {
    setVal((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    console.log(val);
  }
  const Login = async (e) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:3003/wholewatch/customerLogin", { ...val })
    console.log(res.data);
    const data = res.data
    if (res) {
      alert("Successfully Logined")
      const customer_token = data.token
      localStorage.setItem("customer_token", JSON.stringify(customer_token))
      navigate("/")
    }
  }



  return (
    <div>

      <div className='cus-login'>
        <div className="CustRegMain">
            <Link className='backBtn' to='/'>Back</Link>
          <div className="CustRegRight">
            <h2>Sign Up</h2>
            <div className="formMainDiv">
              <form action="" onSubmit={Login}>

                <div><input type="text" placeholder='Email' name='email' onChange={GetData} /></div>
                <div><input type="password" placeholder='password' name='password' onChange={GetData} /></div>

                <div> <button className='resgiter-btn'>Login</button></div>
                <Link className='iHaveAccount' to='/CustomerReg'>New Customer ?</Link>

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Customerlogin
