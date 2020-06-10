let fs=require("fs");
let path=require("path");
function checkwhetherFile(src){
    return fs.lstatSync(src).isFile();
}
function getContent(src){
    return fs.readdirSync(src);
}
let uniqid=require("uniqid");
module.exports.untreefyFn=function(){
    let src=arguments[0];
    let dest=arguments[1];
    let root={};
    untreefy(src,dest,root);
    fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root));
}

function untreefy(src,dest,obj){
if(checkwhetherFile(src)==true){
    let oldName=path.basename(src);
let newName=uniqid();
obj.newName=newName;
obj.oldName=oldName;
obj.isFile=true;
let destPath=path.join(dest,newName);
fs.copyFileSync(src,destPath);
console.log(`File ${oldName} from src copied to ${destPath}`);
}
else{
    obj.isFile=false;
    obj.name=path.basename(src);
    obj.children=[];
    let childNames=getContent(src);
    for(let i=0;i<childNames.length;i++){
        let childPath=path.join(src,childNames[i]);
        let chobj={};
        untreefy(childPath,dest,chobj);
        obj.children.push(chobj);
    }
}
}