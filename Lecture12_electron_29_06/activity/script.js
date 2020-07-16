const $=require("jquery");
$(document).ready(function(){
    console.log("hello");
    let db;
    $('#grid .cell').on('click',function(){
        console.log(1);
      let {colId,rowId}=getrc(this);
        let value=String.fromCharCode(65+colId)+(rowId+1);
        $("#address-input").val(value);
    })
    $("#grid .cell").on("blur",function(){
        console.log(2);
        let {colId,rowId}=getrc(this);
        db[rowId][colId].value=$(this).text();
    console.log(db);
    })
    function init(){
        console.log(3);
        db=[];
        let AllRows=$("#grid").find(".row");
        for(let i=0;i<AllRows.length;i++){
            let row=[];
            let AllCols=$(AllRows[i]).find(".cell");
            for(let j=0;j<AllCols.length;j++){
                let ceil={
                    value:"",
                    formula:""
                };
                row.push(ceil);
            }
            db.push(row);
        }
        console.log(db);
    }
    init();
    function getrc(elem){
        let colId=Number($(elem).attr("c-id"));
        let rowId=Number($(elem).attr("r-id"));
        return{
            colId,rowId
        };
    }
})