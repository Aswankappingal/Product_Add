import React, { useEffect, useState } from 'react'
import './Editcategory.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditCategory = () => {

  const navigate= useNavigate();
  const {id}=useParams()
  const[val,setVal]=useState({
    categoryname:"",
    description:''
  })
 
  // console.log(id);

  const getData=async()=>{
    const res = await axios.post(`http://localhost:3003/wholewatch/getcategorydetails/${id}`);
    setVal(res.data);
  }

  useEffect(()=>{
    getData()
  },[])
  

  //////////edit category data//////

  const getDatas=(e)=>{ 
      setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
  }

  const editData=async(e)=>{
      e.preventDefault()
      console.log(val)
      
      const res=await axios.patch(`http://localhost:3003/wholewatch/editcategorydetails/${id}`,{...val})
      if(res.status!=200){
        console.log(res.status);
        alert("Data Not Edited")
      }else{
          setTimeout(()=>{
              navigate("/adminhome");
          },1000);
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
                        <form action="#" className='forms' onSubmit={editData}  >
                            <h1 className='headingg'>EDIT</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fa fa-facebook"></i></a>
                                <a href="#" className="social"><i className="fa fa-google"></i></a>
                                <a href="#" className="social"><i className="fa fa-linkedin"></i></a>
                            </div>
                            <span className='spans'>Add Categories Now</span>
                            <input type="text" placeholder="Category Name" name='category_name' value={val.category_name}  onChange={getDatas}  />
                            <input type="text" placeholder="Description" name="Description"  value={val.Description}  onChange={getDatas}  />
                            <Link className='social' to={'#'}>Various Category !!</Link>
                            <button className='signin-cat' onClick={editData}>Submit</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay-cat">
                            
                        </div>
                    </div>
                </div>
            </div>














    </div>
  )
}

export default EditCategory
