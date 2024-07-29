const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const selectModeHtml = document.getElementById("selectMode")
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const unitSize = 20;
const cellSize = canvasWidth / unitSize;
const readyMaze = [
[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
[1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
[1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
[1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0],
[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
[1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
[1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
[1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
[1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
[1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
[1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
[1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1],
[0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
[1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
[1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1],
[1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0],
[1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
[1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
[1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
[0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
[1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
]
const readyMaze2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1]
];
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
  pathFound = false;
  constructor(matrix, startNode, endNode) {
    this.matrix = matrix;
    this.startNode = startNode;
    this.startNode.g_cost = 0;
    this.endNode = endNode;
    this.startNode.h_cost = GetDistance(startNode, endNode);
    startNode.setFCost();
    //console.log(startNode)
  }

  async Search() {
    this.open.unshift(this.startNode)
    while (this.open.length > 0 && !this.pathFound) {
      await delay(30).then(()=>{
      
        var currentNode = this.open[0]
  
        for(var i = 1; i < this.open.length; i++) {
          if(this.open[i].f_cost < currentNode.f_cost || this.open[i].f_cost == currentNode.f_cost && this.open[i].h_cost < currentNode.h_cost) {
            // Open set de bulunan en küçük fcost lu eleman current node atanır fcostlar eşitse hcost bakılır.
            currentNode = this.open[i];
          }
        }
  
        //VISUALIZATION Start
        ctx.fillStyle = "blue";
        ctx.fillRect(currentNode.y*unitSize,currentNode.x*unitSize,unitSize,unitSize);
        drawGridCells();
        //VISUALIZATION End

        let index = this.open.indexOf(currentNode);
        this.open.splice(index, 1);
        this.closed.unshift(currentNode);

        if(currentNode === this.endNode) {
          console.log("Found")
          this.RetracePath(this.startNode, this.endNode)
          this.pathFound = true;
          return;
        }
  
        GetNeighbours(currentNode).forEach(neighbour => {
          if (!neighbour.walkable || this.closed.includes(neighbour)) {
            return;
          }
          var costToNeighbour = currentNode.g_cost + GetDistance(currentNode, neighbour);
          if(costToNeighbour < neighbour.g_cost || !this.open.includes(neighbour)) {
            neighbour.g_cost = costToNeighbour;
            neighbour.h_cost = GetDistance(neighbour,this.endNode)
            neighbour.f_cost = neighbour.g_cost + neighbour.h_cost
            neighbour.parent = currentNode;
  
            //VISUALIZATION Start
            ctx.fillStyle = "green";
            ctx.fillRect(neighbour.y*unitSize,neighbour.x*unitSize,unitSize,unitSize);
            //VISUALIZATION End
            if(!this.open.includes(neighbour)) this.open.unshift(neighbour)
          }
        });
        
        //VISUALIZATION Start
        ctx.fillStyle = "yellow";
        ctx.fillRect(currentNode.y*unitSize,currentNode.x*unitSize,unitSize,unitSize);
        drawGridCells();
        //VISUALIZATION End
      })
    }
    if (!this.pathFound) {
      selectModeHtml.textContent = "There's no way to the target"
      console.log(selectModeHtml.style.color);
      selectModeHtml.style.color = "red";
      console.log("CANNOT FIND A WAY");
    }
  }

  RetracePath(startNode, endNode) {
    let currentNode = endNode;
    var path = new Array();

    while(currentNode != startNode) {
      path.unshift(currentNode)
      currentNode = currentNode.parent;
    }
    path.reverse()
    path.push(startNode)
    console.log(path)
    for (let index = 0; index < path.length; index++) {
      ctx.fillStyle = "purple";
      ctx.fillRect(path[index].y*unitSize,path[index].x*unitSize,unitSize,unitSize);
    }
    drawGridCells();
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
    selectModeHtml.textContent = "Start Node Selection"
  }
  if (key === 'KeyU') {
    selectionMode = 2; //2 mean end mode
    console.log("End Node Selected")
    selectModeHtml.textContent = "End Node Selection"
  }
  if (key === 'KeyH') {
    selectionMode = 3; //3 mean clearing space
    console.log("Clearing Space")
    selectModeHtml.textContent = "Clear Obstacles"
  }
  if (key === 'KeyJ') {
    selectionMode = 4; //4 mean placing obstacle
    console.log("Obstacle Placement")
    selectModeHtml.textContent = "Obstacle Placement"
  }
  if (key === 'KeyB') {
    printMatrixTable(matrix)
    console.log(`Start Node = ${JSON.stringify(startNode)}`)
    console.log(`End Node = ${JSON.stringify(endNode)}`)
  }
  if (key === 'KeyR') {
    startNode = null;
    endNode = null;
    fillGridsWithNode()
    console.log("Matrix Cleared")
  }
  if (key === 'Enter') {
    AstarSearch = new Astar(matrix, startNode, endNode)
    AstarSearch.Search();
  }
})

canvas.addEventListener("click", function(event) {
  var y = event.offsetX;
  var x = event.offsetY;
  console.log(`X:${x}Y:${y}`)
  x = (Math.floor(x / unitSize) * unitSize)/unitSize;
  y = (Math.floor(y / unitSize) * unitSize)/unitSize;
  console.log(`X:${x}Y:${y}`)
  
  switch (selectionMode) {
    case 1:
      startNode = matrix[x][y];
      ctx.fillStyle = "blue";
      ctx.fillRect(startNode.y*unitSize,startNode.x*unitSize,unitSize,unitSize);
      break;
    case 2:
      endNode = matrix[x][y];
      ctx.fillStyle = "magenta";
      ctx.fillRect(endNode.y*unitSize,endNode.x*unitSize,unitSize,unitSize);
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

function GetNeighbours(node) {
  //console.log(`GETTING NEIGHTBOURS OF THIS:${node.x}${node.y}`)
  var neighbours = new Array()

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if(x == 0 && y == 0) continue
      var checkX = node.x + x;
      var checkY = node.y + y;

      if(checkX >= 0 && checkX < canvasHeight/unitSize && checkY >= 0 && checkY < canvasWidth/unitSize && matrix[checkX][checkY].walkable) {
        neighbours.unshift(matrix[checkX][checkY]);
      }
      // if(checkX >= 0 && checkX < canvasHeight/unitSize && checkY >= 0 && checkY < canvasWidth/unitSize && matrix[checkX][checkY].walkable) {
      //   neighbours.unshift(matrix[checkY][checkX]);
      // }
    }
  }
  //console.log(neighbours)
  return neighbours;
}

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
for (let x = 0; x < readyMaze2.length; x++) {
  for (let y = 0; y < readyMaze2[0].length; y++) {
    if(readyMaze2[x][y] == 1) matrix[x][y].walkable = true
    else matrix[x][y].walkable = false
    matrix[x][y].draw();
  }
}
drawGridCells();