import { nodeDefaults, graphNodesPositions } from "./graphConstants";
import { MarkerType } from "@xyflow/react";

const generateGraph = (levels, connections, directed, weights) => {
    const nodes = [];
    const edges = [];

    // Level are just for drawing, it's not part of graph it self

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

const WeightedGraphForDijkstra = () => {
    const levels = [
        ["1","2", "3"],            
        ["0", "8", "4"],      
        ["7", "6" , "5"],
    ];

    const connections = {
        0: ["1", "7"],
        1: ["0", "7" , "2"], 
        2: ["1", "3" , "8" , "5"],
        3: ["2" , "5" , "4"],
        4: ["3" , "5"],
        5: ["6", "2" , "3" , "4"],
        6: ["7", "8" , "5"],
        7: ["0", "1" , "8" , "6"], 
    };

    const weights = {
        0: [4, 8],
        1: [4, 11, 8],
        2: [8, 7, 2, 4],
        3: [7, 14, 9],
        4: [9, 10],
        5: [2, 4, 14, 10],
        6: [1, 6, 2],
        7: [8, 11, 7, 1],
    };

    const {nodes, edges } = generateGraph(levels, connections, false, weights);
    return {graph: {nodes, edges}};
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
        5: ["7"],
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
    WeightedGraphForDijkstra
};
