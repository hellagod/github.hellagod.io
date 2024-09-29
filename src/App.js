import './App.css';
import TeamsBlock from "./components/TeamsBlock/TeamsBlock";
import SearchBLock from "./components/SearchBlock/SearchBLock";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {useCallback, useEffect, useState} from "react";
import {players} from "./utils/utils";
import {Player} from "./components/Player/Player";
import {
    snapCenterToCursor,
} from '@dnd-kit/modifiers';

function App() {
    const [parent, setParent] = useState(null);
    const [child, setChild] = useState(null);
    const [playersList, setPlayersList] = useState(Object.values(players));
    const [teamsList, setTeamsList] = useState(null);
    const [detectedDND, setDetectedDND] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [dropZoneRect, setDropZoneRect] = useState(undefined);
    const [dropOutside, setDropOutside] = useState(null)


    useEffect(() => {
        if (teamsList && detectedDND) {
            let a = [];
            for (let tn in teamsList) {
                Object.keys(teamsList[tn]).forEach((k, i) => {
                    let nv = teamsList[tn][k].player;
                    if (nv)
                        a.push(teamsList[tn][k].player)
                })
            }
            console.log(teamsList)
            a = a.map(v => v.id);
            let newPlayersList = structuredClone(playersList);
            newPlayersList = newPlayersList.filter(v => !a.includes(v.id));
            console.log(
                newPlayersList
            )
            setPlayersList(newPlayersList)
            setDetectedDND(false)
        }
    }, [detectedDND, playersList, teamsList]);


    function handleDragEnd({over, active}) {
        if (over?.id) {
            console.log({
                visibility: "hidden",
                position: "fixed",
                top: `${over.rect.top}px`,
                left: `${over.rect.left}px`,
                width: `${over.rect.width}px`,
            })
            setDropZoneRect({
                visibility: "hidden",
                position: "fixed",
                top: `${over.rect.top}px`,
                left: `${over.rect.left}px`,
                width: `${over.rect.width}px`,
            });
        }
        else {
            setDropOutside(active.id)
        }
        setActiveId(null)
        setParent(over ? over.id : null);
        requestAnimationFrame(() => setDropZoneRect(undefined));
    }

    function handleDragStart(id) {
        setActiveId(id.active.id)
        setChild(id ? id.active.id : null);
        console.log('rrrrr')
    }

    function handleDragCancel(id) {
        console.log('cancel')
    }

    return <div className="main_container">
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragCancel={handleDragCancel}>
            <TeamsBlock parent={parent} child={child}
                        teams={teamsList} setTeams={setTeamsList}
                        triger={setDetectedDND} dropOutside={dropOutside}/>
            <SearchBLock list={playersList}/>
            <DragOverlay
                dropAnimation={null}
            >
                 <Player id={activeId} data={players[activeId]} className="cliped" style={{
                     width: '250px'
                 }} />
            </DragOverlay>
        </DndContext>
    </div>
}

export default App;
