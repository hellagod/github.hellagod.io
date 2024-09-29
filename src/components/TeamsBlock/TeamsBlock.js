import Team from "../Team/Team";
import './TeamsBlock.css';
import {useEffect, useState} from "react";


let teams_names = [1, 2, 3, 4, 5]
export default function TeamsBlock({parent, child, teams, setTeams, triger, dropOutside}) {

    function handleGetSetMask(id) {
        let newTeams = structuredClone(teams)
        return (teamId, pos, pl) => {
            for (let t in newTeams) {
                for (let m of newTeams[t]) {
                    let p = m.player
                    if (p && p.id === pl.id) {
                        m.player = null;
                    }
                }
            }
            newTeams[teamId][pos].player = pl
            setTeams(newTeams);
            triger(true)
        }
    }

    useEffect(() => {
        let masks = {}
        for (let t of teams_names) {
            masks["team" + t] = [
                {id: "team" + t + 'pos_1', pos: 'pos 1', player: null},
                {id: "team" + t + 'pos_2', pos: 'pos 2', player: null},
                {id: "team" + t + 'pos_3', pos: 'pos 3', player: null},
                {id: "team" + t + 'pos_4', pos: 'pos 4', player: null},
                {id: "team" + t + 'pos_5', pos: 'pos 5', player: null}
            ]
        }
        setTeams(masks)
    }, [setTeams]);

    useEffect(() => {

    }, [dropOutside])


    return <div className="teams_container">
        <div className="teams_block">
            {teams && teams_names.map(t => <Team key={t} id={"team" + t} parent={parent} child={child}
                                                 mask={teams["team" + t]}
                                                      setMask={handleGetSetMask("team" + t)}/>)}
        </div>
    </div>
}