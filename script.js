var can = document.getElementById("mainC").getContext("2d");
var list = document.getElementById("list");
const not_draw = ["rep",'stop',"var","var+","var-","var*","var/","if","log"];
var move_x  = 100;
var move_y = 100;
var line = 1;

var inp = 1;
document.getElementById("inp1").focus();
var var_names = [];
var var_val =[];
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
  inp.spellcheck = false;
  li.appendChild(inp);
  list.appendChild(li);
  inp.focus();
}


function run() {
  var_names = [];
  var_val = [];
  var can = document.getElementById("mainC").getContext("2d");
  can.beginPath();
  can.clearRect(0, 0, 200, 200);
  
  var list = document.getElementById("list");
  var items = list.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
    var i2 = i+1;
    line = i2;
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
    let in1 = var_check(1,fun);
    let in2 = var_check(2,fun);
    can.moveTo(in1,in2);
    move_x = parseInt(in1);
    move_y = parseInt(in2);
  }
  if (type == "line"){
    let in1 = var_check(1,fun);
    let in2 = var_check(2,fun);
    can.lineTo(in1,in2);
    can.stroke();
  }
  if (type == "cir"){
    let in1 = var_check(1,fun);
    let in2 = var_check(2,fun);
    let in3 = var_check(3,fun);
    can.moveTo(parseInt(in1)+parseInt(in3),in2);
    can.arc(in1, in2, in3, 0, 2 * Math.PI);
    can.stroke();
    can.moveTo(move_x,move_y);
  }
  if (type == "rect"){
    let in1 = var_check(1,fun);
    let in2 = var_check(2,fun);
    let in3 = var_check(3,fun);
    let in4 = var_check(4,fun);
    can.rect(in1, in2, in3, in4);
    can.stroke();
  }
   if (type == "text"){
    let in1 = var_check(1,fun);
    let in2 = var_check(2,fun);
    let in3 = var_check(3,fun);
    let in4 = var_check(4,fun);
    can.font = in4+"px Verdana";
    can.fillText(in1, in2, in3);
    can.stroke();
  }
}

function funn(fun,i2) {
  var name = fun.split(">")[0];
  if(name == "rep"){
    let times = fun.split(">")[1];
    let end = -1;
    let tick = i2;
    let start = i2;
    while(end == -1){
      if(document.getElementById("inp"+tick).value == "stop"){
        end = tick - 1;
      }
      else{tick++;}
    }  
    //run repet loop
    let dis = end - i2;
    console.log(dis);
    for (let i = 0; i < times; i++) {
      tick == start + 1;
      console.log(i2);
      for (let ii = 0; ii < dis; ii++) {
        evel(document.getElementById("inp"+tick).value);
        console.log(document.getElementById("inp"+tick).value);
        console.log("t:" + tick);
        tick++;
      }
    }
  }
  else if(name == "log"){
    let in1 = var_check(1,fun);
    //let in2 = var_check2(fun);
    //let in3 = var_check3(fun);
    //let in4 = var_check4(fun);
    //let in5 = var_check5(fun);
    alert("log: "+in1+"");
  }
   if(name == "if"){
    in1 = var_check(1,fun);
    in2 = var_check(2,fun);
    in3 = var_check(3,fun);
    let end = -1;
     let number = i2;
     while(end == -1){
       number += 1;
       if(document.getElementById("inp"+number).value == "stop"){
         end = number;
       }
     }
     if(in2 == "=="){
       if(toString(in1) == toString(in2)){
         for(let i = i2+1; i < end-1; i++) {
           var fun = document.getElementById("inp"+i2).value;
           if(fun !== ""){  
             let name = fun.split(">")[0];
             if(!not_draw.includes(name)){draw(fun);}
            else{funn(fun,i2);}
             console.log(fun);
              }
         }
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
    in1 = var_check(1,fun);
    in2 = var_check(2,fun);
    var_val[var_names.indexOf(in1)] = parseInt(var_val[var_names.indexOf(in1)]) + parseInt(in2);
  }
  if(name == "var-"){
    in1 = var_check(1,fun);
    in2 = var_check(2,fun);
    var_val[var_names.indexOf(in1)] = parseInt(var_val[var_names.indexOf(in1)]) - parseInt(in2);
  }
  if(name == "var*"){
    in1 = var_check(1,fun);
    in2 = var_check(2,fun);
    var_val[var_names.indexOf(in1)] = parseInt(var_val[var_names.indexOf(in1)]) * parseInt(in2);
  }
  if(name == "var/"){
    in1 = var_check(1,fun);
    in2 = var_check(2,fun);
    var_val[var_names.indexOf(in1)] = parseInt(var_val[var_names.indexOf(in1)]) / parseInt(in2);
  } 
}



///////////////////////////
function var_check(num,fun) {
  // if its the first
  if(num == 1){
    //if it has a , in it
    if(fun.split(">")[1].includes(",")){
      // if not var
      if(!fun.split(">")[1].split(",")[0].includes("var:")){
        return fun.split(">")[1].split(",")[0];
      }
      else{
        return var_val[var_names.indexOf(fun.split(">")[1].split(",")[0].split("var:")[1])];
      }
    }
    //else if only one value
    else{
      //if it has var: in it
      if(fun.split(">")[1].includes("var:")){
        return var_val[var_names.indexOf(fun.split(">")[1].split("var:")[1])]
      }
      else{
        return fun.split(">")[1];
      }
    }
  }
    //if its move the inp1
  else if(num > 1){
    if(fun.split(">")[1].includes(",")){
    if(fun.split(">")[1].split(",").length >= num){
    if(fun.split(">")[1].split(",")[num-1].includes("var:")){
      return var_val[var_names.indexOf(fun.split(">")[1].split(",")[num-1].split("var:")[1])];
    }
    else{
      return fun.split(">")[1].split(",")[num-1];
    }
  }
  else{window.alert("❌error at line: "+line+"  error: mising value"); return ""}
  }else{window.alert("❌error at line: "+line+"  error: mising value"); return "";}}
}

function evel(fun) {
    
    if(fun !== ""){  
      let name = fun.split(">")[0];
      if(!not_draw.includes(name)){draw(fun);}
      else{funn(fun);}
    }
}

//hotkeys
document.onkeydown = function(e){ 
  if(e.key == "Enter"){
    add();
  }

}
    

function doc_keyUp(e) {
    if (e.ctrlKey && e.key === 'Shift') {       
        run();
    }
  else if(e.ctrlKey && e.key == "Backspace"){
    let list = document.getElementById('list');
    list.removeChild(list.lastElementChild);
    let li = list.lastElementChild;
    li.lastElementChild.focus();
  }
  else if(e.ctrlKey && e.key == "ArrowUp"){
    var list = document.getElementById("list");
    var items = list.getElementsByTagName("li");
    for(let i = 0; i < items.length; i++){
      let i3 = i+1;
      let input = document.getElementById("inp"+i3);
      if(input == document.activeElement){
        var place = i3;
      }
    }
    let li = document.createElement('li');
  let inp = document.createElement('input');
   number +=1;
   inp.id = "inp"+number;
   inp.placeholder = "enter line of code";
   inp.class = "inp";
   inp.type = "text";
   inp.autocomplete = "off";
   inp.spellcheck = "false";
   li.appendChild(inp);
    inp.focus();
    list.insertBefore(li, list.children[place]);

  }
}
document.addEventListener('keyup', doc_keyUp, false);


//save
function save() {
  var save = "";
  var list = document.getElementById("list");
  var items = list.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
    var i2 = i+1; 
   let val = document.getElementById("inp"+i2).value;
   save += val+";";
}
  var blob = new Blob([save], { type: "text/plain;charset=utf-8" }); 
 const url = URL.createObjectURL(blob);
  let btn = document.getElementById("btn");
  btn.href = url;

}
//load
function load(input) {
  var file = input.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        processContents(reader.result);
    reader.close;
    }
}

function processContents(contents){
    //load script
    if(window.confirm("this will delet your cerent script! do you wish to contune?")){
      number = 0;
      document.getElementById("list").innerHTML = "";
      save_file = contents.split(";");
      for (let i = 0; i < save_file.length -1; i++) {
         let li = document.createElement('li');
          let inp = document.createElement('input');
          number +=1;
          inp.id = "inp"+number;
          inp.placeholder = "enter line of code";
          inp.class = "inp";
          inp.type = "text";
          inp.autocomplete = "off";
          inp.spellcheck = "false";
          inp.value = save_file[i];
          li.appendChild(inp);
          list.appendChild(li);
          inp.focus();
      }
    }
} 