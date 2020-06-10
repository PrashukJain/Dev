let array=[1,2,3,4,5,6,7,8];
function myMap(arr,cb){
    let newArr=[];
    for(let i=0;i<arr.length;i++){
        newArr.push(cb(arr[i]));
    }
    return newArr;
}

console.log(myMap(array,function cb(n){
    if(n%2==0)
    return n+1;
    return n-1;
}));