import React, {useEffect, useState} from 'react';
import './Team.css';
import {DraggablePlayer} from "../Player/Player";
import Position from "../Position/Position";
import {players} from '../../utils/utils'
import icon from '../../statics/fa-solid_fist-raised.svg';


const Team = ({mask, name, id}) => {

    // useEffect(() => {
    //     if (parent && child){
    //         let index = mask.findIndex(item => item.id === parent);
    //         if(index >= 0 && !mask[index].player) {
    //             let newMask = mask.map(e => ({...e}))
    //             newMask[index].player = players[child]
    //             setMask(id, index, players[child])
    //         }
    //     }
    // }, [mask, parent, child, setMask, id]);

    return (
        <div className="team">
            <div className="header">
                <div className="line"></div>
                <div className="circle">
                    <img className="inner-circle" src={icon} alt={""}/>
                </div>
                <div className="title">{name}</div>
                <div className="line"></div>
            </div>
            <div className="positions">
                {mask.map((player, index) => <Position key={index} pos={index} id={id+"/"+index}>
                    {player ? <DraggablePlayer id={player.id} data={player}/> : null}
                </Position>)}

            </div>
        </div>
    );
};


export default Team;
