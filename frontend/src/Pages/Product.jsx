import { useContext } from 'react'
import SingleProduct from '../components/SingleProduct/SingleProduct'
import CartVisible from '../Context/CartVisible'

const Product = () => {
  const [cartVisible,setCartVisible] = useContext(CartVisible)
  return (
    <div>
      {cartVisible && <div className='absolute w-full h-full bg-black/50 z-10 '>

</div>}
    <div className='px-20 py-4'>
        <SingleProduct/>
    </div>
    </div>
  )
}

export default Product