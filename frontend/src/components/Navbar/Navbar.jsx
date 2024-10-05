import React, { Component } from 'react';
import client from '../../ApolloClient';
import { gql } from '@apollo/client';
import logo from "../../assets/logo.png";
import { IoCartOutline } from "react-icons/io5";
import NavContext from '../../Context/NavContext';  // For category navigation
import CartContext from '../../Context/CartContext'; // For cart management
import CartVisible from '../../Context/CartVisible';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';

class Navbar extends Component {
  static contextType = NavContext; // Only one context can be used with this

  constructor(props) {
    super(props);
    this.state = {
      categories: ["all"], // Holds categories
      isVisible:false
    };
  }

  componentDidMount() {
    // Fetch categories from GraphQL
    client
      .query({
        query: gql`
          query GetCategories {
            Categories {
              name
            }
          }
        `,
      })
      .then((result) => {
        this.setState({ categories: result.data.Categories });
      })
      .catch((error) => console.error(error));

    
  }

  

  render() {
    const { categories } = this.state;
    const [cur, setCur] = this.context;
    return (
     <CartVisible.Consumer>
      {([cartVisible,setCartVisible])=>(
        <CartContext.Consumer>
        {([cartData, setCartData]) => (
          <div className="flex justify-between items-center px-20 py-4">
            {/* Categories Navigation */}
            <div>
              <ul className="flex gap-4 uppercase hover">
                {categories &&
                  categories.map((category) => (
                    cur === category.name ? (
                      <li key={category.name} className="cursor-pointer text-green-500 underline-offset-8 underline">
                        {category.name}
                      </li>
                    ) : (
                      <li key={category.name} className="cursor-pointer hover:text-green-500" onClick={() => setCur(category.name)}>
                        {category.name}
                      </li>
                    )
                  ))}
                <li
                  onClick={() => setCur("all")}
                  className={cur === "all" ? "cursor-pointer text-green-500 underline-offset-8 underline" : "cursor-pointer hover:text-green-500"}>
                  All
                </li>
              </ul>
            </div>

            {/* Logo */}
            <div className="cursor-pointer">
              <Link to={"/"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>

            {/* Cart Icon */}
            <div className="cursor-pointer text-2xl relative" >
              <IoCartOutline onClick={() => setCartVisible(!cartVisible)} />
              {cartData?.length > 0 && (
                <div onClick={() => setCartVisible(!cartVisible)} className="absolute left-4 bottom-4 bg-red-400 w-[12px] h-[12px] rounded-full flex justify-center items-center text-[10px] font-bold text-white">
                  {+localStorage.getItem("quantity")}
                </div>
              )}
              <Cart  />
            </div>  
          </div>
        )}
      </CartContext.Consumer>
      )}

     </CartVisible.Consumer>
    );
  }
}

Navbar.contextType = NavContext; // Define contextType for NavContext

export default Navbar;
