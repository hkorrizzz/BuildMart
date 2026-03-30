import { LuMenu } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { useState, useEffect } from "react"; 
import { Link } from 'react-router-dom';
import "./header.css"
import "../../App.css"  

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

        const closeMenu = () => {
          setIsMenuOpen(false);
        }; 

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 48rem)');
 
        
        const changeSize = (e) => {
            if (e.matches) { 
                setIsMenuOpen(false); 
            }
        };

        mediaQuery.addEventListener('change', changeSize);
        changeSize(mediaQuery);

        return () => {
            mediaQuery.removeEventListener('change', changeSize);
        };
    }, []); 

    useEffect(() => {
        if (isMenuOpen) { 
            document.body.style.paddingTop = '322px';
        } else {  
            document.body.style.paddingTop = '80px';
        }

        return () => {
            document.body.style.paddingTop = '80px';
        };
    }, [isMenuOpen]);

    return (
        <header className="header">
            <div className="header-container">
              <Link to="/">
                <div className="logo-section">
                    <div className="main-logo">BM</div>
                    <div className="logo">BuildMart</div>
                </div>
                </Link>
                
                <nav className="nav-menu">
                    <Link to="/">
                    <a >Products</a>
                    </Link>
                    <a href="#">Categories</a>
                    <a href="#">Deals</a>
                    <a href="#">About</a>
                </nav>
                
                <div className="input-container">
                    <RiSearchLine className="search-icon"/>
                    <input type="text" placeholder="Search products..." className="input-style" />
                </div>
                
                <div className="actions">
                    <RiSearchLine className="cart-icon hide" />
                    <Link to="/cart">
                    <LuShoppingCart className="cart-icon" />
                    </Link>
                    <LuMenu 
                        className="menu-icon hide" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>
            </div>
            
            <nav className={`md-nav ${isMenuOpen ? 'show' : 'hide-button'}`}>
                <div className="input-container2">
                    <RiSearchLine className="search-icon" />
                    <input type="text" placeholder="Search products..." className="input-style2" />
                </div>
                <div className="nav-menu2" style={{ flexDirection: "column", gap: "0px" }}>
                    <Link to="/" onClick={closeMenu}>
                    <a style={{ padding: "8px 0px", display: "block" }}>Products</a>  
                    </Link>
                    <a href="#" style={{ padding: "8px 0px" }}>Categories</a>
                    <a href="#" style={{ padding: "8px 0px" }}>Deals</a>
                    <a href="#" style={{ padding: "8px 0px" }}>About</a>
                </div>
            </nav>
        </header>
    );
}