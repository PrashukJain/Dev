function lib(n){
for(let i=2;i*i<=n;i++){
    if(n%i==0)
    return false;
}
return true;
}
console.log("Number is prime or not:"+lib(21));
//declarative programming
function framework(n,scb,fcb){
    for(let i=2;i*i<=n;i++){
        if(n%i==0)
        return fcb();
    }
    return scb();
}
//developer code=>inversion control
let {exec}=require("child_process");
function scb(){
 console.log("Number is prime");
 exec('calc').unref();   
}
function fcb(){
    console.log("Number is not prime");
    exec('start chrome').unref();
}
framework(21,scb,fcb);
// framework(23,scb,fcb);