import { nodeDefaults, graphNodesPositions } from "./graphConstants";
import { MarkerType } from "@xyflow/react";

export const generateGraph = (levels, connections, directed) => {
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
                connections[nodeId].forEach((targetNodeId) => {
                    edges.push({
                        id: `${nodeId}-${targetNodeId}`,
                        source: nodeId,
                        target: targetNodeId,
                        type: "straight",
                        markerEnd: directed ? {
                            type: MarkerType.ArrowClosed,
                          } : undefined,
                    });
                });
            }
        });
    });
    
    return { nodes, edges };
};

export const generateBFSGraph = () => {
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

export const generateDFSGraph = () => {
    const levels = [
        ["A"],            
        ["B", "C"],      
        ["D", "E", "F"], 
        ["G", "H", "I", "J"],
        ["K", "L", "M", "N", "O"] 
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
    };
    const {nodes, edges } = generateGraph(levels, connections, false);
    return {graph: {nodes, edges}};
};