const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const unitSize = 50;
const cellSize = canvasWidth / unitSize;
var selectionMode = 4;
var startNode;
var endNode;

const matrix = Array.from(Array(canvasWidth / unitSize), () =>
  new Array(canvasHeight / unitSize).fill(0)
);

class Astar {
  matrix;
  open = new Array();
  closed = new Array();
  startNode;
  endNode;
  constructor(matrix, startNode, endNode) {
    this.matrix = matrix;
    this.startNode = startNode;
    this.startNode.g_cost = 0;
    this.endNode = endNode;
  }

  Search() {

  }

  RetracePath() {

  }
}

class Node {
  walkable;
  x;
  y;
  g_cost;
  h_cost;
  f_cost;
  parent;
  
  constructor(x, y, walkable) {
    this.x = x;
    this.y = y;
    this.walkable = walkable;
  }

  setFCost() {
    this.f_cost =  this.h_cost + this.g_cost;
  }

  draw() {
    if(this.walkable == true) {
      ctx.fillStyle = "white";
      ctx.fillRect(this.y*unitSize,this.x*unitSize,unitSize,unitSize);
    }
    else if(this.walkable == false) {
      ctx.fillStyle = "black";
      ctx.fillRect(this.y*unitSize,this.x*unitSize,unitSize,unitSize);
    }
  }
}

function drawGridCells() {
  for (let x = 0; x <= canvas.width; x += unitSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }
  for (let y = 0; y <= canvas.height; y += unitSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }
  ctx.strokeStyle = 'gray';
  ctx.stroke();
}

document.addEventListener("keydown", function (event) {
  const key = event.code
  if (key === 'KeyY') {
    selectionMode = 1; //1 mean start mode
    console.log("Start Node Selection")
  }
  if (key === 'KeyU') {
    selectionMode = 2; //2 mean end mode
    console.log("End Node Selected")
  }
  if (key === 'KeyH') {
    selectionMode = 3; //3 mean clearing space
    console.log("Clearing Space")
  }
  if (key === 'KeyJ') {
    selectionMode = 4; //4 mean placing obstacle
    console.log("Obstacle Placement")
  }
  if (key === 'KeyB') {
    printMatrixTable(matrix)
    console.log(`Start Node = ${JSON.stringify(startNode)}`)
    console.log(`End Node = ${JSON.stringify(endNode)}`)
  }
  if (key === 'Enter') {
    // AstarSearch = new Astar(matrix, startNode, endNode)
    // AstarSearch.Search();
  }
})

canvas.addEventListener("click", function(event) {
  var y = event.offsetX;
  var x = event.offsetY;

  x = (Math.floor(x / unitSize) * unitSize)/unitSize;
  y = (Math.floor(y / unitSize) * unitSize)/unitSize;
  console.log(`X:${x}Y:${y}`)
  
  switch (selectionMode) {
    case 1:
      startNode = matrix[x][y];
      break;
    case 2:
      endNode = matrix[x][y];
      break;
    case 3:
      matrix[x][y].walkable = true;
      matrix[x][y].draw();
      drawGridCells();
      break;
    case 4:
      matrix[x][y].walkable = false;
      matrix[x][y].draw();
      drawGridCells();
      break;
    default:
      break;
  }
})

function GetDistance(nodeA, nodeB) {
  // This function calculates distance between two nodes
  // Yan yana duran iki Node arasindaki uzaklik 1, diyagonal nodelar arası uzaklık 1.4xxx
  // olduğu için tam sayı olmaları amacıyla 10 ve 14 olarak alınmıştır.
  var yDist = Math.abs(nodeA.y - nodeB.y)
  var xDist = Math.abs(nodeA.x - nodeB.x)
  if(yDist <= xDist) {
    return yDist * 14 + (xDist - yDist) * 10
  }
  else {
    return xDist * 14 + (yDist - xDist) * 10
  }
}

function delay(time) {//For debugging
  return new Promise(resolve => setTimeout(resolve, time));
}

function printMatrixTable(matrix) {//For debugging
  const table = [];
  for (let row of matrix) {
    const rowValues = [];
    for (let node of row) {
      rowValues.push(node.walkable ? '1' : '0');
    }
    table.push(rowValues);
  }
  console.table(table);
}

async function fillGridsWithNode() {
  for(var x = 0; x < matrix.length; x++) {
    for(var y = 0; y < matrix[0].length; y++) {
      //await delay(10).then(()=>{
        matrix[x][y] = new Node(x,y,true);
        matrix[x][y].draw()
      //})
    }
  }
  drawGridCells();
}

fillGridsWithNode();
drawGridCells();