import React from "react";
import './Position.css';
import {useDroppable} from "@dnd-kit/core";


const Position = ({pos, id, children}) => {
    const {isOver, setNodeRef} = useDroppable({
        id: id,
    });
    const style = {
        background: isOver && !children ? '#1d1f28' : '#101116',
    };

    return <div ref={setNodeRef} className="position" style={style}>
        { children ? children : <div className="pos">{pos}</div>}
    </div>

};
export default Position;