/*全域參數*/
////定義
const canvasWidth = 1920;
const canvasHeight = 1080;
const speed = 16;
const carNumber = 50;

////Socket.io
const socket = io();

////DrawingFPS
var drawing_fps;

var start = false;
////顯示綁定
const obs_map_canvas = document.getElementById("obs_map");    //獲取物理圖
const obstx = obs_map_canvas.getContext("2d");                //綁定物理圖的偵測端口

const mainCanvas = document.getElementById("main");           //宣告遊戲畫面顯示板
const ctx = mainCanvas.getContext("2d");

const weightCanvas = document.getElementById("weightImg");           //宣告遊戲畫面顯示板
const wgctx = weightCanvas.getContext("2d");


ctx.font = "30px sans-serif" //設定文字字型 大小
ctx.fillStyle="#00A0E9" //設定文字填滿顏色
ctx.strokeStyle="#D50A17" //設定文字邊框
ctx.fillText("按下S鍵啟動車車AI學習", 10, 100)  //填滿文字

var bestAI = {
  w1 : [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
  w2 : [[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
  w3 : [[0,0],[0,0],[0,0]]
};


//Car
class carObject {
  constructor() {
    this.x = 300;
    this.y = 270;
    this.r = 90;
    this.height = 131;
    this.width = 71;
    this.layer1 = [0,0,0,0,0];
    this.layer2 = [0,0,0,0];
    this.layer3 = [0,0,0];
    this.layer4 = [0,0];
    this.w1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    this.w2 = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
    this.w3 = [[0,0],[0,0],[0,0]];
    this.stat = 0;
    this.distance = 0;
    this.useTime = 0;
    this.live = true;
    this.dwn = 0;
    this.d = 0;
    this.randomWeight();
  }

  randomWeight() {
    for (let i = 0; i < 5; i ++){
      for (let j = 0; j < 4; j ++){
        this.w1[i][j] = (Math.random() - 0.5) * 2.0;
      }
    }
    for (let i = 0; i < 4; i ++){
      for (let j = 0; j < 3; j ++){
        this.w2[i][j] = (Math.random() - 0.5) * 2.0;
      }
    }
    for (let i = 0; i < 3; i ++){
      for (let j = 0; j < 2; j ++){
        this.w3[i][j] = (Math.random() - 0.5) * 2.0;
      }
    }
  }
}

var carPlayers = {};


function Init(){
  const obsimg = document.getElementById('system_Background');  //綁定物理圖的png
  obstx.drawImage(obsimg, 0, 0,canvasWidth,canvasHeight);       //繪製碰撞圖

  for (let i = 0; i < carNumber; i ++){
    carPlayers[i] = new carObject();
  }

  setInterval('draw();', 1);
  setInterval('Update();', 1);
}

function Update(){
  NerualCalculas();
  pysicalUpdate();
  if(bestStat != 6){
    bestCar();
  }
}

function carDeath(){
  console.log('F:'+bestAI['w1'][0][0]);
  for (let [index,carPlayer] of Object.entries(carPlayers)){
    if(index != 0){
      for (let i = 0; i < 5; i ++){
        for (let j = 0; j < 4; j ++){
          carPlayer.w1[i][j] = bestAI.w1[i][j] + (Math.random() - 0.5) * 0.1;
        }
      }
      for (let i = 0; i < 4; i ++){
        for (let j = 0; j < 3; j ++){
          carPlayer.w2[i][j] = bestAI.w2[i][j] + (Math.random() - 0.5) * 0.1;
        }
      }
      for (let i = 0; i < 3; i ++){
        for (let j = 0; j < 2; j ++){
          carPlayer.w3[i][j] = bestAI.w3[i][j] + (Math.random() - 0.5) * 0.1;
        }
      }
    }else{
      carPlayer.w1 = bestAI.w1;
      carPlayer.w2 = bestAI.w2;
      carPlayer.w3 = bestAI.w3;
    }
    carPlayer.r = 90;
    carPlayer.x = 300;
    carPlayer.y = 270;
    carPlayer.distance = 0;
    carPlayer.stat = 0;
    carPlayer.live = true;
    carPlayer.useTime = 0;
  }
  weightDraw();
}


function saveWeight(carPlayer){
  for (let i = 0; i < 5; i ++){
    for (let j = 0; j < 4; j ++){
      bestAI.w1[i][j] = parseFloat(carPlayer.w1[i][j]);
    }
  }
  for (let i = 0; i < 4; i ++){
    for (let j = 0; j < 3; j ++){
      bestAI.w2[i][j] = parseFloat(carPlayer.w2[i][j]);
    }
  }
  for (let i = 0; i < 3; i ++){
    for (let j = 0; j < 2; j ++){
      bestAI.w3[i][j] = parseFloat(carPlayer.w3[i][j]);
    }
  }
  bestUsedistance = carPlayer.distance;
  console.log('Save best model');
  ctx.fillStyle = "blue";
  ctx.fillRect(carPlayer.x, carPlayer.y,100,100);
}


function pysicalUpdate(){
  var living = false;
  for (let [index,carPlayer] of Object.entries(carPlayers)) {
    if(carPlayer.live == true){
      carPlayer.useTime += 1;
      living = true;
      //無限前進
      carPlayer.x += speed * Math.sin(Math.PI * (carPlayer.r / 180.0));
      carPlayer.y -= speed * Math.cos(Math.PI * (carPlayer.r / 180.0));
      //判斷是否撞到東西
      if(obstx.getImageData(carPlayer.x, carPlayer.y, 1, 1).data[0] > 250){
        if(carPlayer.stat == bestStat){
          if(carPlayer.distance < bestUsedistance){
            saveWeight(carPlayer);
          }
        }
        carPlayer.live = false;
      }
      if(carPlayer.useTime > 400){
        carPlayer.live = false;
        console.log(carPlayer.stat);
      }
      /*
      if(key.a == true){
        carPlayers[0]['r'] -= 5;
      }
      if(key.d == true){
        carPlayers[0]['r'] += 5;
      }
      if(key.w == true){
        carPlayer.x += speed * Math.sin(Math.PI * (carPlayer.r / 180.0));
        carPlayer.y -= speed * Math.cos(Math.PI * (carPlayer.r / 180.0));
      }
      */
    }
  }
  if(living == false){
    carDeath();
  }
}
