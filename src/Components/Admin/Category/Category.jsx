import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Category.css'

const Category = () => {
    const navigate = useNavigate()
    const [val,setVal]=useState({
        category_name:"",
        Description:""

    })
    const GetData=(e)=>{
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
      }
      const AddCat=async(e)=>{
        e.preventDefault()
        const res=await axios.post("http://localhost:3003/wholewatch/addcategory",{...val}) 
        if(res.status!=404){
            alert("Category Added Successfully")
            navigate("/Adminhome")

        }
      }




  return (
    <div>



<div className="fulll">
                <div className="container-login" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#" className='forms'>
                            <h1 className='headingg'></h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className='spans' >Add category to your wish list</span>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#" className='forms' onSubmit={AddCat}  >
                            <h1 className='headingg'>Category </h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fa fa-facebook"></i></a>
                                <a href="#" className="social"><i className="fa fa-google"></i></a>
                                <a href="#" className="social"><i className="fa fa-linkedin"></i></a>
                            </div>
                            <span className='spans'>Add Categories Now</span>
                            <input type="text" placeholder="Category Name" name='category_name'  onChange={GetData}  />
                            <input type="text" placeholder="Description" name="Description"  onChange={GetData}  />
                            <Link className='social' to={'#'}>Various Category !!</Link>
                            <button className='signin-cat'>Submit</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay-cat">
                            <div className="overlay-panel overlay-right">
                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>











      
    </div>
  )
}

export default Category
