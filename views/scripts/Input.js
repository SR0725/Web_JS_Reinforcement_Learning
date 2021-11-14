var key = {w:false, s:false, a:false, d:false}

document.onkeydown=function(event){
  let e = event || window.event || arguments.callee.caller.arguments[0];
  if(e){
    switch (e.keyCode) {
      case 87:
        key.w = true;
        break;
      case 83:
        if(start == false){
          start = true;
          Init();
        }
        break;
      case 65:
        key.a = true;
        break;
      case 68:
        key.d = true;
        break;
      case 32:
        console.log(carPlayers[0]['x'], carPlayers[0]['y']);
        break;
      default:
    }
  }
};

document.onkeyup=function(event){
  let e = event || window.event || arguments.callee.caller.arguments[0];
  if(e){
    switch (e.keyCode) {
      case 87:
        key.w = false;
        break;
      case 83:
        break;
      case 65:
        key.a = false;
        break;
      case 68:
        key.d = false;
        break;
      default:
    }
  }
};
