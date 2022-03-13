var can = document.getElementById("mainC").getContext("2d");
var list = document.getElementById("list");
const not_draw = ["rep","var","addVar"];
const vars = [];
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
    let in1 = fun.split(">")[1].split(",")[0];
    let in2 = fun.split(">")[1].split(",")[1];
    can.moveTo(in1,in2);
    
  }
  if (type == "line"){
    let in1 = fun.split(">")[1].split(",")[0];
    let in2 = fun.split(">")[1].split(",")[1];
    can.lineTo(in1,in2);
  }
  can.stroke();
}

function funn(fun) {
  var name = fun.split(">")[0];
  if(name == "rep"){
    //repet loops later
  
    }
  
  
}