import { Position  } from "@xyflow/react";

const nodeDefaults = {
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

  const paddingSpace = 50;
  const initialX = 50;
  const initialY = 50;

export const generateBFSGraph = () => {
    const graph = {
        nodes: [
          { id: "A" , position: { x: 50, y: 50 }, data: { label: "A" }, ...nodeDefaults, },
          { id: "B" , position: { x: 0, y: 100 }, data: { label: "B" }, ...nodeDefaults,},
          { id: "C" , position: { x: 100, y: 100 }, data: { label: "C" }, ...nodeDefaults,},
          { id: "D" , position: { x: -50, y: 150 }, data: { label: "D" }, ...nodeDefaults,},
          { id: "E" , position: { x: 50, y: 150 }, data: { label: "E" }, ...nodeDefaults,},
        ],
        edges: [
          { id: "1", source: "A", target: "B", type: "straight" },
          { id: "2", source: "A", target: "C", type: "straight" },
          { id: "3", source: "B", target: "D", type: "straight" },
          { id: "4", source: "B", target: "E", type: "straight" },
        ],
      };


      return { graph };
};