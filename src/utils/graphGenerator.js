import { nodeDefaults, graphNodesPositions } from "./graphConstants";
import { MarkerType } from "@xyflow/react";

const generateGraph = (levels, connections, directed, weights) => {
    const nodes = [];
    const edges = [];

    levels.forEach((levelNodes, levelIndex) => {
        const y = graphNodesPositions.initialY + levelIndex * graphNodesPositions.paddingSpaceY;
        const levelWidth = (levelNodes.length - 1) * graphNodesPositions.paddingSpaceX;
        const startX = graphNodesPositions.initialX - levelWidth / 2;

        levelNodes.forEach((nodeId, nodeIndex) => {
            const x = startX + nodeIndex * graphNodesPositions.paddingSpaceX;

            // Add the node
            nodes.push({
                id: nodeId,
                position: { x, y },
                data: { label: nodeId },
                ...nodeDefaults,
            });

            // Add edges based on provided connections
            if (connections && connections[nodeId]) {
                connections[nodeId].forEach((targetNodeId, idx) => {
                    edges.push({
                        id: `${nodeId}-${targetNodeId}`,
                        source: nodeId,
                        target: targetNodeId,
                        type: "straight",
                        markerEnd: directed ? {
                            type: MarkerType.ArrowClosed,
                          } : undefined,
                        weight: weights ? weights[nodeId][idx] : 1,
                        label: weights ? weights[nodeId][idx].toString() : undefined,
                    });
                });
            }
        });
    });
    
    return { nodes, edges };
};

const OneConnectedGraph = () => {
    const levels = [
        ["0"],            
        ["7", "1"],      
        ["6", "2"], 
        ["5", "3"],
        ["4"] 
    ];

    const connections = {
        0: ["1", "6", "5"],
        1: ["4", "5"], 
        2: ["7", "3"],
        3: ["2"],
        4: ["6"],
        5: [ "7"],
        6: ["0", "4"],
        7: ["2", "5"], 
    };

    const weights = {
        0: [4, 8, 11],
        1: [8, 2],
        2: [7, 4],
        3: [9],
        4: [10],
        5: [1],
        6: [2, 7],
        7: [6, 14],
    };

    const {nodes, edges } = generateGraph(levels, connections, false, weights);
    return {graph: {nodes, edges}};
};

const TreeGraph = () => {
    const levels = [
        ["A"],            
        ["B", "C"],      
        ["D", "E", "F"], 
        ["G", "H", "I", "J"] 
    ];

    const connections = {
        A: ["B", "C"], 
        B: ["D", "E"], 
        C: ["F"],
        D: ["G"],
        E: ["H", "I"],
        F: ["J"],
    };
    const {nodes, edges } = generateGraph(levels, connections, false);
    return {graph: {nodes, edges}};
};

const TreeMoreDepthGraph = () => {
    const levels = [
        ["A"],            
        ["B", "C"],      
        ["D", "E", "F"], 
        ["G", "H", "I", "J"],
        ["K", "L", "M", "N", "O"],
        ["P", "Q", "R", "S", "T", "U"]
    ];

    const connections = {
        A: ["B", "C"], 
        B: ["D", "E"], 
        C: ["F"],
        D: ["G"],
        E: ["H", "I"],
        F: ["J"],
        G: ["K", "L"],
        H: ["M"],
        I: ["N", "O"],
        K: ["P", "Q", "R"],
        M: ["R", "S"],
        O: ["T", "U"]

    };
    const {nodes, edges } = generateGraph(levels, connections, false);
    return {graph: {nodes, edges}};
};

export const graphGenerators = {
    TreeGraph,
    TreeMoreDepthGraph,
    OneConnectedGraph,
};
