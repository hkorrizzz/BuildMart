import { LuArrowRight, LuMinus, LuCalendar, LuMapPin, LuPlus, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router-dom"; 
import { useParams } from "react-router-dom"; 
import { useState } from "react";
import "./CartPage_isEmpty.css";
import "./CartPage.css";

export const CartPage = () => {
    const { id } = useParams();

    const [num, setNum] = useState(1);
    const [total, setTotal] = useState(10.00);
    const incNum = () => {
        setNum(num + 1);
        totalCalc(1);
    }
    const decNum = () => {
        if (num > 1) {
            setNum(num - 1);
            totalCalc(0);
        }
    }
    const totalCalc = (n) =>{
        setTotal(n === 1 ? total + 10.00 : total - 10.00);
    }
    return (
        <>
            <div className="cartPage-isEmpty-container hidden">
                <h1>Your Cart is Empty</h1>
                <p>Start shopping to add items to your cart</p>
                <Link to="/">
                    <div className="return-btn">
                        Browse Products
                        <LuArrowRight className = "arrow-right-icon"/>
                    </div>
                </Link>
            </div>
            
            <div className="cartPage-container">
                <h1>
                    Shopping Cart
                </h1>
                <div className="shopping-cart-grid">
                    <div className="flex-column-block">
                    <div className="cart-products-container">
                        <div className="cart-products-container-title">
                            <div className = "cart-products-container-title-first">
                                Product
                            </div>
                            <div className = "cart-products-container-title-others">Price</div>
                            <div className = "cart-products-container-title-others">Quantity</div>
                            <div className = "cart-products-container-title-last">Total</div>
                        </div>
                        <div>
                            <div className ="products-list-container">
                                <div className="product-card-grid">
                                    <div className="product-block">
                                        <Link to={`/product/${id}`}> 
                                            <img src="https://images.unsplash.com/photo-1718117075248-3d3c3cd65264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBjZW1lbnQlMjBiYWdzJTIwd2FyZWhvdXNlfGVufDF8fHx8MTc3MTE4NDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"></img>
                                        </Link>
                                        <div>
                                            <Link to={`/product/${id}`}>
                                                Premium Cement Bags
                                            </Link>
                                            <p>
                                                Cement & Concrete
                                            </p>
                                            <button>
                                                <LuTrash2  className=""/>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className = "price-block">
                                        <span className="price-block-txt">Price:</span>
                                        <span className="price-block-pr">$24.99</span>
                                    </div>
                                    <div className="quantity-block-q">
                                        <div className="quantity-container-q">
                                            <button onClick={decNum}>
                                                <LuMinus className = "p-m-style"/>
                                            </button>
                                            <span>{num}</span>
                                            <button onClick={incNum}>
                                                <LuPlus className = "p-m-style"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="total-block">
                                        <p className="price-block-txt">Total:</p>
                                        <span>
                                            ${total.toFixed(2)}
                                        </span>
                                        <button>
                                            <LuTrash2  className="trash-icon"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="promo-code-container">
                                <h3>Have a promo code?</h3>
                                <div className="promo-code-input-block">
                                    <input type="text" placeholder="Enter promo code"></input>
                                    <button>
                                        Apply
                                    </button>
                                </div>
                    </div>
                    </div>

                    <div className="sum-info-container">
                        <div className="order-summary-container">
                            <h2>Order Summary</h2>
                            <div className="summary-info-block">
                                <div>
                                    <span>
                                        Subtotal
                                    </span>
                                    <span>
                                        $45.66
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Tax (8%)
                                    </span>
                                    <span>
                                        $8.00
                                    </span>
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
        </>
    );
}