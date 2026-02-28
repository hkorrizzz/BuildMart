import { LuPawPrint } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import "./header.css"

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <div  class = "main-logo">BM</div>
          <div className="logo">BuildMart</div>
        </div>
        <nav className="nav-menu">
          <a href="#">Products</a>
          <a href="#">Categories</a>
          <a href="#">Deals</a>
          <a href="#">About</a>
        </nav>
        <div class = "input-container">
            <RiSearchLine className="search-icon"/>
            <input type ="text" placeholder="Search products..." class = "input-style"></input>
        </div>
        <div className="actions">
          
          <LuShoppingCart className="cart-icon"/>
        </div>
      </div>
    </header>
  );
}

