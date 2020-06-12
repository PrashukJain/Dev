var myGlobal=10;
// let oopsGlobal;
function fun1() {
  // Assign 5 to oopsGlobal Here
var oopsGlobal=5;
}

// Only change code above this line
fun1();
function fun2() {
  var output = "";
  if (typeof myGlobal != "undefined") {
    output += "myGlobal: " + myGlobal;
  }
  if (typeof oopsGlobal == "undefined") {
    output += " oopsGlobal: " + oopsGlobal;
  }
  console.log(output);
}
fun2();

