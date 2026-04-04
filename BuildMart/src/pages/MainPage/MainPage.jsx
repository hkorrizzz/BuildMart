import { LuSlidersHorizontal } from "react-icons/lu";
import { Slider } from '@mui/material';
import { Checkbox } from '@mui/material';

import { useState } from "react";

import {Card} from "../../components/card/card";

import "./MainPage.css"
import "./react_MuiSlider.css"
import "./react_MuiCheckbox.css"

export const MainPage = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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
    }
    

    



    return (
        <div className = "main-container">
            <div className = "title">
                <h1>Building Materials</h1>
                <p>Premium construction supplies for all your projects</p>
            </div>
            <div className = "filters-container">
                <div class = "show-filters-section">
                    <button onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                        <LuSlidersHorizontal />
                        {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}      
                    </button>
                    <p>Showing 6 products</p>
                </div>
                <div class = "sort-by-container">
                    <label>Sort by:</label>
                    <select>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>
            <div className = {`open-filters-container ${isFiltersOpen ? 'show' : 'hide-button'}`}>
                <div class = "open-filters-flex">
                    <div class = "rating-block">
                        <h3 class = "open-filters-title">Minimum Rating</h3>
                        <div class = "rating-block-flex">
                            <div class = "rating-block-element">
                                    <Checkbox 
                                        defaultChecked size="small"
                                        checked = {rating5Stars}
                                        onChange={() => checkboxPossibility(5)}
                                    />
                                    <label>5+ Stars</label>
                                </div>
                                <div class = "rating-block-element">
                                    <Checkbox 
                                        defaultChecked size="small"
                                        checked = {rating4Stars}
                                        onChange={() => checkboxPossibility(4)}
                                    />
                                    <label>4+ Stars</label>
                                </div>
                                <div class = "rating-block-element">
                                    <Checkbox 
                                        defaultChecked size="small"
                                        checked = {rating3Stars}
                                        onChange={() => checkboxPossibility(3)}
                                    />
                                    <label>3+ Stars</label>
                            </div>
                        </div>
                    </div>
                    <div class = "range-block"> 
                        <h3 class = "open-filters-title">Price Range</h3>
                        <Slider 
                            onChange={priceRangeChange}
                            value = {priceRange}
                            min={0}
                            max={349.99}
                            step={10}
                        />
                        <div class = "open-filters-price">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </div>
                    <div class = "clear-button">
                        <button onClick={clearAllFilters}>Clear All Filters</button>
                    </div>  
                </div>
            </div>
            <div  className = "cards-grid-container">
                    {[...Array(6)].map((_, index) => (
                    <Card key={index} />
                ))}
            </div>
        </div>
    );
}