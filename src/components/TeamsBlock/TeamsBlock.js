import Team from "../Team/Team";
import './TeamsBlock.css';
import {useContext, useEffect, useState} from "react";
import DistributionContext from "../../context/DistributionContext";


export default function TeamsBlock() {
    const {state, dispatch} = useContext(DistributionContext)

    // function handleGetSetMask(id) {
    //     let newTeams = structuredClone(teams)
    //     return (teamId, pos, pl) => {
    //         for (let t in newTeams) {
    //             for (let m of newTeams[t]) {
    //                 let p = m.player
    //                 if (p && p.id === pl.id) {
    //                     m.player = null;
    //                 }
    //             }
    //         }
    //         newTeams[teamId][pos].player = pl
    //         setTeams(newTeams);
    //         triger(true)
    //     }
    // }


    return <div className="teams_container">
        <div className="teams_block">
            {state.teams.map(({name, mask}, index) => <Team key={name} id={index}
                                                            name={name}
                                                            mask={mask}/>)}
        </div>
    </div>
}