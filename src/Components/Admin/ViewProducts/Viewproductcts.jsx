import React, { useEffect, useState } from 'react'
import './Viewproducts.scss'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Viewproductcts = () => {
    const [prod, setProd] = useState([]);
    const { category_name } = useParams();

    const getProd = async () => {
        try {
            const res = await axios.get(`http://localhost:3003/wholewatch/getCatWiseProducts/${category_name}`);
            console.log(res.data);
            setProd(res.data);
            // console.log(prod[0].images);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getProd();
    },  [category_name]);








    return (
        <div>

            <div className="whole-products-view">
                {
                    prod.map((data, index) =>

                        <Link to={`/productfulldetails/${data._id}`} key={index} className='Link-view-products'>
                            <div className="card">

                                <div className="imgBox">
                                    <img src={data.banner} alt="mouse corsair" className="mouse" />
                                </div>

                                <div className="contentBox">
                                    <h3>{data.productname}</h3>
                                    <h2 className="price">${data.price}€</h2>

                                   <Link to={`/editproducts/${data._id}`}><button className="buy">Edit Now</button></Link>
                                
                                </div>

                            </div>
                        </Link>
                    )
                }
            </div>

        </div>
    )
}

export default Viewproductcts
