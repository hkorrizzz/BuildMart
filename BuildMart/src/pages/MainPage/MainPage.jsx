import { LuSlidersHorizontal } from "react-icons/lu";
import { Slider } from '@mui/material';
import { Checkbox } from '@mui/material';
import { useState, useEffect } from "react";

import {Card} from "../../components/card/card";

import "./MainPage.css";
import "./react_MuiSlider.css";
import "./react_MuiCheckbox.css";

import productsJSON from "../../data/products.json";

export const MainPage = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [rating5Stars, setRating5Stars] = useState(false);
    const [rating4Stars, setRating4Stars] = useState(false);
    const [rating3Stars, setRating3Stars] = useState(false);
    const checkboxPossibility = (selectedCheckbox) => {
        setRating5Stars(false);
        setRating4Stars(false);
        setRating3Stars(false);
        switch (selectedCheckbox) {
            case 5: setRating5Stars(true); break;
            case 4: setRating4Stars(true); break;
            case 3: setRating3Stars(true); break;
        }
    }

    const [priceRange, setPriceRange] = useState([0, 349.99]);
    const priceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    }
    
    const clearAllFilters = () => {
        setRating5Stars(false);
        setRating4Stars(false);
        setRating3Stars(false);
        setPriceRange([0, 349.99]);
        setSortBy("name-asc");
        setSearchQuery('');
    }

    useEffect(() => {
        const handleSearch = (e) => {
            setSearchQuery(e.detail);
        };

        window.addEventListener('searchProducts', handleSearch);
        
        return () => {
            window.removeEventListener('searchProducts', handleSearch);
        };
    }, []);
    
    const allProducts = productsJSON.products;
    
    const products = allProducts.filter(product => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesSearch = 
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query);
            if (!matchesSearch) return false;
        }
        
        if (rating5Stars && product.rating < 5) return false;
        if (rating4Stars && product.rating < 4) return false;
        if (rating3Stars && product.rating < 3) return false;
        
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        
        return true;
    });

    const [sortBy, setSortBy] = useState("name-asc");
    
    const sortedProducts = () => {
        const sorted = [...products];
        if (sortBy == "price-asc") return sorted.sort((a, b) => a.price - b.price);
        if (sortBy == "price-desc") return sorted.sort((a, b) => b.price - a.price);
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    const sortProductsChange = (event) => {
        setSortBy(event.target.value);
    }

    return (
        <div className = "main-container">  
            <div className = "title">
                <h1>Building Materials</h1>
                <p>Premium construction supplies for all your projects</p>
            </div>

            <div className = "filters-container">
                <div className = "show-filters-section">
                    <button onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                        <LuSlidersHorizontal />
                        {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}      
                    </button>
                    <p>
                        {searchQuery 
                            ? `Found ${products.length} products for "${searchQuery}"` 
                            : `Showing ${products.length} products`
                        }
                    </p>
                </div>
                <div className = "sort-by-container">
                    <label>Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={sortProductsChange}
                       >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>
            <div className = {`open-filters-container ${isFiltersOpen ? 'show' : 'hide-button'}`}>
                <div className = "open-filters-flex">
                    <div className = "rating-block">
                        <h3 className = "open-filters-title">Minimum Rating</h3>
                        <div className = "rating-block-flex">
                            <div className = "rating-block-element">
                                    <Checkbox 
                                        size="small"
                                        checked = {rating5Stars}
                                        onChange={() => checkboxPossibility(5)}
                                    />
                                    <label>5+ Stars</label>
                                </div>
                                <div className = "rating-block-element">
                                    <Checkbox 
                                        size="small"
                                        checked = {rating4Stars}
                                        onChange={() => checkboxPossibility(4)}
                                    />
                                    <label>4+ Stars</label>
                                </div>
                                <div className = "rating-block-element">
                                    <Checkbox 
                                        size="small"
                                        checked = {rating3Stars}
                                        onChange={() => checkboxPossibility(3)}
                                    />
                                    <label>3+ Stars</label>
                            </div>
                        </div>
                    </div>
                    <div className = "range-block"> 
                        <h3 className = "open-filters-title">Price Range</h3>
                        <Slider 
                            onChange={priceRangeChange}
                            value = {priceRange}
                            min={0}
                            max={349.99}
                            step={10}
                        />
                        <div className = "open-filters-price">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </div>
                    <div className = "clear-button">
                        <button onClick={clearAllFilters}>Clear All Filters</button>
                    </div>  
                </div>
            </div>

            {products.length > 0 ? (
                <div className = "cards-grid-container">
                    {sortedProducts().map((product) => (
                        <Card 
                            key={product.id}
                            id = {product.id}
                            name ={product.name}
                            rating = {product.rating}
                            price = {product.price}
                            category = {product.category}
                            image = {product.images[0]}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-products-block">
                    <p>No products match your filters.</p>
                    <button onClick={clearAllFilters}>Clear filters</button>
                </div>
            )}
        </div>
    );
}