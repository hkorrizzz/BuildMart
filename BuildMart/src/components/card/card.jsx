import { LuShoppingCart } from "react-icons/lu";
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import { Link } from "react-router-dom"; 
import "./card.css"

export const Card = ({id, name, rating, price, category, image}) => {

    const outputStars = (nowRating) => {
        const fullStars = Math.floor(nowRating);;
        const halfStar = (nowRating % 1) !== 0;
        const emptyStars = () => {
            if (halfStar) return 5-fullStars-1;
            return 5-fullStars;
        }
        return(
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} color="#ffc107" />
                ))}
                {halfStar && (
                    <FaStarHalf key="half" color="#ffc107" />
                )}
                {[...Array(emptyStars())].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} color="#e4e5e9" />
                ))}
            </>
        );
    }

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};

        if (cart[id]) {
            cart[id].quantity += 1;
        } else {
            cart[id] = {
                id: id,
                quantity: 1 
            };
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    return (
    <div className="card-container">
       
             <Link to={`/product/${id}`}> 
            <div className="img-block">
                <img 
                src={image}
                />  
            </div>
            </Link>
        
        <div className="text-block">
            <Link to={`/product/${id}`}> 
                <h3>
                    {name}
                </h3>
            </Link>
            <div className="card-rating-block">
                {outputStars(rating)}
                <span>({rating})</span>
            </div>
            <p className="price-txt">
                ${price}
            </p>
            <p className="category-txt">
                {category}
            </p>
            <button className="text-block-button" onClick={handleAddToCart}>
                <LuShoppingCart/>
                Add to Cart 
            </button>
        </div>
    </div>
  );
}