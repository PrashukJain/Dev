const $=require("jquery");
const fs=require("fs");
const dialog = require("electron").remote.dialog;
$(document).ready(function(){
let db=[];
let lsc;
$(".cell-container").on("scroll",function(){
    let scrollY=$(this).scrollTop();
    let scrollX=$(this).scrollLeft();
    $("#top-row,#top-left-cell").css("top",scrollY+"px");
    $("#left-col,#top-left-cell").css("left",scrollX+"px");
})
$(".menu").on("click", function () {
    let Id = $(this).attr("id");
    // File
    $(".menu-options").removeClass("selected");
    $(`#${Id}-menu-options`).addClass("selected");
})
$("#grid .cell").on("keyup",function(){
    let { rowid}=getrc(this);
    let ht=$(this).height();
    $("#left-col .cell").eq(rowid).height(ht);
})
$("#New").on("click",function(){
    console.log("asdasd")
    let Allrows=$("#grid").find(".row");
    for(let i=0;i<Allrows.length;i++){
        let row=[];
        let Allcols=$(Allrows[i]).find(".cell");
        for(let j=0;j<Allcols.length;j++){
            let cell={
                value:"",
                formula:"",
                downstream:[],
                upstream:[],
                bold:false,
                Underline:false,
                italic:false,
                fontFamily: "Arial",
                    fontSize: 12,
                    bgColor: "white",
                    textColor: "black",
                    halign: "left"
            };
            $(Allcols[j]).html('');
            $(Allcols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
            $(Allcols[j]).css("font-style", cell.italic ? "italic" : "normal");
            $(Allcols[j]).css("text-decoration", cell.underline ? "underline" : "none");
            $(Allcols[j]).css("font-family", cell.fontFamily);
            $(Allcols[j]).css("font-size", cell.fontSize);
            $(Allcols[j]).css("color", cell.textColor);
            $(Allcols[j]).css("background-color", cell.bgColor);
            $(Allcols[j]).css("text-align", cell.halign);

            row.push(cell);
        }
        db.push(row);
    }
    // console.log(db);
    $("#grid .cell").eq(0).trigger("click");
    // let cellArr = $("#grid .cell");
    //     $(cellArr[0]).trigger("click");
})
$("#Save").on("click", async function () {
    let sdb = await dialog.showOpenDialog();
    let fp = sdb.filePaths[0];
    if (fp == undefined) {
        console.log("Please select file first");
        return;
    }
    console.log(fp);
    let jsonData = JSON.stringify(db);
    fs.writeFileSync(fp, jsonData);
    // open dialogBox
    // select file
    // write 
    // Input=> file
})
$("#Open").on("click", async function () {
    let sdb = await dialog.showOpenDialog();
    let fp = sdb.filePaths[0];
    if (fp == undefined) {
        console.log("Please select file first");
        return;
    }
    let buffer = fs.readFileSync(fp);
    db = JSON.parse(buffer);
    let AllRows = $("#grid").find(".row");
    for (let i = 0; i < AllRows.length; i++) {
        let AllCols = $(AllRows[i]).find(".cell");
        for (let j = 0; j < AllCols.length; j++) {
            //    DB
            // $(`#grid .cell[r-id=${i}][c-id=${j}]`).html(db[i][j].value);
            let cell = db[i][j];
            $(AllCols[j]).html(cell.value);
            $(AllCols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
            $(AllCols[j]).css("font-style", cell.italic ? "italic" : "normal");
            $(AllCols[j]).css("text-decoration", cell.underline ? "underline" : "none");
            $(AllCols[j]).css("font-family", cell.fontFamily);
            $(AllCols[j]).css("font-size", cell.fontSize);
            $(AllCols[j]).css("color", cell.textColor);
            $(AllCols[j]).css("background-color", cell.bgColor);
            $(AllCols[j]).css("text-align", cell.halign);
        }
    }
})
let lcell;
$("#grid .cell").on('click',function(){
    let {rowid, colid}=getrc(this);
    let cell=String.fromCharCode(65+colid)+(rowid+1);
    // console.log(cell);
    let cellObject = db[rowid][colid];
    $("#address-input").val(cell);
    $("#formula-input").val(db[rowid][colid].formula);
    lsc=this;
    if (lcell && this != lcell) {
        $(lcell).removeClass("selected");
    }
    $(this).addClass("selected");
    //bold
        if (cellObject.bold) {
            $("#bold").addClass("isOn")
        } else {
            $("#bold").removeClass("isOn")
        }
        if (cellObject.Underline) {
            $("#underline").addClass("isOn")
        } else {
            $("#underline").removeClass("isOn")
        }
        if (cellObject.italic) {
            $("#italic").addClass("isOn")
        } else {
            $("#italic").removeClass("isOn")
        }
    lcell=this;
    // console.log(db);
})
//Bold
$("#bold").on("click",function(){
    $(this).toggleClass("isOn");
    let isBold = $(this).hasClass("isOn");
    $("#grid .cell.selected").css("font-weight", isBold ? "bolder" : "normal");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getcell(cellElem);
        cellObject.bold = isBold;
        // let { rowid}=getrc(this);
        // let ht=$(this).height();
        // $("#left-col .cell").eq(rowid).height(ht);
 })
 
// UnderLine
$("#underline").on("click",function(){
    $(this).toggleClass("isOn");
    let isUnderline=$(this).hasClass("isOn");
    $("#grid .cell.selected").css("text-decoration",isUnderline?"underline":"none");
    let cellElem = $("#grid .cell.selected");
    let cellObject = getcell(cellElem);
    cellObject.Underline=isUnderline;
})
$("#italic").on("click",function(){
    $(this).toggleClass("isOn");
    let isItalic=$(this).hasClass("isOn");
    $("#grid .cell.selected").css("font-style",isItalic?"italic":"normal");
    let cellElem = $("#grid .cell.selected");
    let cellObject = getcell(cellElem);
    cellObject.italic=isItalic;
})
$("#font-family").on("change", function () {
    let fontFamily = $(this).val();
    $("#grid .cell.selected").css("font-family", fontFamily);
    let cellElem = $("#grid .cell.selected");
    let cellObject = getcell(cellElem);
    cellObject.fontFamily = fontFamily
})

$("#bg-color").on("change", function () {
    let bgColor = $(this).val();
    let cellElem = $("#grid .cell.selected");
    cellElem.css("background-color", bgColor);
    let cellObject = getcell(cellElem);
    cellObject.bgColor = bgColor
})





















// 
/**
 * value->value
 * value->formula
 */
    $("#grid .cell").on("blur", function () {
        let { colid, rowid } = getrc(this);
        let cellObject = getcell(this);
        
        if (cellObject.value == $(this).html()) {
            lsc=this;
            return
        }

        if (cellObject.formula) {
            rmusnds(cellObject, this);
        }

        cellObject.value = $(this).text();
        updateCell(rowid, colid, cellObject.value);
        // console.log(db);
        lsc = this;
    })
    /**Formula condition
     * formula->formula
     * formula->value
     */
 $("#formula-input").on("blur",function(){
let cellObj=getcell(lsc);
if(cellObj.formula==$(this).val()){
    return;
}
let {colid,rowid}=getrc(lsc);
if(cellObj.formula){
//delete Formula
    deleteformula(cellObj,lsc);
}
cellObj.formula=$(this).val();
//add formula
addformula(cellObj.formula,lsc);
let nVal=evaluate(cellObj);
console.log(nVal);
updateCell(rowid,colid,nVal);
})
function updateCell(rowId, colId, nVal) {
    let cellObject = db[rowId][colId];
    cellObject.value = nVal;
    // update ui 
$(`#grid .cell[r-id=${rowId}][c-id=${colId}]`).html(nVal);

    for (let i = 0; i < cellObject.downstream.length; i++) {
        let dsocordObj = cellObject.downstream[i];
        let dso = db[dsocordObj.rowId][dsocordObj.colId];
        let dsonVal = evaluate(dso);
        updateCell(dsocordObj.rowId, dsocordObj.colId, dsonVal);
    }

}
function deleteformula(cellObject,cellElem){
cellObject.formula="";
let {colId,rowId}=getrc(cellElem);
for(let i=0;i<cellObject.upstream.length;i++){
    let uso = cellObject.upstream[i];
    let fuso = db[uso.rowId][uso.colId];
    // find index splice yourself
    let fArr = fuso.downstream.filter(function (dCell) {
        return !(dCell.colId == colId && dCell.rowId== rowId);
    })
    fuso.downstream = fArr;
}
cellObject.upstream=[];
}
function addformula(formula,cellElem){
    formula =formula.replace("(","").replace(")","");
let formulaComponent=formula.split(" ");
for(let i=0;i<formulaComponent.length;i++){
    let charAt0=formulaComponent[i].charCodeAt(0);
    if(charAt0>64&&charAt0<91){
        let { r , c }=getParentRowCol(formulaComponent[i],charAt0);
        let parentCell=db[r][c];
        let {colid,rowid}=getrc(cellElem);
        let cell=getcell(cellElem);
        parentCell.downstream.push({
            colId:colid,rowId:rowid
        });
        cell.upstream.push({
            colId:c,rowId:r
        });
    }
}
}
function evaluate(cellObject){
    let formula=cellObject.formula;
    console.log(formula);
    for (let i = 0; i < cellObject.upstream.length; i++) {
        let cuso = cellObject.upstream[i];
        // rId,CId => A1
        let colAddress = String.fromCharCode(cuso.colId + 65);
        let cellAddress = colAddress + (cuso.rowId + 1);
        let fusokiVal = db[cuso.rowId][cuso.colId].value;
        let formulCompArr = formula.split(" ");
        formulCompArr = formulCompArr.map(function (elem) {
            if (elem == cellAddress) {
                return fusokiVal;
            } else {
                return elem;
            }
});
formula=formulCompArr.join(" ");
    }
console.log(formula);
return eval(formula);


}
function getParentRowCol(formulaComponent,charAt0){
let c=charAt0-65;
let sArr=formulaComponent.split("");
sArr.shift();
let sRow=sArr.join("");
let r=Number(sRow)-1;
return {r,c};
}
function getcell(elem){
    let {colid,rowid}=getrc(elem);
    return db[rowid][colid];
}
    function getrc(elem){
        let rowid=Number($(elem).attr('r-id'));
        let colid=Number($(elem).attr('c-id'));
        return{
colid ,rowid       
    };
}
/*
$("#grid .cell").on('blur',function(){
    console.log(2);
    let {rowid,colid}=getrc(this);
    db[rowid][colid].value=$(this).text();
    // console.log(db);
})
*/
function init(){
    $("#file").trigger("click");
$("#New").trigger("click");
    // let Allrows=$("#grid").find(".row");
    // for(let i=0;i<Allrows.length;i++){
    //     let row=[];
    //     let Allcols=$(Allrows[i]).find(".cell");
    //     for(let j=0;j<Allcols.length;j++){
    //         let cell={
    //             value:"",
    //             formula:"",
    //             downstream:[],
    //             upstream:[]
    //         };
    //         row.push(cell);
    //     }
    //     db.push(row);
    // }
    // console.log(db);
}
init();
})