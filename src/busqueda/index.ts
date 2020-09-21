import PriorityQueue from "./PriorityQueue";

export interface node {
  pos: number[];
  cost: number;
  parent: node;
  action: string;
}

interface problem {
  maze: number[][];
  goal: number[];
}

interface solution {
  cost: number,
  solution: [string,number][]
}

let maze = [
  [2, 1, 1], 
  [2, 3, 3], 
  [2, 3, 1], 
  [1, 1, 1]
];

let start = [3, 0]; // 3,0
let goal = [0, 2]; //0,2
let frontier = new PriorityQueue();
let explored: {
  [valuePos: string]: boolean;
} = {};

const OPERATORS = ["U", "D", "L", "R"]; // Priotity in case

let problem: problem = { maze, goal };
let root: node = {
  pos: start,
  cost: 0,
  parent: null,
  action: null,
};

// Avoid come back
// root: {pos: [3, 0], cost: 0, parent: null, action: null}
// node: {pos: [row, col], cost: number, parent: node, action: string}
function testGoal(node: node, problem: problem) {
  if (node.pos[0] == problem.goal[0] && node.pos[1] == problem.goal[1]) {
    return true;
  }
  return false;
}

function calculateNewPosition(direction: string, node: node): [number, number] {
  let [row, col] = node.pos;

  switch (direction) {
    case "U":
      return [row - 1, col];
    case "D":
      return [row + 1, col];
    case "L":
      return [row, col - 1];
    case "R":
      return [row, col + 1];
  }
}

function calculateNewCost(
  node: node,
  problem: problem,
  direction: string
): number {
  let matrix = problem.maze;
  let cost = node.cost;
  let [row, col] = calculateNewPosition(direction, node);

  return matrix[row][col] + cost;
}

function getPath(goalNode: node) : [string,number][] {
  let path = [];
  while (goalNode.parent !== null) {
    path.push([goalNode.pos.toString(), goalNode.cost])
    goalNode = goalNode.parent;
  }

  path.push([goalNode.pos.toString(), goalNode.cost]) //root element

  return path;
}

function expand(node: node, problem: problem) {
  explored[node.pos.toString()] = true;

  if(node.pos[0] < problem.maze.length - 1 && !explored[calculateNewPosition("D", node).toString()]){
    frontier.enqueue({
      pos: calculateNewPosition("D", node),
      cost: calculateNewCost(node, problem, "D"),
      parent: node,
      action: "D",
    });
  }

  if(node.pos[0] > 0 && !explored[calculateNewPosition("U", node).toString()]){
    frontier.enqueue({
      pos: calculateNewPosition("U", node),
      cost: calculateNewCost(node, problem, "U"),
      parent: node,
      action: "U",
    });
  }

  if(node.pos[1] < problem.maze[0].length - 1 && !explored[calculateNewPosition("R", node).toString()]){
    frontier.enqueue({
      pos: calculateNewPosition("R", node),
      cost: calculateNewCost(node, problem, "R"),
      parent: node,
      action: "R",
    });
  }

  if(node.pos[1] > 0 && !explored[calculateNewPosition("L", node).toString()]){
    frontier.enqueue({
      pos: calculateNewPosition("L", node),
      cost: calculateNewCost(node, problem, "L"),
      parent: node,
      action: "L",
    });
  }
}

function solve(problem: problem, root: node): solution {
  let current_node: node;

  frontier.enqueue(root);

  while (!frontier.isEmpty()) {
    current_node = frontier.dequeue();

    if (testGoal(current_node, problem)) {
      let path = getPath(current_node);
      return { cost: current_node.cost, solution:  path.reverse()};
    }

    expand(current_node, problem);
  }
}

console.log(solve(problem, root));

