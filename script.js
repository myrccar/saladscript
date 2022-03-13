var can = document.getElementById("mainC").getContext("2d");
var list = document.getElementById("list");
const not_draw = ["rep","var","addVar"];
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
  let items = list.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
    let i2 = i+1;
    
   var fun = document.getElementById("inp"+i2).value;
    //console.log(fun);
    
    if(fun !== ""){  
      let name = fun.split(">")[0];
      if(!not_draw.includes(name)){draw(fun);}
      else{funn(fun);}
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

function funn(fun) {
  var name = fun.split(">")[0];
  if(name == "rep"){
    //repet loops later
    
    }
  if(name == "var"){
    let var_name = fun.split(">")[1].split(",")[0];
    let val = fun.split(">")[1].split(",")[1];
    
    if(var_names.includes(var_name)){
      var_val[var_names.indexOf(var_name)] = val;
    }
    else{
      var_names.push(var_name);
      var_val.push(val);
      //console.log(var_names+":"+var_val);
    }
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