let input=process.argv.slice(2);
let viewFile=require("./command/view");
let untreefyFile=require("./command/untreefy");
let treefyFile=require("./command/treefy");
let cmd=input[0];
switch (cmd) {
    case "view":
        viewFile.view(process.argv[3],process.argv[4]);
        break;
    case "treefy":
        treefyFile.treefy(process.argv[3],process.argv[4]);
        break;
    case "untreefy":
        untreefyFile.untreefyFn(process.argv[3],process.argv[4]);
        break;
    case "help":
        console.log("Help Command Implemented");
        break;
    default:
        console.log("Work Command");
        break;
}