export const DFS = (nodes, edges) => {
    const steps = [];
    const visitedNodes = new Set();
    const visitedEdges = new Set();

    const stack = [];

    // Start DFS from the first node (assuming nodes[0] is the starting point)
    if (nodes.length > 0) {
        stack.push(nodes[0].id);
    }

    while (stack.length > 0) {
        const currentNodeId = stack.pop();

        // Skip if already visited
        if (visitedNodes.has(currentNodeId)) continue;

        // Mark the current node as visited
        visitedNodes.add(currentNodeId);

        // Find neighbors (connected nodes)
        const neighbors = edges
            .filter(edge => edge.source === currentNodeId && !visitedNodes.has(edge.target))
            .map(edge => {
                visitedEdges.add(edge.id);
                return edge.target;
            });

        // Add neighbors to the stack
        stack.push(...neighbors);

        // Record the step
        steps.push({
            visitedNodes: Array.from(visitedNodes),
            visitedEdges: Array.from(visitedEdges),
        });
    }

    return steps;
};
