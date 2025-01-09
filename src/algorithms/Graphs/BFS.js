export function BFS(nodes, edges) {
    const steps = [];
    const visitedNodes = new Set();
    const visitedEdges = new Set();

    // Use a queue for BFS
    const queue = [];

    // Start BFS from the first node (assuming nodes[0] is the starting point)
    if (nodes.length > 0) {
        queue.push(nodes[0].id);
    }

    while (queue.length > 0) {
        const currentNodeId = queue.shift();

        // Skip if already visited
        if (visitedNodes.has(currentNodeId)) continue;

        // Mark the current node as visited
        visitedNodes.add(currentNodeId);

        // Find neighbors (connected nodes)
        const neighbors = edges
            .filter(edge => edge.source === currentNodeId)
            .map(edge => {
                visitedEdges.add(edge.id); // Highlight edge 
                queue.push(edge.target); // Add the target to the queue
                return edge.target;
            });

        // Record the step
        steps.push({
            visitedNodes: Array.from(visitedNodes),
            visitedEdges: Array.from(visitedEdges),
        });
    }

    return steps;
};
