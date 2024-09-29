import SearchBar from "../SearchBar/SearchBar";
import './SearchBLock.css'
import PlayersList from "../PlayersList/PlayersList";
import {useEffect, useState} from "react";
export default function SearchBLock({list}){
    const [filter, setFilter] = useState("");


    return <div className="search_block_container">
        <SearchBar value={filter} setValue={setFilter}/>
        <PlayersList list={list} filter={filter}/>
    </div>
}