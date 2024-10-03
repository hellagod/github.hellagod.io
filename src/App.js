import './App.css';
import TeamsBlock from "./components/TeamsBlock/TeamsBlock";
import SearchBLock from "./components/SearchBlock/SearchBLock";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {useCallback, useEffect, useReducer, useState} from "react";
import {players} from "./utils/utils";
import {Player} from "./components/Player/Player";
import {
    snapCenterToCursor,
} from '@dnd-kit/modifiers';
import DistributionContext from "./context/DistributionContext";
import {distributionInit, distributionReducer} from "./context/reducer";

function App() {
    const [state, dispatch] = useReducer(distributionReducer, null, () => distributionInit);
    const [activeId, setActiveId] = useState(null);


    function handleDragEnd({over, active}) {
        if (over?.id) {
            if (over.id === 'players_list') {
                dispatch({type: 'back_to_list', playerId: active.id})
            } else {
                let [teamId, pos] = over.id.split('/')
                dispatch({type: 'to_team', teamId, pos, playerId: active.id})
            }
        }
        setActiveId(null)
    }


    function handleDragStart(id) {
        setActiveId(id.active.id)
    }


    return <div className="main_container">
        <DistributionContext.Provider value={{state, dispatch}}>
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <TeamsBlock/>
                <SearchBLock/>
                <DragOverlay>
                    <Player id={activeId} data={players[activeId]} className="cliped" style={{
                        width: '230px'
                    }}/>
                </DragOverlay>
            </DndContext>
        </DistributionContext.Provider>
    </div>
}

export default App;
