/*
@ function creatCss: for the map in numbers and size
@ function createMap: Creats tha map with a div classname map.How to display and create the mapgrid from the sokobanBase with hight and width.
Using swicth case to create the tiles. [0] there is only one.
At last creating the elements with classlist add and each property.
*/ 

// as we call the function creat map in html we need to lisen for keys pressd and it calls the function moveKeyPress
document.addEventListener('keydown', moveKeyPress);


function createStlCss(nr, size) {
  let styleString = "";
  for(let i = 0; i < nr; i++){
    styleString += size + " ";
  }
  return styleString
}

// creating map
function createMap(){

  let idCounter = 0;
  let mapContainer = document.createElement("div");
  mapContainer.className = "map";

  mapContainer.style.display = "inline-grid";
  mapContainer.style.gridTemplateColumns = createStlCss(tileMap01.width, "1fr");
  mapContainer.style.gridTemplateRows = createStlCss(tileMap01.height, "1fr");

  tileMap01.mapGrid.forEach(tileArray => {
    tileArray.forEach(tile => {

      let element = document.createElement("div");
      element.classList.add("tile");
      element.id = ++idCounter;
      
      switch(tile[0]){
        case "W": createWall(element); break;
        case "B": createBlock(element); break;
        case " ": createSpace(element); break;
        case "G": createGoal(element); break;
        case "P": createPlayer(element); break;
      }
      mapContainer.appendChild(element);
    })
    
    document.body.appendChild(mapContainer);


  })
}
function createBlock(element){
  element.classList.add(Entities.Block);
}

function createWall(element){
  element.classList.add(Tiles.Wall);
}

function createPlayer(element){
  element.classList.add(Entities.Character);
  playerTile = element;
}

function createSpace(element){
  element.classList.add(Tiles.Space);
}

function createGoal(element){
  element.classList.add(Tiles.Goal);
}