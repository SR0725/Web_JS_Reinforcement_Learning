function NerualCalculas(){
  for (let [index,carPlayer] of Object.entries(carPlayers)) {
    if(carPlayer.live == true){
      for (let i = 0; i < 5; i++){
        carPlayer.layer1[i] = distanceGet((-1*carPlayer.r-90+45*i)+180, carPlayer.x, carPlayer.y);
      }
      carPlayer.layer2 = NNLayer(5, 4, carPlayer.layer1, carPlayer.w1);
      carPlayer.layer3 = NNLayer(4, 3, carPlayer.layer2, carPlayer.w2);
      carPlayer.layer4 = NNLayer(3, 2, carPlayer.layer3, carPlayer.w3);
      if(carPlayer.layer4[0] > carPlayer.layer4[1]){
        carPlayer.r += 20;
      }else{
        carPlayer.r -= 20;
      }
    }
  }
}

function distanceGet(radius, x, y) {
  var i = 0;
  while (true) {
    var tempX = x + i * Math.sin(Math.PI * (radius / 180.0));
    var tempY = y + i * Math.cos(Math.PI * (radius / 180.0));
    ctx.fillStyle = "red";
    ctx.fillRect(tempX,tempY,4,4);
    if(obstx.getImageData(tempX, tempY, 1, 1).data[0] > 100){
      return i;
    }else{
      i += 16;
    }
    if(i > 512){
      return 512;
    }
  }
}

function softMax(layer){
  var all = layer[0] + layer[1];
  for(var i = 0; i < 2; i++){
    layer[i] = layer[i] / all;
  }
  return layer;
}

function NNLayer(layerNow, layerLast, layer, weight){
  var layer_l = {};
  for(var i = 0; i < layerLast; i++){
   layer_l[i] = 0;
  }
  for(var i = 0; i < layerNow; i++){
    for(var j = 0; j < layerLast; j++){
      var la = (layer[i] * weight[i][j]);
      layer_l[j] += (la);
    }
  }
  for(var i = 0; i < layerLast; i++){
    if(layer_l[i] < 0){
      layer_l[i] = 0;
    }
  }
  return layer_l;
}
