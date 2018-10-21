// 计量箱信息采录
// 第二张表的唯一标识
var getMetterId = (new Date()).getTime(); //1540024058501
console.log('getMetterId===' + getMetterId);

// 获取缓存 edit
var edit = window.sessionStorage.getItem('edit') ? window.sessionStorage.getItem('edit') : '';


// 获取缓存 [groupId] 更改表1 的number
var groupId = window.sessionStorage.getItem('groupId');

window.common_user.consoleShow('edit====' + edit);
window.common_user.consoleShow('metterId====' + metterId);
window.common_user.consoleShow('groupId====' + groupId);


// 渲染页面
// 如果 edit 的值是edit 就是编辑进入 否则是 增加进来
if (edit != '' && edit == 'eait') {
	// 获取缓存 [metterId] 编辑时查库 回显数据
var metterId = window.sessionStorage.getItem('metterId');
    //    编辑进来 需要先查库渲染页面 [dvcName, dvcId]
    // jlxCailu('30750', [metterId]]])
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

// 点击电表采集按钮
$("#dianbiaoCaiji").on("click", function() {

    // 缓存表2唯一标识 --TODO--
	if(window.sessionStorage.getItem("metterId")){
		confirmPop("提示","请先点击保存再添加电能表");
	}else{
		window.common_user.Click_href('../dianbiao_list/dianbiao_list.html');
	}
   
});


// 点击电表采集按钮

// 点击保存按钮
$("#baocunBtn").on("click", function() {
    window.common_user.consoleShow('点击保存按钮');
    // 获取页面的所有值

    var assetNo = $("#assetNo").val();
    // var dvcName = $("#dvcName").val();
    // var dvcId = $("#dvcId").val();
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
    var phaseCode = $("#phaseCode").val();


    if (assetNo == '') {
        confirmPop("计量箱条码编号不能为空");
        return false;
    }
    if (typeCode == '') {
        confirmPop("设备类型不能为空");
        return false;
    }
    if (sortCode == '') {
        confirmPop("表箱类型不能为空");
        return false;
    }
    if (instLoc == '') {
        confirmPop("安装地址不能为空");
        return false;
    }
    if (boxRows == '') {
        confirmPop("行不能为空");
        return false;
    }
    if (boxCols == '') {
        confirmPop("列不能为空");
        return false;
    }
    if (dataTypeCode == '') {
        confirmPop("材质不能为空");
        return false;
    }
    if (urbanRuralFlag == '') {
        confirmPop("城乡类别不能为空");
        return false;
    }
    if (voltCode == '') {
        confirmPop("电压等级不能为空");
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


    

	// 如果 edit 的值是edit 就是编辑进入 否则是 增加进来
	if (edit != '' && edit == 'eait') {
		var arrName = ['assetNo', 'typeCode', 'sortCode', 'instLoc', 'boxRows', 'boxCols',
        'dataTypeCode', 'orgNo', 'prOrgName', 'assetProperties', 'urbanRuralFlag', 'voltCode', 'posX', 'posY', 'posZ', 'relateCode', 'relateName', 'phaseCode'
    	];
	    var arrValue = [assetNo, typeCode, sortCode, instLoc, boxRows, boxCols,
	        dataTypeCode, orgNo, prOrgName, assetProperties, urbanRuralFlag, voltCode, posX, posY, posZ, relateCode, relateName, phaseCode
	    ];
	}else{
		var groupId=window.sessionStorage.getItem("groupId");
		//判断增加进来的
		var arrName = ['groupId','meterId','number','assetNo', 'typeCode', 'sortCode', 'instLoc', 'boxRows', 'boxCols',
        'dataTypeCode', 'orgNo', 'prOrgName', 'assetProperties', 'urbanRuralFlag', 'voltCode', 'posX', 'posY', 'posZ', 'relateCode', 'relateName', 'phaseCode'
    	];
	    var arrValue = [groupId,getMetterId,'0',assetNo, typeCode, sortCode, instLoc, boxRows, boxCols,
	        dataTypeCode, orgNo, prOrgName, assetProperties, urbanRuralFlag, voltCode, posX, posY, posZ, relateCode, relateName, phaseCode
	    ];
	}
    // 弹出是否更新弹窗
    wu.showDialog({
        title: '提示',
        content: '是否更新？',
        showCancel: true,
        success: function(res) {
            if (res.value == "confirm") {
                // 点击确定 更新页面上的值

                window.common_user.consoleShow('编辑edit==' + edit);
                if (edit.indexOf('edit') != -1) {
                    // 编辑 更新 metterId  [dvcName, dvcId]
					var metterId=window.sessionStorage.getItem("metterId");
                    //var flag = window.android.updataDataJS('30751', arrName, arrValue, [metterId]); //改库
                    if(flag=="true"){
                    	var flags=true;
                    }else{
                    	var flags=false
                    }
                    Click_herf_dianbiao(flags);
					
                } else {
                	//增加进来的
                    window.common_user.consoleShow('新增表数据');
                   

                    // 计量箱新增 getMetterId加上 
                    //var flag = window.android.inseltDataJS("30752", arrName, arrValue); //增加

                    if(flag=="true"){
                    	 //  计量箱组的number++
					var groupId=window.sessionStorage.getItem("groupId");
                    //var txt = window.android.seletDataJS('307400', [groupId]) // 查库
                    // txt = JSON.parse(txt);
                    // var nnumber = txt.data.number;
                    var newNumber=parseInt(nnumber)+1
                    // window.android.updataDataJS('30741', 'number', newNumber, [groupId]); //改库
                    	var flags=true;
                    	window.sessionStorage.setItem("meterId",getMetterId);
                    }else{
                    	var flags=false
                    }
                    Click_herf_dianbiao(flags);

                }

            }
            if (res.value == "cancel") {
                wu.showToast({
                    title: '你取消了',
                    duration: 1500
                })
            }
        }
    })

});


// 跳到电能表弹窗

function Click_herf_dianbiao(flag) {
    if (flag) {
        wu.showDialog({
            title: '提示',
            content: ' 计量箱添加完成是否继续添加电表？',
            showCancel: true,
            success: function(res) {
                if (res.value == "confirm") {
                    //    跳转到电表页面 需要缓存
                    window.common_user.Click_href('../dianbiao_list/dianbiao_list.html');

                }
                if (res.value == "cancel") {
                    wu.showToast({
                        title: '你取消了',
                        duration: 1500
                    })
                }
            }
        })
    } else {
        confirmPop('提示', '更新失败！');
    }


}
// 跳到电能表弹窗




// 点击保存按钮








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
function jlxCailu(Num, arr) {
    //查库 30750/1/2/3    操作 ID ：dvcName ,  dvcId
    var txt = window.android.seletDataJS(Num, arr);
    window.common_user.consoleShow('计量箱采录本页数据====' + txt);
    try {
        if (txt.indexOf('data' != -1)) {
            var txt = JSON.parse(txt);

            $("#assetNo").html(txt.data.assetNo); //计量箱条码编号
            // $("#dvcName").html(txt.data.dvcName);
            // $("#dvcId").html(txt.data.dvcId);
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
            $("#phaseCode").html(txt.data.phaseCode);


        } else {
            window.common_user.consoleShow('----------查询数据为空---------');
        }

    } catch (e) {
        window.common_user.consoleShow('----------异常报错---------');
    }

}
// 查库 渲染页面函数
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