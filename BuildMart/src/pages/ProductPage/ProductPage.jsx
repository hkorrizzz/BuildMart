import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import { LuPackage, LuTruck, LuShield} from "react-icons/lu"; 
import { LuShoppingCart } from "react-icons/lu";
import { LuChevronDown } from "react-icons/lu";
import { useState } from "react";
import { Card } from "../../components/card/card";

import "./ProductPage.css"

import productsJSON from "../../data/products.json";

export const ProductPage = () => {
    const [num, setNum] = useState(1);
    const incNum = () => {
        setNum(num + 1);
    }
    const decNum = () => {
        if (num > 1) {
            setNum(num - 1);
        }
    }
    
    const outputStars = (nowRating) => {
        const fullStars = Math.floor(nowRating);
        const halfStar = (nowRating % 1) !== 0;
        const emptyStars = () => {
            if (halfStar) return 5-fullStars-1;
            return 5-fullStars;
        }
        return(
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} color="#ffc107" className="rating-icon"/>
                ))}
                {halfStar && (
                    <FaStarHalf key="half" color="#ffc107" className="rating-icon"/>
                )}
                {[...Array(emptyStars())].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} color="#e4e5e9" className="rating-icon"/>
                ))}
            </>
        );
    }
    
    const s = productsJSON.products;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const productImages = [
        "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBjb25zdHJ1Y3Rpb24lMjBzdXBwbGllc3xlbnwxfHx8fDE3NzExODUyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnN8ZW58MXx8fDE3NzExODUyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZ3xlbnwxfHx8fDE3NzExODUyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ];
        //"https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBjb25zdHJ1Y3Rpb24lMjBzdXBwbGllc3xlbnwxfHx8fDE3NzExODUyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        //"https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBjb25zdHJ1Y3Rpb24lMjBzdXBwbGllc3xlbnwxfHx8fDE3NzExODUyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === productImages.length - 1 ? 0 : prev + 1
        );
    }
    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? productImages.length - 1 : prev - 1
        );
    }
    const selectImage = (index) => {
        setCurrentImageIndex(index);
    }
    
    return (
        <div className="productPage-container">
            <nav>
                <a href="/">Products</a>
                <span>/</span>
                <span style={{ color: "var(--color-gray-900)" }}>Exterior Paint Set</span>
            </nav>
            
            <div className="productPage-info-container">
                <div>
                    <div className="main-img">
                        <img src={productImages[currentImageIndex]} />
                        
                        <button className="left-button" onClick={prevImage}>
                            <LuChevronLeft className="chevron-icon"/>
                        </button>
                        <button className="right-button" onClick={nextImage}>
                            <LuChevronRight className="chevron-icon"/>
                        </button>
                    </div>
                    <div className="other-imgs">
                        <button onClick={() =>selectImage(0)}>
                            <img src={productImages[0]}></img>
                        </button>
                        <button onClick={() =>selectImage(1)}>
                            <img src={productImages[1]}></img>
                        </button>
                        <button onClick={() =>selectImage(2)}>
                            <img src={productImages[2]}></img>
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className="product-tittle">Exterior Paint Set</h1>
                    <div className="stars-section">
                        {outputStars(3.5)}
                        <span>(3.5)</span>
                    </div>
                    <div className="price-section">
                        <span className="price-font">$45.99</span>
                        <span className="unit-font">/unit</span>
                    </div>
                    <div className="features-container">
                        <div className="sub-features-container">
                            <LuPackage className="features-icon"/>
                            <div>
                                <p className="feature-tittle">Quality Assured</p>
                                <p className="feature-description">Premium grade material</p>
                            </div>
                        </div>
                        <div className="sub-features-container">
                            <LuTruck className="features-icon"/>
                            <div>
                                <p className="feature-tittle">Fast Delivery</p>
                                <p className="feature-description">2-5 business days</p>
                            </div>
                        </div>
                        <div className="sub-features-container">
                            <LuShield className="features-icon"/>
                            <div>
                                <p className="feature-tittle">Warranty</p>
                                <p className="feature-description">30-day guarantee</p>
                            </div>
                        </div>
                    </div>
                    <div className="quantity-container">
                        <label>Quantity</label>
                        <div className="quantity-elements-block">
                            <button onClick={decNum}>-</button>
                            <input type="number" min="1" value={num} readOnly />
                            <button onClick={incNum}>+</button>
                        </div>
                    </div>
                    <button className="add-to-card-btn">
                        <LuShoppingCart className="shoppingCart-icon"/>
                        Add to Cart 
                    </button>
                    <button className="buy-now-btn">
                        Buy Now
                    </button>
                    <div className="description-container">
                        <h2>Description</h2>
                        <p>
                            Professional-grade exterior paint set designed to withstand harsh weather conditions. This premium paint offers excellent coverage, durability, and color retention. Perfect for residential and commercial exterior surfaces.
                        </p>
                    </div>
                    
                    <details className="specifications-container">
                        <summary className="typeCloth">
                            <span>Technical Specifications</span>
                            <LuChevronDown className="accordion-icon" />
                        </summary>
                        <div className="open-specifications-container">
                            <dl className="open-specifications-grid">
                                <div className="specifications-element">
                                    <dt>Volume</dt>
                                    <dd>5 gallons total</dd>
                                </div>
                                <div className="specifications-element">
                                    <dt>Type</dt>
                                    <dd>100% Acrylic Latex</dd>
                                </div>
                                <div className="specifications-element">
                                    <dt>Coverage</dt>
                                    <dd>400 sq ft per gallon</dd>
                                </div>
                                <div className="specifications-element">
                                    <dt>Finish</dt>
                                    <dd>Satin</dd>
                                </div>
                                <div className="specifications-element">
                                    <dt>Dry Time</dt>
                                    <dd>2-4 hours</dd>
                                </div>
                                <div className="specifications-element">
                                    <dt>Colors</dt>
                                    <dd>Assorted neutral tones</dd>
                                </div>
                            </dl>
                        </div>
                    </details>
                    
                </div>  
            </div>

            <div className="related-products-container">
                <h2>Related Products</h2>
                <div className="related-products-grid">
                    {s.map((product) => (
                        <Card 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            rating={product.rating}
                            price={product.price}
                            category={product.category}
                            image={product.images[0]}
                         />
                    ))}
                </div>
            </div>
        </div>
    );
}