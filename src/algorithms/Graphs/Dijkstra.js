// Dijkstra.js
export function Dijkstra(nodes, edges) {
    const steps = [];
    const distances = {};
    const previous = {};
    const visitedNodes = new Set();
    const visitedEdges = new Set();

    // Initialize distances and previous nodes
    nodes.forEach(node => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
    });

    // Assume the first node is the source
    const source = nodes[0].id;
    distances[source] = 0;

    const priorityQueue = [{ id: source, distance: 0 }];

    while (priorityQueue.length > 0) {
        // Get the node with the smallest distance
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { id: currentNode } = priorityQueue.shift();

        if (visitedNodes.has(currentNode)) continue;
        visitedNodes.add(currentNode);

        // Find neighbors and update distances
        edges
            .filter(edge => edge.source === currentNode && !visitedNodes.has(edge.target))
            .forEach(edge => {
                const targetNode = edge.target;
                const newDist = distances[currentNode] + (edge.weight || 1);

                if (newDist < distances[targetNode]) {
                    distances[targetNode] = newDist;
                    previous[targetNode] = currentNode;

                    // Add neighbor to the priority queue
                    priorityQueue.push({ id: targetNode, distance: newDist });

                    // Record visited edge
                    visitedEdges.add(edge.id);
                }
            });

        // Record the step
        steps.push({
            visitedNodes: Array.from(visitedNodes),
            visitedEdges: Array.from(visitedEdges),
            distances: { ...distances },
        });
    }

    // Prepare the shortest path results
    const shortestPaths = nodes.map(node => {
        const path = [];
        let current = node.id;
        while (current) {
            path.unshift(current);
            current = previous[current];
        }
        return { node: node.id, path, distance: distances[node.id] };
    });

    return { steps, shortestPaths };
}
