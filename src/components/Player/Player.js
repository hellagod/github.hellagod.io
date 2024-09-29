import React, {forwardRef} from "react";
import './Player.css'
import {useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

const Player = forwardRef(({children, data, ...props}, ref) => {
    return <div {...props} ref={ref} className={"player "}>
        <img className="player-img" src={data.img} alt={data.name}/>
        <div className="player-info">
            <div className="player-header">
                <div className="player-name">{data.name}</div>
                {/*<div className="pos-circle"></div>*/}
                <div className="player-pos">{'pos ' + data.pos}</div>
            </div>
            <div className="player-points">{data.score}</div>
        </div>
    </div>

});

function DraggablePlayer(props) {
    const {attributes, listeners, setNodeRef, isDragging} = useDraggable({
        id: props.id,
    });

    return (
        <Player ref={setNodeRef} {...attributes} {...listeners} data={props.data}
                style={(isDragging ? {
                    opacity: '0.5',
                } : {})}
        />
    )
}

// const Player = ({data, id, className, style}) => {
//     const {attributes, listeners, setNodeRef, transform} = useDraggable({
//         id: id,
//     });
//     const styleOwn = {
//         transform: CSS.Translate.toString(transform)
//     };
//
//     return (
//         <div {...listeners} {...attributes}
//              className={"player "}
//              ref={setNodeRef} style={(style ? style : styleOwn)}>
//             <img className="player-img" src={data.img} alt={data.name}/>
//             <div className="player-info">
//                 <div className="player-header">
//                     <div className="player-name">{data.name}</div>
//                     {/*<div className="pos-circle"></div>*/}
//                     <div className="player-pos">{'pos ' + data.pos}</div>
//                 </div>
//                 <div className="player-points">{data.score}</div>
//             </div>
//         </div>
//     );
// };

export {Player, DraggablePlayer};
