import SearchBar from "../SearchBar/SearchBar";
import './SearchBLock.css'
import PlayersList from "../PlayersList/PlayersList";
import {useEffect, useState} from "react";
export default function SearchBLock(){
    return <div className="search_block_container">
        <SearchBar />
        <PlayersList/>
    </div>
}