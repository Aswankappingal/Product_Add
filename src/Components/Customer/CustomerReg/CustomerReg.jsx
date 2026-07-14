import React, { useState } from 'react'
import './Customerreg.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CustomerReg = () => {

    let Photo
    const [val,setVal]=useState({
      name:"",
      email:"",
      password:"",
      phone:"",
      personal_address:"",
     location:{
      state:"",
      district:"",
      pincode:"",
      place:"",
      landmark:"",
      street:""
     },
      photo:""
    })

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
      
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
      }

      const GetData=(e)=>{
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
        console.log(val);
      }
      const GetLocation=(e)=>{
        setVal((pre) => ({...pre,location: { ...pre.location, [e.target.name]: e.target.value },}));
      }
    
      const Upload=async(e)=>{
        e.preventDefault()
      
        Photo=await convertToBase64(e.target.files[0])
        console.log(Photo);
      }

      const Register=async(e)=>{
        e.preventDefault()
        const res=await axios.post("http://localhost:3003/wholewatch/addCustomer",{...val,photo:Photo})
        console.log(res.data);
        if(res){
          alert("Successfully Registered")
        }
      }

    return (
        <div>

            <div className='CustomerReg-main'>
                <div className="CustRegMain">
                    <Link className='backBtn' to='/'>Back</Link>
                    <div className="CustRegRight">
                        <h2>CREATE AN ACCOUNT</h2>
                        <div className="formMainDiv">
                            <form action="" onSubmit={Register} >
                                <div>
                                    <input type="text" placeholder='Name' name='name' onChange={GetData} />
                                    <input type="text" placeholder='Email' name='email' onChange={GetData} />
                                </div>
                                <div>
                                    <input type="password" placeholder='Password' name='password' onChange={GetData} />
                                    <input type="text" placeholder='Phone' name='phone' onChange={GetData} />
                                </div>
                                <div>
                                    <input type="text" placeholder='Personal Adress' name='personal_address' onChange={GetData} />
                                    <input type="text" placeholder='State' name='state' onChange={GetLocation} />
                                </div>
                                <div>
                                    <input type="text" placeholder='District' name='district' onChange={GetLocation} />
                                    <input type="text" placeholder='Pincode' name='pincode' onChange={GetLocation} />
                                </div>
                                <div>
                                    <input type="text" placeholder='Place' name='place' onChange={GetLocation} />
                                    <input type="text" placeholder='Landmark' name='landmark' onChange={GetLocation} />
                                </div>
                                <div>
                                    <input type="text" placeholder='Street' name='street' onChange={GetLocation} />
                                    <input type="file" placeholder='Photo' name='photo' onChange={Upload} />
                                </div>
                                <div className='reg-div'> <button className='resgiter-btn'>Register</button></div>
                                <Link className='iHaveAccount' to='/CustomerLogin'>I Have Account</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>






        </div>
    )
}

export default CustomerReg
