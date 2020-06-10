let fs=require("fs");
let path=require("path");
function checkwhetherFile(src){
    return fs.lstatSync(src).isFile();
}
function getContent(src){
    return fs.readdirSync(src);
}
let uniqid=require("uniqid");
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
        untreefy(childPath,dest,obj);
        obj.children.push(chobj);
    }
}
}
let src=process.argv[2];
let dest=process.argv[3];
let root={};
untreefy(src,dest,root);
console.log(root);