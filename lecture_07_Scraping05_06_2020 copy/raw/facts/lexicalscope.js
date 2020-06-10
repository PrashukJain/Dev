let myVar=20;
function a(){
    let myVar=1;
    console.log(myVar);
    b();
    c();
    function c(){
        console.log(myVar);
    }
}
function b(){
    let myVar=2;
    console.log(myVar);
    // c();
}

a();