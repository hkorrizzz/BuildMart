import { LuShoppingCart } from "react-icons/lu";
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import "./card.css"

export const Card = () => {
  return (
    <div className="card-container">
        <a href="">
            <div className="img-block">
                <img 
                src="https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBjb25zdHJ1Y3Rpb24lMjBzdXBwbGllc3xlbnwxfHx8fDE3NzExODUyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                />  
            </div>
        </a>
        <div className="text-block">
            <a href="">
                <h3>
                    Exterior Paint Set
                </h3>
            </a>
            <div className="card-rating-block">
                <FaStar color="#ffc107" />
                <FaStar color="#ffc107" />
                <FaStar color="#ffc107" />
                <FaStarHalf color="#ffc107" />
                <FaRegStar color="#e4e5e9" />
                <span>(3.5)</span>
            </div>
            <p className="price-txt">
                $45.99
            </p>
            <p className="category-txt">
                Paint & Coatings
            </p>
            <button className="text-block-button">
                <LuShoppingCart/>
                Add to Cart 
            </button>
        </div>
    </div>
  );
}