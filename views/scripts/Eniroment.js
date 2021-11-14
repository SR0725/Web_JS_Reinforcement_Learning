var bestStat = 0;
var bestUsedistance = 9999999;
const rewardSet = {
  0:{
    target:'x',
    goal:'g',
    number:1030
  },
  1:{
    target:'y',
    goal:'g',
    number:453
  },
  2:{
    target:'x',
    goal:'g',
    number:1544
  },
  3:{
    target:'y',
    goal:'g',
    number:570
  },
  4:{
    target:'y',
    goal:'g',
    number:906
  },
  5:{
    target:'x',
    goal:'s',
    number:168
  }
}
function bestCar(){
  for (let [index,carPlayer] of Object.entries(carPlayers)) {
    carPlayer.stat = statUpdate(carPlayer.stat, carPlayer.x, carPlayer.y, carPlayer);
    if(carPlayer.stat > bestStat){
      bestStat = carPlayer.stat;
      console.log('AI成功突破第' + bestStat + '階層');
      bestUsedistance = 9999999;
      if(bestStat == 6){
        console.log('完成訓練');
      }
    }else if(carPlayer.stat == bestStat){
      carPlayer.distance = bestDistanceUpdate(carPlayer.stat, carPlayer.x, carPlayer.y, carPlayer);
    }
  }
}

function bestDistanceUpdate(stat, x, y, carPlayer){
  var goalNumber = rewardSet[stat]['number'];
  if(rewardSet[stat]['target'] == 'x'){
    return Math.abs(goalNumber - x);
  }else{
    return Math.abs(goalNumber - y);
  }
}

function statUpdate(stat, x, y, carPlayer){
  var goalNumber = rewardSet[stat]['number'];
  if(rewardSet[stat]['target'] == 'x'){
    if(rewardSet[stat]['goal'] == 'g'){
      if(x > rewardSet[stat]['number']){
        carPlayer.distance = 0;
        return stat + 1;
      }else{
        return stat;
      }
    }else{
      if(x < rewardSet[stat]['number']){
        carPlayer.distance = 0;
        return stat + 1;
      }else{
        return stat;
      }
    }
  }else{
    if(rewardSet[stat]['goal'] == 'g'){
      if(y > rewardSet[stat]['number']){
        carPlayer.distance = 0;
        return stat + 1;
      }else{
        return stat;
      }
    }else{
      if(y < rewardSet[stat]['number']){
        carPlayer.distance = 0;
        return stat + 1;
      }else{
        return stat ;
      }
    }
  }
}
