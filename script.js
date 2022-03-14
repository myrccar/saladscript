var can = document.getElementById("mainC").getContext("2d");
var list = document.getElementById("list");
const not_draw = ["rep",'stop',"var","var+","var-","var*","var/"];
const var_names = [];
const var_val =[];
var number = 1;
function add() {
  let li = document.createElement('li');
  let inp = document.createElement('input');
  number +=1;
  inp.id = "inp"+number;
  inp.placeholder = "enter line of code";
  inp.class = "inp";
  inp.type = "text";
  inp.autocomplete = "off";
  li.appendChild(inp);
  list.appendChild(li);
}


function run() {
  var can = document.getElementById("mainC").getContext("2d");
  can.beginPath();
  can.clearRect(0, 0, 200, 200);
  
  var list = document.getElementById("list");
  var items = list.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
    var i2 = i+1;
    
   var fun = document.getElementById("inp"+i2).value;
    //console.log(fun);
    
    if(fun !== ""){  
      let name = fun.split(">")[0];
      if(!not_draw.includes(name)){draw(fun);}
      else{funn(fun,i2);}
    }
}
}

function draw(fun) {
  
  var can = document.getElementById("mainC").getContext("2d");
  
  var type = fun.split(">")[0];
  if (type == "move"){
    let in1 = var_check1(fun);
    let in2 = var_check2(fun);
    can.moveTo(in1,in2);
  }
  if (type == "line"){
    let in1 = var_check1(fun);
    let in2 = var_check2(fun);
    can.lineTo(in1,in2);
  }
  if (type == "cir"){
    let in1 = var_check1(fun);
    let in2 = var_check2(fun);
    let in3 = var_check3(fun);
    can.arc(in1, in2, in3, 0, 2 * Math.PI);
  }
  if (type == "rect"){
    let in1 = var_check1(fun);
    let in2 = var_check2(fun);
    let in3 = var_check3(fun);
    let in4 = var_check4(fun);
    can.rect(in1, in2, in3, in4);
  }
   if (type == "text"){
    let in1 = var_check1(fun);
    let in2 = var_check2(fun);
    let in3 = var_check3(fun);
    let in4 = var_check4(fun);
    can.font = in4+"px Verdana";
    can.fillText(in1, in2, in3);
  }
  can.stroke();
}

function funn(fun,i2) {
  var name = fun.split(">")[0];
  if(name == "rep"){
    let times = fun.split(">")[1];
    let end = -1;
    let tick = i2 +1;
    while(end == -1){
      
      if(document.getElementById("inp"+tick).value == "stop"){
        end = tick - 1;
      }
      else{
        tick += 1;
      }
    }
    let dis = i2 -1 + end; 
    for (let i = 0; i < times; i++) {
      tick = i2 +1;
      //just go with it dis -2
      for (let x = 0; x < dis - 2; x++) {
        evel(document.getElementById("inp"+tick).value);
        tick++;
      }
    }
    
    }
  if(name == "var"){
    let var_name = fun.split(">")[1].split(",")[0];
    let val = fun.split(">")[1].split(",")[1];
    if(val.includes("var")) {
     val =  var_val[var_names.indexOf(val.split(":")[1])];
      }

    if(var_names.includes(var_name)){
      parseInt(val);
      var_val[var_names.indexOf(var_name)] = val;
    }
    else{
      var_names.push(var_name);
      parseInt(val);
      var_val.push(val);
      //console.log(var_names+":"+var_val);
    }
  }
  if(name == "var+"){
    in1 = var_check1(fun);
    in2 = var_check2(fun);
    var_val[var_names.indexOf(in1)] = parseInt(var_val[var_names.indexOf(in1)]) + parseInt(in2);
  }
  if(name == "var-"){
    in1 = var_check1(fun);
    in2 = var_check2(fun);
    var_val[var_names.indexOf(in1)] = parseInt(var_val[var_names.indexOf(in1)]) - parseInt(in2);
  }
  if(name == "var*"){
    in1 = var_check1(fun);
    in2 = var_check2(fun);
    var_val[var_names.indexOf(in1)] = parseInt(var_val[var_names.indexOf(in1)]) * parseInt(in2);
  }
  if(name == "var/"){
    in1 = var_check1(fun);
    in2 = var_check2(fun);
    var_val[var_names.indexOf(in1)] = parseInt(var_val[var_names.indexOf(in1)]) / parseInt(in2);
  }
    
}



///////////////////////////
function var_check1(fun) {
  if(fun.split(">")[1].split(",")[0].includes("var")) {
    
        return  var_val[var_names.indexOf(fun.split(">")[1].split(",")[0].split(":")[1])];
      }
  else{
    return fun.split(">")[1].split(",")[0];
  }
}
function var_check2(fun) {
  if(fun.split(">")[1].split(",")[1].includes("var")) {
        return  var_val[var_names.indexOf(fun.split(">")[1].split(",")[1].split(":")[1])];
      }
  else{
    return fun.split(">")[1].split(",")[1];
  }
}
function var_check3(fun) {
  if(fun.split(">")[1].split(",")[2].includes("var")) {
        return  var_val[var_names.indexOf(fun.split(">")[1].split(",")[2].split(":")[1])];
      }
  else{
    return fun.split(">")[1].split(",")[2];
  }
}
function var_check4(fun) {
  if(fun.split(">")[1].split(",")[3].includes("var")) {
        return  var_val[var_names.indexOf(fun.split(">")[1].split(",")[3].split(":")[1])];
      }
  else{
    return fun.split(">")[1].split(",")[3];
  }
}

function evel(fun) {
    
    if(fun !== ""){  
      let name = fun.split(">")[0];
      if(!not_draw.includes(name)){draw(fun);}
      else{funn(fun);}
    }
}