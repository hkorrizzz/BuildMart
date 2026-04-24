import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import { LuPackage, LuTruck, LuShield} from "react-icons/lu"; 
import { LuShoppingCart } from "react-icons/lu";
import { LuChevronDown } from "react-icons/lu";
import { useState } from "react";
import { useParams } from "react-router-dom"; 
import { Card } from "../../components/card/card";
import { Link } from "react-router-dom"; 

import "./ProductPage.css"

import productsJSON from "../../data/products.json";

export const ProductPage = () => {
    const { id } = useParams();
    const product = productsJSON.products.find(p => p.id === parseInt(id));

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
    
    const relatedProducts = () => {
        const currentProduct = productsJSON.products.find(p => p.id === parseInt(id));
        if (!currentProduct || !currentProduct.relatedProductIds) return [];
    
         return productsJSON.products.filter(product => 
        currentProduct.relatedProductIds.includes(product.id));
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const productImages = product.images;
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
                <Link to="/">Products</Link>
                <span>/</span>
                <span style={{ color: "var(--color-gray-900)" }}>{product.name}</span>
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
                        <button onClick={() =>selectImage(0)} className = {currentImageIndex === 0 ? 'active-img' : ''}>
                            <img src={productImages[0]}></img>
                        </button>
                        <button onClick={() =>selectImage(1)} className = {currentImageIndex === 1 ? 'active-img' : ''}>
                            <img src={productImages[1]}></img>
                        </button>
                        <button onClick={() =>selectImage(2)} className = {currentImageIndex === 2 ? 'active-img' : ''}>
                            <img src={productImages[2]}></img>
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className="product-tittle">{product.name}</h1>
                    <div className="stars-section">
                        {outputStars(product.rating)}
                        <span>({product.rating})</span>
                    </div>
                    <div className="price-section">
                        <span className="price-font">${product.price}</span>
                        <span className="unit-font">/unit</span>
                    </div>
                    <div className="features-container">
                        <div className="sub-features-container">
                            <LuPackage className="features-icon"/>
                            <div>
                                <p className="feature-tittle">Quality Assured</p>
                                <p className="feature-description">{product.features["Quality Assured"]}</p>
                            </div>
                        </div>
                        <div className="sub-features-container">
                            <LuTruck className="features-icon"/>
                            <div>
                                <p className="feature-tittle">Fast Delivery</p>
                                <p className="feature-description">{product.features["Fast Delivery"]}</p>
                            </div>
                        </div>
                        <div className="sub-features-container">
                            <LuShield className="features-icon"/>
                            <div>
                                <p className="feature-tittle">Warranty</p>
                                <p className="feature-description">{product.features["Warranty"]}</p>
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
                            {product.description}
                        </p>
                    </div>
                    
                    <details className="specifications-container">
                        <summary className="typeCloth">
                            <span>Technical Specifications</span>
                            <LuChevronDown className="accordion-icon" />
                        </summary>
                        <div className="open-specifications-container">
                            <dl className="open-specifications-grid">
                                {product.specifications.map((spec, index) => (
                                    <div className="specifications-element" key={index}>
                                        <dt>{spec.label}</dt>
                                        <dd>{spec.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </details>
                </div>  
            </div>

            <div className="related-products-container">
                <h2>Related Products</h2>
                <div className="related-products-grid">
                    {relatedProducts().map((product) => (
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