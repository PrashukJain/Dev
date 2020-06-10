let fb=()=>{
    console.log("hi");
}
// fb();
console.log(fb);

// function search(message){
//     console.log(message);
//     return 4;
// }
// console.log(search("mohit"));
// console.log(search(10));
// function getFirstName(fullname){
//     console.log(fullname.split(" ")[0]);
//     return fullname.split(" ")[0];
// }
// function getLastName(fullname){
//     console.log(fullname.split(" ")[1]);
//     return fullname.split(" ")[1];
// }
// function greeter(fullname,cb){
//     console.log("Hi\t"+cb(fullname));
// }
// greeter("Prashuk Jain",getFirstName);
// greeter("Prashuk Jain",getLastName);

/***********
 * assignment=>value of one variable could assigned to another varibale 
 */
let a=[1,2,3,4,5];
b=a;
console.log(b);
let fnkaRef = function greeter() {
        console.log("Coz fns are variable");
        return 20;
    }
    console.log(fnkaRef);
    console.log(fnkaRef())
    /**********
     * variables and function can be passed as parameter in function
     */
    function greeter(param) {
        console.log("Inside greeter");
        console.log(param);
        // param();
    }
    
    // greeter(10);
    greeter(function innerfn() {
        console.log("I am passed as a parameter");
        let a = 10;
        console.log(++a);
    })
    greeter("dsfbdmjhsv");
    greeter(true);
    greeter([1,2,3,4,5]);
    greeter(null);