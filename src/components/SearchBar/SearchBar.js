import React, {useContext, useEffect, useState} from 'react';
import './SearchBar.css';
import searchIcon from '../../statics/search.png';
import filterIcon from '../../statics/filter.svg';
import DistributionContext from "../../context/DistributionContext";
import AnimateHeight from 'react-animate-height';
import ReactSlider from 'react-slider'

const SearchBar = () => {
    const {state, dispatch} = useContext(DistributionContext)
    const [isOpen, setIsOpen] = useState(true)
    const [poss, setPoss] = useState([false, false, false, false, false])

    useEffect(() => {
        dispatch({type: 'filter_pos', mask: poss})
    }, [dispatch, poss]);

    console.log(state.stats.minMmr, state.stats.maxMmr, state.stats.currentLowMmr, state.stats.currentHighMmr)

    return <div className="filter_full">
        <AnimateHeight
            duration={300}
            height={isOpen ? 'auto' : 0}
        >
            <div style={{display: "flex", gap: "20px",paddingTop: "20px"}}>
                {/*<div style={{color: "rgb(220, 220, 220)"}} className="font_d"></div>*/}
                <ReactSlider
                    className="custom-slider"
                    thumbClassName="custom-thumb"
                    trackClassName="custom-track"
                    defaultValue={[state.stats.currentLowMmr, state.stats.currentHighMmr]}
                    min={state.stats.minMmr}
                    max={state.stats.maxMmr}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    renderThumb={(props, state) => <div {...props}><div>{state.valueNow}</div></div>}
                    onChange={([min, max]) => dispatch({type: 'filter_mmr', min, max})}
                    pearling
                    withTracks
                    value={[state.stats.currentLowMmr, state.stats.currentHighMmr]}
                    minDistance={50}
                />
            </div>
            <div className="filter_secret">
                {poss.map((p, index) => <div
                    className={`pos_item ${p ?'pos_item_active' : ''}`}
                    onClick={() => {
                        let newPoss = [...poss]
                        newPoss[index] = !p
                        setPoss(newPoss)
                    }}
                >
                    {'pos ' + (index + 1)}
                </div>)}
            </div>
        </AnimateHeight>
        <div className="filter">
            <div className="search_bar">
                <div className="search_bar_container">
                    <div className="search_bar_icon_container">
                        <img className="search_bar_icon" src={searchIcon} alt={""}/>
                    </div>
                    <input className="search_bar_text"
                           placeholder="Search"
                           value={state.filter.text}
                           onChange={e => dispatch({type: 'filter_text', value: e.target.value})}/>
                </div>
            </div>
            <div className={`filter_button ${isOpen ? 'filter_button_active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <img className="" src={filterIcon} alt={""}/>
            </div>
        </div>
    </div>
};

export default SearchBar;