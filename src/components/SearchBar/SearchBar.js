import React from 'react';
import './SearchBar.css';
import icon from '../../statics/search.png';

const SearchBar = ({value, setValue}) => {
    return (
        <div className="search_bar">
            <div className="search_bar_container">
                <div className="search_bar_icon_container">
                    <img className="search_bar_icon" src={icon}/>
                </div>
                <input className="search_bar_text" placeholder="Search" value={value} onChange={e=> setValue(e.target.value)}/>
            </div>
        </div>
    );
};

export default SearchBar;