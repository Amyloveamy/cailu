// 计量箱信息采录

var getAmmeterId = (new Date()).getTime(); //1540024058501
// 获取缓存 显示按钮数量
//获取计量箱关系的标识
var meterId=window.sessionStorage.getItem("meterId");

var bunNum = window.sessionStorage.getItem('btnNum');
console.log('bunNum====' + bunNum)
if (bunNum == 3 && bunNum != '' && bunNum != null) {
    $("#treeBtn").show();
    $("#doubleBtn").hide();
} else {
    $("#doubleBtn").show();
    $("#treeBtn").hide();
}

//点击保存
// 点击保存按钮
$("#baocunBtn").on("click", function() {
    window.common_user.consoleShow('点击保存按钮');
    // 获取页面的所有值
    var assetNo = $("#assetNo").val();//电能表资产编号
    var boxCol = $("#boxCol").val();
    var boxRow = $("#boxRow").val();

    if (assetNo == '') {
        confirmPop("电能表资产编号不能为空");
        return false;
    }
    if (boxCol == '') {
        confirmPop("行不能为空");
        return false;
    }
    if (boxRow == '') {
        confirmPop("列不能为空");
        return false;
    }
    
    var edit=window.sessionStorage.getItem("edit");
    if (edit.indexOf('edit') != -1) {
        // 编辑 更新  [dvcName, dvcId]
        var ammeterId=window.sessionStorage.getItem('ammeterId')
        window.common_user.consoleShow('编辑groupId==' + groupId);
		var arrName=['assetNo','boxCol','boxRow'];
    	var arrValue=[assetNo,boxCol,boxRow];
        // iss=window.android.updataDataJS('30761', arrName, arrValue, [ammeterId]); //改库
		 if(iss=="true"){
		        	confirmPop("提示", "保存成功")
		        }else{
		        	confirmPop("提示", "保存失败")
		 }
    } else { 
    	var arrName=['meterId',"ammeterId",'assetNo','boxCol','boxRow'];
    	var arrValue=[meterId,getAmmeterId,assetNo,boxCol,boxRow];
    	
    	
        // 新增 增加 状态未上传 one = 01 
        iss=window.android.inseltDataJS("30752", arrName, arrValue); //增加
         if(iss=="true"){
         	//查询计量箱关系库找出num
	    	var txt=  window.android.seletDataJS('307500', [meterId])//查库
	    	var number=JSON.parse("txt").data.number;
	    	var newNumber=parseInt(number)+1;
	    	window.android.updataDataJS('30751', ['number'], [newNumber], [meterId])//改库
        	confirmPop("提示", "保存成功")
        }else{
        	confirmPop("提示", "保存失败")
        }
    }
    
   


});

//点击保存

//获取计量箱关系的行跟列来给此页面的行跟列赋值
var meterId=window.sessionStorage.getItem("meterId");
var txt= window.android.seletDataJS('307500', [meterId])//查库
//行
var newBoxCol=JSON.parse("txt").data.boxCols
//列
var newBoxRow=JSON.parse("txt").data.boxRows
//行下拉框
var boxCol1=[];
for(var i=0;i<=newBoxCol;i++){
	boxCol1.push({
		title: i,
        value: i,
        color: ''
	})
}
//列下拉框
var boxRow1=[];
for(var i=0;i<=newBoxRow;i++){
	boxCol1.push({
		title: i,
        value: i,
        color: ''
	})
}
$("#boxCol").on("click", function() {
    console.log("行===" + boxCol1);
    openActionsheet("选择行", boxCol1, $("#boxCol"));

})


//行下拉框

//列下拉框

$("#boxRow").on("click", function() {
    console.log("列===" + boxRow1);
    openActionsheet("选择列", boxRow1, $("#boxRow"));

})


//列下拉框
