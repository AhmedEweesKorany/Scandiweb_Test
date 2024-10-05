import React, { useContext } from 'react'
import Products from '../components/Products/Products'
import CartVisible from '../Context/CartVisible'

const Home = () => {
  const [cartVisible,setCartVisible] = useContext(CartVisible)
  return (
    <div className="relative">
      {cartVisible && <div className='absolute w-full h-full bg-black/50 z-10'>

</div>}
      <div className='px-20 py-4'>

        <Products/>
      </div>
    </div>
  )
}

export default Home