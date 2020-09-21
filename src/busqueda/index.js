"use strict";
exports.__esModule = true;
var PriorityQueue_1 = require("./PriorityQueue");
var maze = [
    [2, 1, 1],
    [2, 3, 3],
    [2, 3, 1],
    [1, 1, 1],
];
var start = [3, 0]; // 3,0
var goal = [0, 2]; //0,2
var frontier = new PriorityQueue_1["default"]();
var explored = {};
var OPERATORS = ["U", "D", "L", "R"]; // Priotity in case
var problem = { maze: maze, goal: goal };
var root = {
    pos: start,
    cost: 0,
    parent: null,
    action: null
};
// Avoid come back
// root: {pos: [3, 0], cost: 0, parent: null, action: null}
// node: {pos: [row, col], cost: number, parent: node, action: string}
function testGoal(node, problem) {
    if (node.pos[0] == problem.goal[0] && node.pos[1] == problem.goal[1]) {
        return true;
    }
    return false;
}
function calculateNewPosition(direction, node) {
    var _a = node.pos, row = _a[0], col = _a[1];
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
function calculateNewCost(node, problem, direction) {
    var matrix = problem.maze;
    var cost = node.cost;
    var _a = calculateNewPosition(direction, node), row = _a[0], col = _a[1];
    return matrix[row][col] + cost;
}
function getPath(goalNode) {
    var path = [];
    while (goalNode.parent !== null) {
        path.push([goalNode.pos.toString(), goalNode.cost]);
        goalNode = goalNode.parent;
    }
    path.push([goalNode.pos.toString(), goalNode.cost]); //root element
    return path;
}
function expand(node, problem) {
    explored[node.pos.toString()] = true;
    if (node.pos[0] < problem.maze.length - 1 && !explored[calculateNewPosition("D", node).toString()]) {
        frontier.enqueue({
            pos: calculateNewPosition("D", node),
            cost: calculateNewCost(node, problem, "D"),
            parent: node,
            action: "D"
        });
    }
    if (node.pos[0] > 0 && !explored[calculateNewPosition("U", node).toString()]) {
        frontier.enqueue({
            pos: calculateNewPosition("U", node),
            cost: calculateNewCost(node, problem, "U"),
            parent: node,
            action: "U"
        });
    }
    if (node.pos[1] < problem.maze[0].length - 1 && !explored[calculateNewPosition("R", node).toString()]) {
        frontier.enqueue({
            pos: calculateNewPosition("R", node),
            cost: calculateNewCost(node, problem, "R"),
            parent: node,
            action: "R"
        });
    }
    if (node.pos[1] > 0 && !explored[calculateNewPosition("L", node).toString()]) {
        frontier.enqueue({
            pos: calculateNewPosition("L", node),
            cost: calculateNewCost(node, problem, "L"),
            parent: node,
            action: "L"
        });
    }
}
function solve(problem, root) {
    var current_node;
    frontier.enqueue(root);
    while (!frontier.isEmpty()) {
        current_node = frontier.dequeue();
        if (testGoal(current_node, problem)) {
            var path = getPath(current_node);
            return { cost: current_node.cost, solution: path.reverse() };
        }
        expand(current_node, problem);
    }
}
console.log(solve(problem, root));
