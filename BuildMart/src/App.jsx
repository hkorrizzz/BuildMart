
import './App.css'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from  './pages/MainPage/MainPage'
import { CartPage } from './pages/CartPage/CartPage'
import { ProductPage} from './pages/ProductPage/ProductPage'

function App() {

  return (
    <Router>
    
     <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>  
     <Footer />
 
    </Router>
  )
}

export default App