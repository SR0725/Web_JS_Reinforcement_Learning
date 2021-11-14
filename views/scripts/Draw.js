
function draw() {
  //重製背景
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //繪製背景
  var img = document.getElementById("background");
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  //繪製車車
  img = document.getElementById("car_img");
  for (let [index,carPlayer] of Object.entries(carPlayers)) {
    var tempX = carPlayer.x;
    var tempY = carPlayer.y;

    ctx.translate(tempX,tempY);
    ctx.rotate(Math.PI*(carPlayer.r/180.0));
    ctx.drawImage(img,-(carPlayer.width*0.5),-(carPlayer.height*0.5), carPlayer.width, carPlayer.height);
    ctx.rotate(-1*Math.PI*(carPlayer.r/180.0));
    ctx.translate(-tempX,-tempY);
  }
}

function weightDraw() {
  //重製背景
  wgctx.clearRect(0, 0, 400, 150);
  //繪製AI線段
  for (let i = 0; i < 5; i ++){
    for (let j = 0; j < 4; j ++){
      if(bestAI.w1[i][j] > 0){
        wgctx.strokeStyle = 'red';
      }else{
        wgctx.strokeStyle = 'blue';
      }
      wgctx.beginPath();
      wgctx.lineWidth = Math.abs(bestAI.w1[i][j]) * 5;
      wgctx.moveTo(30, 15+30*i);
      wgctx.lineTo(140, 15+40*j);
      wgctx.stroke();
    }
  }
  for (let i = 0; i < 4; i ++){
    for (let j = 0; j < 3; j ++){
      if(bestAI.w2[i][j] > 0){
        wgctx.strokeStyle = 'red';
      }else{
        wgctx.strokeStyle = 'blue';
      }
      wgctx.beginPath();
      wgctx.lineWidth = Math.abs(bestAI.w2[i][j]) * 5;
      wgctx.moveTo(140, 15+40*i);
      wgctx.lineTo(250, 35+40*j);
      wgctx.stroke();
    }
  }
  for (let i = 0; i < 3; i ++){
    for (let j = 0; j < 2; j ++){
      if(bestAI.w3[i][j] > 0){
        wgctx.strokeStyle = 'red';
      }else{
        wgctx.strokeStyle = 'blue';
      }
      wgctx.beginPath();
      wgctx.lineWidth = Math.abs(bestAI.w3[i][j]) * 5;
      wgctx.moveTo(250, 35+40*i);
      wgctx.lineTo(370, 50+50*j);
      wgctx.stroke();
    }
  }
}
