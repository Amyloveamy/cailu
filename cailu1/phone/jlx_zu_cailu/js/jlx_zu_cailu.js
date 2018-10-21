// 计量箱组信息采录
window.common_user.consoleShow('计量箱组采录');
// 获取时间戳
// var groupId = ToData(); //2018-10-20 16:27:38
var getGroupId = (new Date()).getTime(); //1540024058501
console.log('groupId===' + groupId);


// 获取时间戳

// 获取缓存 edit
var edit = window.sessionStorage.getItem('edit') ? window.sessionStorage.getItem('edit') : '';
// 获取缓存 [groupId] 编辑时查库 回显数据
var groupId = window.sessionStorage.getItem('groupId')?window.sessionStorage.getItem('groupId'):"";

window.common_user.consoleShow('edit====' + edit);
window.common_user.consoleShow('groupId====' + groupId);


// 渲染页面
// 如果 edit 的值是edit 就是编辑进入 否则是 增加进来
if (edit != '' && edit == 'eait') {
    //    编辑进来 需要先查库渲染页面 [groupId]
    // jlxZuCailu('30740', groupId])
}


// 渲染页面


// 点击刷新按钮

$("#refresh").on("click", function() {
    window.common_user.consoleShow("你点击了刷新按钮");
    //获取经纬度
    var getPosition = window.android.getPosition();
    var getPositions = JSON.parse(getPosition);

    window.common_user.consoleShow("getPositions============>" + getPositions);
    window.common_user.consoleShow("经度============>" + getPositions.longitude);
    window.common_user.consoleShow("纬度============>" + getPositions.latitude);
    window.common_user.consoleShow("高程============>" + getPositions.altitude);

    $("#posX").html(getPositions.longitude);
    $("#posY").html(getPositions.latitude);
    // 安卓的方法获取高程
    $("#posZ").html(getPositions.altitude);

})


// 点击刷新按钮


// 点击保存按钮
$("#baocunBtn").on("click", function() {
    window.common_user.consoleShow('点击保存按钮');
    // 获取页面的所有值

    var dvcName = $("#dvcName").val();
    var dvcId = $("#dvcId").val();
    var typeCode = $("#typeCode").val();
    var sortCode = $("#sortCode").val();
    var instLoc = $("#instLoc").val();
    var boxRows = $("#boxRows").val();
    var boxCols = $("#boxCols").val();
    var dataTypeCode = $("#dataTypeCode").val();
    var orgNo = $("#orgNo").val();
    var prOrgName = $("#prOrgName").val();
    var assetProperties = $("#assetProperties").val();
    var urbanRuralFlag = $("#urbanRuralFlag").val();
    var voltCode = $("#voltCode").val();

    var posX = $("#posX").val();
    var posY = $("#posY").val();
    var posZ = $("#posZ").val();


    var relateCode = $("#relateCode").val();
    var relateName = $("#relateName").val();


    


    if (dvcName == '') {
        confirmPop("分组名称不能为空");
        return false;
    }
    if (posX == '') {
        confirmPop("坐标经度不能为空");
        return false;
    }
    if (posY == '') {
        confirmPop("坐标纬度不能为空");
        return false;
    }
    if (posZ == '') {
        confirmPop("坐标高程不能为空");
        return false;
    }
    if (relateCode == '') {
        confirmPop("挂接设备类型不能为空");
        return false;
    }
    if (relateName == '') {
        confirmPop("挂接设备名称不能为空");
        return false;
    }


    if (edit.indexOf('edit') != -1) {
        // 编辑 更新  [dvcName, dvcId]
        window.common_user.consoleShow('编辑groupId==' + groupId);
		var arrName = ['dvcName', 'dvcId', 'typeCode', 'sortCode', 'instLoc', 'boxRows', 'boxCols',
        'dataTypeCode', 'orgNo', 'prOrgName', 'assetProperties', 'urbanRuralFlag', 'voltCode', 'posX', 'posY', 'posZ', 'relateCode', 'relateName'
    	];
	    var arrValue = [dvcName, dvcId, typeCode, sortCode, instLoc, boxRows, boxCols,
	        dataTypeCode, orgNo, prOrgName, assetProperties, urbanRuralFlag, voltCode, posX, posY, posZ, relateCode, relateName
	    ];
        // iss=window.android.updataDataJS('30751', arrName, arrValue, [groupId]); //改库

    } else {
    	var arrName = ['number','one','groupId','dvcName', 'dvcId', 'typeCode', 'sortCode', 'instLoc', 'boxRows', 'boxCols',
        'dataTypeCode', 'orgNo', 'prOrgName', 'assetProperties', 'urbanRuralFlag', 'voltCode', 'posX', 'posY', 'posZ', 'relateCode', 'relateName'
    	];
	    var arrValue = ['0','01',getGroupId,dvcName, dvcId, typeCode, sortCode, instLoc, boxRows, boxCols,
	        dataTypeCode, orgNo, prOrgName, assetProperties, urbanRuralFlag, voltCode, posX, posY, posZ, relateCode, relateName
	    ];
        // 新增 增加 状态未上传 one = 01 
        // iss=window.android.inseltDataJS("30752", arrName, arrValue); //增加
        
    }
    
    if(iss=="true"){
        	confirmPop("提示", "保存成功")
        }else{
        	confirmPop("提示", "保存失败")
        }


});


// 点击保存按钮




// 点击搜索图标  跳转到 查找台区页面 start

$(".xuanze_xiang #findTaiqu").on("click", function() {

    console.log("查找台区")
    window.common_user.Click_href('../findTaiqu/findTaiqu.html');

})


// 点击搜索图标  跳转到 查找台区页面 end

// 设备类型下拉框

$("#shebei_leixing input").on("click", function() {
    console.log("挂接设备类别===" + typeCode);
    openActionsheet("选择设备类型", typeCode, $("#typeCode"));

})


// 设备类型下拉框
// 表箱类型下拉框

$("#biaoxiang_leixing input").on("click", function() {
    console.log("挂接设备类别===" + sortCode);
    openActionsheet("选择表箱类型", sortCode, $("#biaoxiang_leixing input"));

})


// 表箱类型下拉框





// 材质类型下拉框
$("#caizhi input").on("click", function() {
    console.log("挂接设备类别===" + dataTypeCode);
    openActionsheet("选择表箱类型", dataTypeCode, $("#caizhi input"));

})

// 材质类型下拉框

// 资产性质下拉框
$("#zichanxingzhi input").on("click", function() {
    console.log("资产性质===" + assetProperties);
    openActionsheet("选择资产性质", assetProperties, $("#caizhi input"));

})


// 资产性质下拉框

// 城乡类别下拉框
$("#chengxiang_leibie input").on("click", function() {
    console.log("城乡类别===" + urbanRuralFlag);
    openActionsheet("选择城乡类别", urbanRuralFlag, $("#urbanRuralFlag"));

})

// 城乡类别下拉框

// 电压等级下拉框
$("#dianya_dengji input").on("click", function() {
    console.log("电压等级===" + voltCode);
    openActionsheet("选择电压等级", voltCode, $("#voltCode"));

})

// 电压等级下拉框



// 挂接设备下拉框
$("#guajieshebei_leixing input").on("click", function() {
    console.log("挂接设备===" + relateCode);
    openActionsheet("选择挂接设备", relateCode, $("#guajieshebei_leixing input"));

})

// 挂接设备下拉框


// 相位下拉框
$("#xiangwei input").on("click", function() {
    console.log("挂接设备===" + phaseCode);
    openActionsheet("选择挂接设备", phaseCode, $("#xiangwei input"));

})

// 相位下拉框



// 查库 渲染页面 函数
function jlxZuCailu(Num, arr) {
    //查库  30740/1/2/3     操作 ID ：groundId
    var txt = window.android.seletDataJS(Num, arr);
    window.common_user.consoleShow('计量箱采录本页数据====' + txt);
    try {
        if (txt.indexOf('data' != -1)) {
            var txt = JSON.parse(txt);

            $("#dvcName").html(txt.data.dvcName);
            $("#dvcId").html(txt.data.dvcId);
            $("#typeCode").html(txt.data.typeCode);
            $("#sortCode").html(txt.data.sortCode);
            $("#instLoc").html(txt.data.instLoc);
            $("#boxRows").html(txt.data.boxRows);
            $("#boxCols").html(txt.data.boxCols);
            $("#dataTypeCode").html(txt.data.dataTypeCode);
            $("#orgNo").html(txt.data.orgNo);
            $("#prOrgName").html(txt.data.prOrgName);
            $("#assetProperties").html(txt.data.assetProperties);
            $("#urbanRuralFlag").html(txt.data.urbanRuralFlag);
            $("#voltCode").html(txt.data.voltCode);
            $("#posX").html(txt.data.posX);
            $("#posY").html(txt.data.posY);
            $("#posZ").html(txt.data.posZ);

            $("#relateCode").html(txt.data.relateCode);
            $("#relateName").html(txt.data.relateName);
            // $("#phaseCode").html(txt.data.phaseCode);


        } else {
            window.common_user.consoleShow('----------查询数据为空---------');
        }

    } catch (e) {
        window.common_user.consoleShow('----------异常报错---------');
    }

}
// 查库 渲染页面函数
// 获取时间函数
function ToData() {                     
    var myDate = new Date();                  
    var Month = myDate.getMonth() + 1;                  
    Month = Month < 10 ? "0" + Month : Month;                  
    var data = myDate.getDate();                  
    data = data < 10 ? "0" + data : data;                  
    var Hours = myDate.getHours();                  
    Hours = Hours < 10 ? "0" + Hours : Hours;                  
    var Minutes = myDate.getMinutes();                  
    Minutes = Minutes < 10 ? "0" + Minutes : Minutes;                  
    var Seconds = myDate.getSeconds();                   
    Seconds = Seconds < 10 ? "0" + Seconds : Seconds;                  
    console.log(dates);                  
    var times = Hours + ':' + Minutes + ":" + Seconds;              
    var dates = myDate.getFullYear() + '-' + Month + '-' + data + ' ' + times;                  
    return dates;                
}
// 获取时间函数

// 弹窗 =>确定按钮
function confirmPop(title, content) {
    wu.showDialog({
        title: title,
        content: content,
        showCancel: false,
        success: function(res) {
            if (res.value == "confirm") {}
            if (res.value == "cancel") {}
        }
    })
}
// 弹窗 =>确定按钮