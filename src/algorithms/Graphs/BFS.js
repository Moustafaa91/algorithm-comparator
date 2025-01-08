// BFS.js
export const BFS = ({ nodes, edges }) => {
  const steps = [];
  const visited = new Set();

  const queue = [];
  if (nodes.length) queue.push(nodes[0].id);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!visited.has(current)) {
      visited.add(current);

      const neighbors = edges
        .filter((edge) => edge.source === current)
        .map((edge) => edge.target);

      queue.push(...neighbors.filter((n) => !visited.has(n)));

      steps.push({
        nodes: [current],
        edges: edges.filter(
          (edge) =>
            edge.source === current && neighbors.includes(edge.target)
        ),
      });
    }
  }

  return steps;
};
