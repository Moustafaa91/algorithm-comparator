import { Position } from "@xyflow/react";


export const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
        borderRadius: '100%',
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export const graphNodesPositions = {
    paddingSpaceX: 100, 
    paddingSpaceY: 150,
    initialX: 50,
    initialY: 50
}

