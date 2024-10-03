import {DraggablePlayer} from "../Player/Player";
import React, {useContext, useEffect, useState} from "react";
import './PlayersList.css'
import {useDroppable} from "@dnd-kit/core";
import DistributionContext from "../../context/DistributionContext";

export default function PlayersList() {
    const {state} = useContext(DistributionContext)
    const [filteredList, setFilteredList] = useState(state.playersList)
    const {setNodeRef} = useDroppable({
        id: 'players_list',
    });


    useEffect(() => {
            let newFilteredList = state.playersList
            if (state.filter.text !== "") {
                newFilteredList = newFilteredList.filter(p => p.name.toLowerCase().includes(state.filter.text.toLowerCase()))
            }
            if (state.filter.pos.length !== 0) {
                newFilteredList = newFilteredList.filter(p => state.filter.pos.includes(p.pos))
            }

            if (state.stats.currentLowMmr && state.stats.currentHighMmr) {
                newFilteredList = newFilteredList.filter(p => state.stats.currentLowMmr <= p.score <= state.stats.currentHighMmr)
            }

            setFilteredList(newFilteredList)

        }, [state.filter, state.playersList, state.stats.currentHighMmr, state.stats.currentLowMmr]
    )
    return <div ref={setNodeRef} className="players_list_container">
        {filteredList.map((p) =>
            <DraggablePlayer
                key={p.id}
                data={p}
                id={p.id}
            />)}
    </div>

}