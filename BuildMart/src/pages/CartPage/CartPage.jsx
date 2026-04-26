import { LuArrowRight, LuMinus, LuCalendar, LuMapPin, LuPlus, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router-dom"; 
import { useState, useEffect } from "react";
import "./CartPage_isEmpty.css";
import "./CartPage.css";
import productsJSON from "../../data/products.json";

export const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState("");

    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || {};
        const allProducts = productsJSON.products;
        const itemsWithQuantity = [];
        
        allProducts.forEach(product => {
            if (cartFromStorage[product.id]) {
                itemsWithQuantity.push({
                    ...product,
                    quantity: cartFromStorage[product.id].quantity
                });
            }
        });
    
        setCartItems(itemsWithQuantity);

        const savedPromo = JSON.parse(localStorage.getItem("promoApplied"));
        if (savedPromo) {
            setDiscount(0.10);
            setPromoMessage("Промокод применён!");
        }
    }, []);

    const updateCartInStorage = (updatedItems) => {
        const cartForStorage = {};
        updatedItems.forEach(item => {
            cartForStorage[item.id] = {
                id: item.id,
                quantity: item.quantity
            };
        });
        localStorage.setItem("cart", JSON.stringify(cartForStorage));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const incrementQuantity = (productId) => {
        setCartItems(prev => {
            const updated = prev.map(item => 
                item.id === productId 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            updateCartInStorage(updated);
            return updated;
        });
    };

    const decrementQuantity = (productId) => {
        setCartItems(prev => {
            const item = prev.find(i => i.id === productId);
            
            if (item.quantity <= 1) {
                const updated = prev.filter(item => item.id !== productId);
                updateCartInStorage(updated);
                return updated;
            }
            
            const updated = prev.map(item => 
                item.id === productId 
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            updateCartInStorage(updated);
            return updated;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => {
            const updated = prev.filter(item => item.id !== productId);
            updateCartInStorage(updated);
            return updated;
        });
    };

    const applyPromoCode = () => {
    const alreadyApplied = JSON.parse(localStorage.getItem("promoApplied"));
    
    if (promoCode === "SAVE10") {
        if (alreadyApplied) {
            setPromoMessage("Промокод уже был применён ранее");
            return;
        }
        setDiscount(0.10);
        setPromoMessage("Промокод применён! Скидка 10%");
        localStorage.setItem("promoApplied", JSON.stringify(true));
    } else {
        setDiscount(0);
        setPromoMessage("Неверный промокод");
        localStorage.removeItem("promoApplied");
    }
    };

    const handlePromoInputChange = (e) => {
        setPromoCode(e.target.value);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = subtotal * discount;
    const tax = (subtotal - discountAmount) * 0.08;
    const total = subtotal - discountAmount + tax;

    return (    
        <>
            {cartItems.length === 0 ? (
                <div className="cartPage-isEmpty-container">
                    <h1>Your Cart is Empty</h1>
                    <p>Start shopping to add items to your cart</p>
                    <Link to="/">
                        <div className="return-btn">
                            Browse Products
                            <LuArrowRight className="arrow-right-icon"/>
                        </div>
                    </Link>
                </div>
            ) : (
                <div className="cartPage-container">
                    <h1>Shopping Cart</h1>
                    <div className="shopping-cart-grid">
                        <div className="flex-column-block">
                            <div className="cart-products-container">
                                <div className="cart-products-container-title">
                                    <div className="cart-products-container-title-first">Product</div>
                                    <div className="cart-products-container-title-others">Price</div>
                                    <div className="cart-products-container-title-others">Quantity</div>
                                    <div className="cart-products-container-title-last">Total</div>
                                </div>
                                <div>
                                    <div className="products-list-container">
                                        {cartItems.map((item) => (
                                            <div className="product-card-grid" key={item.id}>
                                                <div className="product-block">
                                                    <Link to={`/product/${item.id}`}> 
                                                        <img src={item.images?.[0] || item.image} alt={item.name} />
                                                    </Link>
                                                    <div>
                                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                        <p>{item.category}</p>
                                                        <button onClick={() => removeFromCart(item.id)}>
                                                            <LuTrash2 />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="price-block">
                                                    <span>${item.price?.toFixed(2)}</span>
                                                </div>
                                                <div className="quantity-block-q">
                                                    <div className="quantity-container-q">
                                                        <button onClick={() => decrementQuantity(item.id)}>
                                                            <LuMinus className="p-m-style"/>
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => incrementQuantity(item.id)}>
                                                            <LuPlus className="p-m-style"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="total-block">
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                    <button onClick={() => removeFromCart(item.id)}>
                                                        <LuTrash2 className="trash-icon"/>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="promo-code-container">
                                <h3>Have a promo code?</h3>
                                <div className="promo-code-input-block">
                                    <input 
                                        type="text" 
                                        placeholder="Enter promo code" 
                                        value={promoCode}
                                        onChange={handlePromoInputChange}
                                    />
                                    <button onClick={applyPromoCode}>Apply</button>
                                </div>
                                {promoMessage && (
                                    <p style={{ 
                                        marginTop: '8px', 
                                        color: 'var(--color-gray-600)',
                                        fontSize: '14px'
                                    }}>
                                        {promoMessage}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sum-info-container">
                            <div className="order-summary-container">
                                <h2>Order Summary</h2>
                                <div className="summary-info-block">
                                    <div>
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div>
                                            <span>Discount (10%)</span>
                                            <span>-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div>
                                        <span>Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>  
                                <div className="total-summary-block">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <button className="proceed-to-checkout-btn">
                                    Proceed to Checkout
                                    <LuArrowRight className="arrow-right-icon"/>
                                </button>
                                <button className="continue-shopping-btn">
                                    Continue Shopping
                                </button>
                            </div>
                            <div className="shipping-information-container">
                                <h3>Shipping Information</h3>
                                <div className="shipping-information-blocks">
                                    <div className="marg-bott">
                                        <LuCalendar className="shipping-information-icon"/>
                                        <div className="shipping-info-text-wrapper">
                                            <p className="shipping-info-tittle">Estimated Delivery</p>
                                            <p className="shipping-info-text">3-5 business days</p>
                                        </div>
                                    </div>
                                    <div>
                                        <LuMapPin className="shipping-information-icon"/>
                                        <div className="shipping-info-text-wrapper">
                                            <p className="shipping-info-tittle">Shipping Address</p>
                                            <p className="shipping-info-text">123 Construction Ave Builder City, BC 12345 United States</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}