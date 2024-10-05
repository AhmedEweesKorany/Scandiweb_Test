import { useContext, useEffect, useState } from "react";
import CartContext from "../../Context/CartContext";
import CartVisible from "../../Context/CartVisible";

const Cart = ({ className }) => {
  const [cartData, setCartData] = useContext(CartContext); // setcartData هتنفعك ف حوار انك تعمل delete للمنتج واحد 
  const [cartVisible, setCartVisible] = useContext(CartVisible);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState({});
  console.log(quantity)
  const [attributes,setAttributes] = useState({
})

useEffect(()=>{
  cartData?.map((item,i)=>{
    for(let j = i+1 ; j<cartData.length; j++){
      if(JSON.stringify(cartData[i].selectedAttr) == JSON.stringify(cartData[j].selectedAttr)){
        localStorage.setItem("quantity",+quantity[JSON.stringify(cartData[i].selectedAttr)] + 1)
        setQuantity({...quantity,[JSON.stringify(cartData[i].selectedAttr)]:quantity[JSON.stringify(cartData[i].selectedAttr)] ? quantity[JSON.stringify(cartData[i].selectedAttr)] + 1 : 2})
        cartData.splice(j,1)
      }
    }
  })
},[cartData])

  return (
    cartVisible && (
      <div className="absolute top-10 right-0 w-[325px]  bg-white z-20 px-4 flex flex-col gap-4  ">
        <h1 className="text-lg mt-3">
          <span className="font-bold">My Bag,</span> {cartData.length} item
          {cartData.length > 1 && "s"}
        </h1>

       <div className="h-[500px] overflow-y-auto flex flex-col gap-10 pb-2 ">
       {cartData.length > 0 &&
          cartData.map((item, i) => {
            console.log(item);
            for(let j = i+1 ; j<cartData.length; j++){
              if(JSON.stringify(cartData[i].selectedAttr) == JSON.stringify(cartData[j].selectedAttr)){
                item.quantity = item.quantity + 10
              }
            }
            return (
              <>
                <div className="flex justify-center items-between ">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[30px] ">{item.name}</h1>

                    <p className="text-[16px] font-bold">
                      {item.currency}
                      {item.price}
                    </p>

                    {item.attributes?.map((attr, i) => {
                      console.log(attr);
                      return (
                        <>
                        <h2 className="text-xl ">{attr.id}:</h2>
                          <ul className="flex gap-1">
                            {JSON.parse(attr.items).map((pr,i)=>{
                                return attr.type == "swatch" ? (
                                    <>
                                     <li key={i} className={`${item?.selectedAttr[attr.id] == pr.value ? "border-4 border-green-500 " : ""}w-[20px] h-[20px]  cursor-pointer `} onClick={()=>setAttributes({...attributes,[attr.id]:pr.value})} style={{background:`${pr.displayValue}`}}>
      
      </li>
                                    </>
                                  ) : (
                                    <>
                                     <li key={i} className={`${item?.selectedAttr[attr.id] == pr.value ? "bg-black text-white":""} border-2 cursor-pointer  border-black p-1 w-[30px] h-[30px] text-[10px] font-bold flex justify-center items-center`} onClick={()=>{
                
                setAttributes({...attributes,[attr.id]:pr.value})
              }}>
                {pr.displayValue}
</li>
                                    </>
                                  )
                            })}
                          </ul>
                        </>
                      );
                    })}
                  </div>
                        
                  <div className="flex flex-col justify-between">
                  <div
  className="w-[30px] h-[30px] border-2 border-black flex items-center justify-center"
  id="+"
  onClick={() =>
    setQuantity({
      ...quantity,
      [JSON.stringify(item.selectedAttr)]: quantity[JSON.stringify(item.selectedAttr)] !== undefined ? quantity[JSON.stringify(item.selectedAttr)] + 1 : item.quantity+1, 
    })
  }
>
  +
</div>

<p>{quantity[JSON.stringify(item.selectedAttr)] !== undefined ? quantity[JSON.stringify(item.selectedAttr)] : 1}</p> 

<div
  className="w-[30px] h-[30px] border-2 border-black flex items-center justify-center"
  onClick={() =>
    quantity[JSON.stringify(item.selectedAttr)] > 1 &&
    setQuantity({
      ...quantity,
      [JSON.stringify(item.selectedAttr)]: quantity[JSON.stringify(item.selectedAttr)] - 1, 
    })
  }
>
  -
</div>


                  </div>

                  <div>
                    <img src={JSON.parse(item.gallery)[0]} alt={item.name} className="h-full object-contain" />
                  </div>
                </div>
              </>
            );
          })}
       </div>
      </div>
    )
  );
};

export default Cart;
