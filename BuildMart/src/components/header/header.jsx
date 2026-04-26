import { LuMenu } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { useState, useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from "../../components/notification/notification"; 
import "./header.css"
import "../../App.css"  

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('searchProducts', { 
            detail: searchInput.trim() 
        }));
        
        if (window.location.pathname !== '/') {
            navigate('/');
        }
        closeMenu();
    };

    useEffect(() => {
        const handleShowToast = (e) => {
            setToastMessage(e.detail);
            setShowToast(true);
        };

        window.addEventListener('showToast', handleShowToast);
        return () => window.removeEventListener('showToast', handleShowToast);
    }, []);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || {};
            const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(count);
        };

        updateCartCount();

        window.addEventListener('storage', updateCartCount);
        
        const interval = setInterval(updateCartCount, 1000);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || {};
            const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(count);
        };

        window.addEventListener('cartUpdated', updateCartCount);
        
        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

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
                    <Link to="/">Products</Link>
                    <a href="#">Categories</a>
                    <a href="#">Deals</a>
                    <a href="#">About</a>
                </nav>
                
                <form className="input-container" onSubmit={handleSearch}>
                    <RiSearchLine className="search-icon"/>
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="input-style" 
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </form>
                
                <div className="actions">
                    <RiSearchLine className="cart-icon hide" />
                    <Link to="/cart">
                        <LuShoppingCart className="cart-icon" />
                        <span>{cartCount}</span>
                    </Link>
                    <LuMenu 
                        className="menu-icon hide" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>
            </div>
            
            <nav className={`md-nav ${isMenuOpen ? 'show' : 'hide-button'}`}>
                <form className="input-container2" onSubmit={handleSearch}>
                    <RiSearchLine className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="input-style2" 
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </form>
                <div className="nav-menu2" style={{ flexDirection: "column", gap: "0px" }}>
                    <Link 
                        to="/" 
                        onClick={closeMenu}
                        style={{ padding: "8px 0px", display: "block" }}
                    >
                        Products
                    </Link>
                    <a href="#" style={{ padding: "8px 0px" }}>Categories</a>
                    <a href="#" style={{ padding: "8px 0px" }}>Deals</a>
                    <a href="#" style={{ padding: "8px 0px" }}>About</a>
                </div>
            </nav>

            <Toast 
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </header>
    );
}