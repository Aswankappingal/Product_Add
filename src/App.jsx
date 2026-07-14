import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Index from './Components/Body/Index'
import CustomerAuth from './Components/Customer/CustomerAuth/CustomerAuth'
import ProductDetailsCustome from './Components/Body/ProductdetailsCustomer/ProductDetailsCustome'
import Cartcustomer from './Components/Customer/CartCutomer/Cartcustomer'
import WishList from './Components/Customer/WishList/WishList'



function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        
      <Route path='/' Component={Index}/>
      <Route path='/CustomerReg' Component={CustomerAuth}/>
      <Route path='/CustomerLogin' Component={CustomerAuth}/>
      <Route path='/productDetailsCustomer/:id' Component={ProductDetailsCustome}/>
      <Route path='/CartCustomer/:id' Component={Cartcustomer}/>
      <Route path='/whishList/:id' Component={WishList}/>
      
      
      
      



      </Routes>
      
      </BrowserRouter>

    </>
  )
}

export default App
