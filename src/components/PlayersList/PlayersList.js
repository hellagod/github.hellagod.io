import {DraggablePlayer, Player} from "../Player/Player";
import React, {useEffect, useState} from "react";
import './PlayersList.css'

export default function PlayersList({list, filter}) {

    const [filteredList, setFilteredList] = useState(list)

    useEffect(() => {
        console.log('f')
        if (filter !== ''){
            setFilteredList(list.filter(p => p.name.toLowerCase().includes(filter) || ('pos '+ p.pos).toLowerCase().includes(filter.toLowerCase())))
        }
        else {
            setFilteredList(list)
        }
        }, [filter, list]
    )
    return <div className="players_list_container">
        {filteredList.map((p, index) =>
            <DraggablePlayer
                key={p.id}
                data={p}
                id={p.id}
            />)}
    </div>

}