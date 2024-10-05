import React, { Component } from 'react';
import client from '../../ApolloClient';
import { gql } from '@apollo/client';
import logo from "../../assets/logo.png";
import NavContext from '../../Context/NavContext';
import { Link } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";


class Products extends Component {
    static contextType = NavContext; 

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cur: 'all' 
        };
    }

    componentDidMount() {
        client
            .query({
                query: gql`
                    query GetProducts {
                        Products {
                        id
                            name
                            category
                            gallery
                            prices {
                                amount
                                currency
                            }
                        }
                    }
                `,
            })
            .then((result) => {
                this.setState({ products: result.data.Products });
            })
            .catch((error) => console.error(error)); 
    }

    renderProduct(product, index) {
        const galleryImage = JSON.parse(product.gallery) ? JSON.parse(product.gallery) : logo;
        const price = JSON.parse(product.prices[0].currency).symbol + product.prices[0].amount;

        return (
            <div key={index} className='hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 cursor-pointer group mb-10'>
             <Link to={`/product/${product.id}`}>
             <div>
                    <img src={galleryImage[0]} alt={product.name} className='w-full h-[300px] object-contain' />
                </div>
             </Link>

             <div className='hidden group-hover:flex  w-[50px] h-[50px] bg-green-500 text-white rounded-full float-end items-center justify-center' onClick={()=>console.log("cart")}>
                <IoCartOutline/>
                 </div>
            
                <div>
                    <h1>{product.name}</h1>
                    <p>{price}</p>
                </div>
            </div>
        );
    }

    render() {
        const { products } = this.state;
        const cur = this.context[0]; 

        return (
            <div>
                <h1 className='text-5xl font-bold my-20 uppercase'>{cur}</h1>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-content-center'>
                    {
                        cur === "all" ?
                            products.map((product, index) => this.renderProduct(product, index)) :
                            products.filter(product => product.category === cur).map((product, index) => this.renderProduct(product, index))
                    }
                </div>
            </div>
        );
    }
}

export default Products;
