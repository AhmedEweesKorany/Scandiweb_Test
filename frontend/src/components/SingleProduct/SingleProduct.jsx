import React, { useContext, useEffect, useState } from "react";
import client from "../../ApolloClient";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import SimpleSlider from "../Slider/Slider";
import parse from 'html-react-parser';
import CartContext from "../../Context/CartContext";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [cartData,setCartData] = useContext(CartContext)
  console.log("singleProduct",cartData)
  const [attributes,setAttributes] = useState({
  })


  console.log(product ? product : false);

  const { id } = useParams();
  

  
  useEffect(() => {
    client
      .query({
        query: gql`
          query GetProduct($id: String) {
            Product(id: $id) {
              id
              name
              description
              brand
              inStock
              category
              gallery
              attributes {
                id
                items
                type
              }
              prices {
                amount
                currency
              }
            }
          }
        `,
        variables: { id },
      })
      .then((result) => {
        setProduct(result.data.Product);
      })
      .catch((error) => console.error(error));

     

  }, []);

  const handleImgChange = (i)=>{
    const li = document.getElementsByClassName("slick-dots")[0].children[i];

    li.querySelector('button').click()
  }
  return (
   product &&  <div className="flex gap-32 my-12 relative">

    
   <div className="flex gap-20 items-start">
     <div>
       <ul className="flex flex-col gap-6 my-4 ">
         {JSON.parse(product?.gallery).map((img,i)=>{
               return <>
               
               <li key={i} className="w-[100px] shadow  cursor-pointer">

                   <img src={img} onClick={()=>handleImgChange(i)}  alt={`image ${i+1}`} />
               </li>
               </>
           })}
       </ul>
     </div>
     <div className="w-[600px] h-[300px]">
     <SimpleSlider gallery={JSON.parse(product?.gallery)}  />

     </div>
    
   </div>

   <div>
    <h1 className="text-4xl font-bold">{product?.name}</h1>

    {product?.attributes.length > 0 && <div>
      {product?.attributes.map((attr,i)=>{
        console.log(JSON.parse(attr.items))
        return <>
        <div key={i} className="flex flex-col gap-2 mt-10">
          <h2 className="text-2xl font-bold">{attr.id}:</h2>
          <ul className="flex gap-4">
            {JSON.parse(attr.items).map((pr,i)=>{
             return  attr.type == "swatch" ? <>
              
              <li key={i} className={`${attributes?.Color == pr.value ? "border-4 border-green-500 " : ""}w-[40px] h-[40px] cursor-pointer `} onClick={()=>setAttributes({...attributes,[attr.id]:pr.value})} style={{background:`${pr.displayValue}`}}>

              </li>
              </> :  <>
              
              <li key={i} className={`${attributes[attr.id] == pr.value ? "bg-black text-white":""} border-2 cursor-pointer border-black p-3`} onClick={()=>{
                
                setAttributes({...attributes,[attr.id]:pr.value})
              }}>
                {pr.displayValue}
</li>
              </>
            })}
          </ul>
        </div>
        </>
      })}
      </div>}

      <div className="my-10 ">
        <h2 className="text-2xl font-bold my-4">Price:</h2>
        <p className="font-bold text-2xl">{JSON.parse(product.prices[0].currency).symbol}{product?.prices[0].amount}</p>

        <button className="bg-green-500 text-white text-center w-full p-4 text-xl my-4" onClick={()=>{
          setCartData([...cartData,{
            id:product.id,
            name:product.name,
            price:product.prices[0].amount,
            currency:JSON.parse(product.prices[0].currency).symbol,
            attributes:product.attributes,
            selectedAttr:attributes,
            quantity:1,
            gallery:product.gallery
          }])
        }}>Add To Cart</button>
      <div className="text-lg  ">
        
        { parse( product.description)}
      </div>
      </div>
   </div>
 </div>
  );
};

export default SingleProduct;
