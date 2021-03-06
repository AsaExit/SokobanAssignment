let playerMovement = "";// Variable playerMovement. leave this empty to use more then one key movement from the palyers position
let playerTile;
let currentTile = Tiles.Space;
// players position index in the arrays using y and x cordinates
let playerPositionY = tileMap02.mapGrid.findIndex(array1 => array1.findIndex(array2 => 
  array2[0] == "P") != -1);
let playerPositionX = tileMap02.mapGrid[playerPositionY].findIndex(array1 => 
  array1[0] == "P");

let nrOfGoals = tileMap02.mapGrid.flat(2).filter(tile => tile == "G").length;// using flat function for the depth, 2 demensional display
let nrOfFilledGoals = 0;

let nrOfMoves = 0;

function moveKeyPress({key}){

  playerMovement = key;

  switch(key){
    case "ArrowUp": 
    case "w":  
        movePlayer(playerPositionX, playerPositionY - 1); 
        console.log(key +" hello world");
    break;
    case "ArrowRight":
    case "d": 
        movePlayer(playerPositionX + 1, playerPositionY); 
    break;
    case "ArrowDown":
    case "s": 
        movePlayer(playerPositionX, playerPositionY + 1); 
    break;
    case "ArrowLeft": 
    case "a": 
        movePlayer(playerPositionX - 1, playerPositionY); 
    break;
  }

}

function getTile(y, x){
  return tileMap02.mapGrid[y][x][0];
}
// maptypes in the arrays
function getType(type){
  switch(type){
    case " ": return Tiles.Space;
    case "G": return Tiles.Goal;
    case "W": return Tiles.Wall;
    case "B": return Entities.Block;
    case "P": return Entities.Character;
  }
}

function getTileObject(X, Y){
  //let id = Number(y * tileMap01.width + x + 1);
  return { Tile: document.getElementById( Number(Y * tileMap01.width + X + 1)), X, Y};
}

function movePlayer(x, y){

  let tile = getTileObject(x, y);

  if(movePlayerTile(playerTile, tile)){
    playerPositionX = tile.X;
    playerPositionY = tile.Y;
    nrOfMoves++;
  }

}

function movePlayerTile(player, nextTile){

  if(nextTile.Tile.classList.contains(Tiles.Space)){
  
      nextTile.Tile.classList.replace(Tiles.Space, Entities.Character);
      player.classList.replace(Entities.Character, currentTile); 
    
      currentTile = Tiles.Space;
      playerTile = nextTile.Tile;

      return true;
  }else if(nextTile.Tile.classList.contains(Tiles.Goal)){
  
      nextTile.Tile.classList.replace(Tiles.Goal, Entities.Character);
      player.classList.replace(Entities.Character, currentTile); 
      playerTile = nextTile.Tile;

      currentTile = Tiles.Goal;

    return true;
  }else if(nextTile.Tile.classList.contains(Entities.Block)){
    return moveBlock(nextTile, player);
  }

  return false;
}
// playermovment with block or box
function moveBlock(blockTile,player){
  let nextTile;
  
  switch(playerMovement){
    case "ArrowUp":
    case "w":  
    nextTile = getTileObject(blockTile.X, blockTile.Y - 1);
    console.log("hello there w")
    break;

    case "ArrowDown":
    case "s": 
    nextTile = getTileObject(blockTile.X, blockTile.Y + 1);
    console.log("hello there s")
    break;

    case "ArrowLeft":
    case "a": 
    nextTile = getTileObject(blockTile.X - 1, blockTile.Y);
    console.log("hello there d")
    break;

    case "ArrowRight":
    case "d": 
    nextTile = getTileObject(blockTile.X + 1, blockTile.Y);
    console.log("hello there a")
    break;
  }

  let blockCurrentTile = getType(getTile(blockTile.Y, blockTile.X));

  if(blockCurrentTile == Entities.Block){
    blockCurrentTile = Tiles.Space;
  }
  
  if(nextTile.Tile.classList.contains(Tiles.Space)){
    
    if(blockCurrentTile == Tiles.Goal){
      blockTile.Tile.classList.replace(Entities.BlockDone, Entities.Character);
      blockTile.Tile.classList.replace(Entities.Block, Entities.Character);
      nrOfFilledGoals--;
    }else{
      blockTile.Tile.classList.replace(Entities.Block, Entities.Character);
    }

    nextTile.Tile.classList.replace(Tiles.Space, Entities.Block);
    player.classList.replace(Entities.Character, currentTile);

    currentTile = blockCurrentTile;
    playerTile = blockTile.Tile;

    return true;
  }else if(nextTile.Tile.classList.contains(Tiles.Goal)){

    blockTile.Tile.classList.replace(Entities.Block, Entities.Character);
    blockTile.Tile.classList.remove(Entities.BlockDone);

    nextTile.Tile.classList.replace(Tiles.Goal, Entities.BlockDone);
    nextTile.Tile.classList.add(Entities.Block);

    player.classList.replace(Entities.Character, currentTile);

    currentTile = blockCurrentTile;
    playerTile = blockTile.Tile;

    if(blockCurrentTile == Tiles.Space){
      nrOfFilledGoals++;
    }
    return true;
  }
  return false;
}