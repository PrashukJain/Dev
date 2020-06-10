let fs=require("fs");
let path=require("path");
module.exports.view=function(){
    let src=arguments[0];
    let mode=arguments[1];
    if(mode=='-t'){
viewAsTree(src,"");
    }
    else{
viewAsFlatFile(src,path.basename(src));
    }
}
function checkwhetherFile(src){
    return fs.lstatSync(src).isFile();
}
function getContent(src){
    return fs.readdirSync(src);
}
function viewAsFlatFile(src,toprint){
    if(checkwhetherFile(src)==true){
        console.log(toprint+"*");
    }
    else{
        console.log(toprint);
        let childNames=getContent(src);
        for(let i=0;i<childNames.length;i++){
            let childPath=path.join(src,childNames[i]);
            let ctoprint=path.join(toprint,childNames[i]);
        viewAsFlatFile(childPath,ctoprint);
        }
    }
}
function viewAsTree(src,indent){
    if(checkwhetherFile(src)==true){
        console.log(indent+path.basename(src)+"*");
    }
    else{
        console.log(indent+path.basename(src));
        let childnames=getContent(src);
        for(let i=0;i<childnames.length;i++){
            let childPath=path.join(src,childnames[i]);
            viewAsTree(childPath,indent+"__");
        }
    }

}
// let src=process.argv[2];
// view(src,path.basename(src));