import React, { useEffect, useState } from 'react'
import './Product.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Products = () => {
	const navigate = useNavigate()
	let Banner = "";
	let Images = "";
	const [getCat, setCat] = useState([])
	const [val, setVal] = useState({
		productname: "",
		category_name: "",
		Description: "",
		price: "",
		stokes: "",
		images: [],
		banner: "",



	})




	const convertToBase64Images = (files) => {
		return Promise.all(
			Array.from(files).map((file) => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.addEventListener('load', () => resolve(reader.result));
					reader.addEventListener('error', (error) => reject(error));
					reader.readAsDataURL(file);
				});
			})
		);
	};

	function convertToBase64Banner(file) {
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




	const GetImages = async (e) => {
		e.preventDefault()

		Images = await convertToBase64Images(e.target.files)
		console.log(Images);
		// setVal(Images)
	}

	const GetBanner = async (e) => {
		e.preventDefault()

		Banner = await convertToBase64Banner(e.target.files[0])
		console.log(Banner);
	}



	const GetData = (e) => {
		setVal((pre) => ({ ...pre, [e.target.name]: e.target.value }))
		console.log(val);
	}


	const getCategory = async () => {
		const res = await axios.get("http://localhost:3003/wholewatch/categorygetdata")
		setCat(res.data)
		console.log(res.data);
		console.log(getCat);
	}
	useEffect(() => {
		getCategory()
	}, [])


	const addProduct = async (e) => {
		try {
			e.preventDefault()
			const res = await axios.post("http://localhost:3003/wholewatch/addProduct", { ...val, images: Images, banner: Banner })
			console.log(res.data);
			if (res) {
				alert("Product Added")
				navigate("/Adminhome")
			}
		} catch (error) {
			console.log(error);
		}
	}














	return (
		<div>



			<div className="main-product">
				<div className="wrapper" >
					<div className="inner">
						<form action="" className='data-products' onSubmit={addProduct} >
							<h3>Registration Form</h3>
							<div className="form-group">
								<div className="form-wrapper">
									<label htmlFor="">Product Name</label>
									<input type="text" className="form-control" name='productname' onChange={GetData} />
								</div>

								<div className="form-wrapper">
									<label htmlFor="">Description</label>
									<input type="text" className="form-control" name='Description' onChange={GetData} />
								</div>

							</div>

							<div className="form-wrappers-select">
								<label htmlFor="">Category : </label>
								<select name="category_name" onChange={GetData} >
									{
										getCat.map((data, index) =>
											<option value={data.category_name} key={index}>{data.category_name}</option>
										)
									}

								</select>


							</div>


							<div className="form-wrapper">
								<label htmlFor="">Price</label>
								<input type="text" className="form-control" name='price' onChange={GetData} />
							</div>

							<div className="form-wrapper">
								<label htmlFor="">Stokes</label>
								<input type="text" className="form-control" name='stokes' onChange={GetData} />
							</div>
							<div className="form-wrapper">
								<label htmlFor="">Add Photo</label>
								<input type="file" id='pphoto' className="form-control" name='images' onChange={GetImages} multiple />
							</div>

							<div className="form-wrapper">
								<label htmlFor="">Add Banner</label>
								<input type="file" id='pphoto' className="form-control" name='banner' onChange={GetBanner} />
							</div>

							{/* <div className="checkbox">
								<label>
									<input type="checkbox" /> I caccept the Terms of Use & Privacy Policy.
									<span className="checkmark"></span>
								</label>
							</div> */}
							<button>Register Now</button>
						</form>
					</div>
				</div>
			</div>










		</div>
	)
}

export default Products
