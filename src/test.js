import React, { useState } from 'react';
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    closestCenter,
    KeyboardSensor,
    useDroppable,
    useDraggable,
    DragOverlay,
    defaultDropAnimation,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Draggable item component
function DraggableItem({ id, text }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        border: '1px solid black',
        marginBottom: '4px',
        backgroundColor: 'white',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {text}
        </div>
    );
}

// Droppable list component
function DroppableList({ id, items, setItems }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} style={{ padding: '16px', border: '1px solid black' }}>
            {items.map((item) => (
                <DraggableItem key={item.id} id={item.id} text={item.text} />
            ))}
        </div>
    );
}

// Main component
export default function DragAndDrop() {
    const [list1, setList1] = useState([
        { id: '1', text: 'Item 1' },
        { id: '2', text: 'Item 2' },
    ]);
    const [list2, setList2] = useState([
        { id: '3', text: 'Item 3' },
        { id: '4', text: 'Item 4' },
    ]);

    const [activeId, setActiveId] = useState(null);
    const activeItem =
        [...list1, ...list2].find((item) => item.id === activeId) || null;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const sourceList = list1.find((item) => item.id === active.id)
            ? list1
            : list2;
        const destinationList = over.id === 'list1' ? list1 : list2;
        const setSourceItems = over.id === 'list1' ? setList2 : setList1;
        const setDestinationItems = over.id === 'list1' ? setList1 : setList2;

        if (sourceList === destinationList) {
            return;
        }

        const movedItem = sourceList.find((item) => item.id === active.id);
        setSourceItems(sourceList.filter((item) => item.id !== active.id));
        setDestinationItems([...destinationList, movedItem]);
    };

    const handleDragEnd = () => {
        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div style={{ }}>
                <DroppableList id="list1" items={list1} setItems={setList1} />
                <DroppableList id="list2" items={list2} setItems={setList2} />
            </div>

            <DragOverlay dropAnimation={defaultDropAnimation}>
                {activeItem ? (
                    <div
                        style={{
                            padding: '8px',
                            border: '1px solid black',
                            backgroundColor: 'lightgray',
                        }}
                    >
                        {activeItem.text}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
