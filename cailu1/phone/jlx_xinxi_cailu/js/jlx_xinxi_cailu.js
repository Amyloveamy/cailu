// 计量箱信息采录
// 缓存资产编号boxSchemeId
var boxSchemeId = window.sessionStorage.getItem('boxSchemeId');
var activNo = window.sessionStorage.getItem('activNo');
var appNo = window.sessionStorage.getItem('appNo');

// 获取缓存 boxNum 采录设备数量
var boxNum = window.sessionStorage.getItem('boxNum');
window.common_user.consoleShow('boxNum====' + boxNum);
if (boxNum > 1) {
    $("#treeBtn").show();
    $("#doubleBtn").hide();
} else {
    $("#doubleBtn").show();
    $("#treeBtn").hide();
}

// 获取缓存 boxNum 采录设备数量

// 渲染页面start

// 调用 jlxcaiLu渲染处理函数
// 307800根据boxSchemeId查询   307811根据boxSchemeId更改
// jlxcaiLu("307800", [boxSchemeId]);

// 调用 jlxcaiLu渲染处理函数

// 查库进行页面渲染函数
function jlxcaiLu(Num, arr) {
    var txt = window.android.seletDataJS(Num, arr);
    window.common_user.consoleShow('这是本页数据' + txt);
    try {
        if (txt.indexOf("data") != -1) {
            consoleShow('在try上是否有本页数据' + txt);

            txt = JSON.parse(txt);
            // 上部分数据
            var appNo = txt.appNo;
            var consNo = txt.consNo;
            var consName = txt.consName;
            var elecAddr = txt.elecAddr;
            var wiringMode = txt.wiringMode;
            var lineName = txt.lineName;
            var tgName = txt.tgName;
            var tranIde = txt.tranIde;
            var boxSchemeId = txt.boxSchemeId;
            // 下部分数据
            var assetNo = txt.assetNo;
            var relateCode = txt.relateCode;
            var joinName = txt.joinName;
            var joinId = txt.joinId;
            var phaseCode = txt.phaseCode;
            var posX = txt.posX;
            var posY = txt.posY;
            var posZ = txt.posZ;


            $(".appNo").html(appNo);
            $(".consNo").html(consNo);
            $(".consName").html(consName);
            $(".elecAddr").html(elecAddr);
            $(".wiringMode").html(wiringMode);
            $(".lineName").html(lineName);
            $(".tgName").html(tgName);
            $(".tranIde").html(tranIde);
            $(".boxSchemeId").html(boxSchemeId);


            // 拟挂接设备 没有字段 --TODO--
            $(".tiaoma_bianhao").html(assetNo);
            $("#guajie_shebei").html(relateCode); //relateCode 挂接设备类型
            $("#guajie_name").html(joinName); //joinName 挂接设备名称
            $("#guajieshebei_biaoshi").html(joinId); //joinId 挂接设备标识
            $("#xiangbie").html(phaseCode); //phaseCode 相别
            $("#posX").html(posX); //posX 经度
            $("#posY").html(posY); //posY 纬度
            $("#posZ").html(posZ); //posZ 高程

        }

    } catch (e) {
        window.common_user.consoleShow('----------异常报错---------');
    }
}
// 查库进行页面渲染函数

// 渲染页面end


//挂接设备类型下拉框

$("#gjshebei_leixing").on("click", function() {
    window.common_user.consoleShow("挂接设备类别===" + relateCode);
    openActionsheet("选择挂接设备类型", relateCode, $("#gjshebei_leixing input"));

})

//挂接设备类型下拉框


//挂接设备名称下拉框
$("#gjshebei_name input").on("click", function() {
    window.common_user.consoleShow("挂接设备名称" + JSON.stringify(joinName))
    openActionsheet("选择挂接设备名称", joinName, $("#gjshebei_name input"), function(value) {
        // 拟挂接设备 挂接设备标识 是否显示
        window.common_user.consoleShow('回调函数==' + value)
        if (value.indexOf('其他') != -1) {
            $('#guajie_shebei_biaoshi_li').hide();
            $('#niguajie_shebei_li').show();
        } else {
            console.log('value==' + value)
            $('#guajie_shebei_biaoshi_li').show();
            $('.guajieshebei_biaoshi').html(value);
            $('#niguajie_shebei_li').hide();
        }
    });

})

//挂接设备名称下拉框

// 点击刷新图标 下载接入点信息（bjYdzyGetJoinData）
$("#shuaxin_icon").on("click", function() {

    window.common_user.consoleShow("你点击了刷新图标");
    //入参 =>userNo 工号 termNo 移动作业终端编号  orgNo 单位编号 tranIde 生产变压器标识
    var rucanData = {
        "orgNo": window.sessionStorage.getItem("orgNo1"),
        "tranIde": window.sessionStorage.getItem("tranIde"),
        "userNo": window.sessionStorage.getItem("userNo"),
        "termNo": window.sessionStorage.getItem("termNo"),
    }

    var data = BZYD.data("bjYdzyGetJoinData", rucanData);
    data = JSON.stringify(data);
    window.android.httpServer("bjYdzyGetContDevData", data); // 发出请求


})


// 点击刷新图标

// 相别下拉框
$("#xiangbie").on("click", function() {

    openActionsheet("请选择相别", phaseCode, $("#xiangbie"));

})

// 相别下拉框


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

// 点击上一设备 下一设备

$("#topShebei").on("click", function() {
    seachFun('0');
})
$("#nextShebei").on("click", function() {
    seachFun('2');
})

// 点击上一设备 下一设备



// 点击保存按钮 保存数据
$('#saveBtn').on("click", function() {
    window.common_user.consoleShow('点击保存按钮');
    // 点击保存公共函数调用
    baocunFun();
})

// 点击保存按钮 保存数据

// 点击提交

$("#sunmitBtn").on("click", function() {

    // 获取页面上的数据
    var assetNo = $("#tiaoma_bianhao").val(); // assetNo 计量箱资产编号
    var relateCode = $("#guajie_shebei").val(); // relateCode 挂接设备类型
    var joinName = $("#guajie_name").val(); // joinName 挂接设备名称
    var joinId = $("#guajieshebei_biaoshi").val(); // joinId 挂接设备标识
    var phaseCode = $("#xiangbie").val(); // phaseCode 相别
    var posX = $("#posX").val(); // posX 经度
    var posY = $("#posY").val(); // posY 纬度
    var posZ = $("#posZ").val(); // posZ 高程

    if (assetNo == '') {
        confirmPop("计量箱资产编号不能为空");
        return false;
    }
    if (relateCode == '') {
        confirmPop("挂接设备类型不能为空");
        return false;
    }
    if (joinName == '') {
        confirmPop("挂接设备名称不能为空");
        return false;
    }
    if (joinId == '') {
        confirmPop("挂接设备标识不能为空");
        return false;
    }
    if (phaseCode == '') {
        confirmPop("相别不能为空");
        return false;
    }
    if (posX == '') {
        confirmPop("经度不能为空");
        return false;
    }
    if (posY == '') {
        confirmPop("纬度不能为空");
        return false;
    }

    // 5.2.5上传计量容器采录信息 将采录设备信息上传至营销系统

    // 入参
    var shangchuanData = {
        "appNo": appNo,
        "activNo": activNo,
        "assetNo": assetNo,
        "boxSchemeId": boxSchemeId,
        "assetNo": assetNo,
        "relateCode": relateCode,
        "joinName": joinName,
        "joinId": joinId,
        "phaseCode": phaseCode,
        "posX": posX,
        "posY": posY,
        "posZ": posZ

    };
    var data = BZYD.data("ydzySetContDevDetail", shangchuanData);
    data = JSON.stringify(data);
    window.android.httpServer("ydzySetContDevDetail", data); // 发出请求

})

// 点击提交
// 安卓方法 返回值处理
BZYD.returnHttpServerData = function(json) {
    var json = Json.parse(json.data) ? Json.parse(json.data) : Json.parse(json);
    if (json.returnCode == "1000" || json.returncode == "1001") {
        if (json.code == 'bjYdzyGetJoinData') {
            // 下载接入点
            bjYdzyGetJoinData(json);
        } else if (json.code == 'ydzySetContDevDetail') {
            // 上传计量箱采录信息
            ydzySetContDevDetail(json);
        }

    } else {
        confirmPop('提示', json.returnMSG);
    }

}


// 下载接入点接口bjYdzyGetJoinData返回的值
function bjYdzyGetJoinData(json) {

    // dateList  joinId	挂接设备标识 joinName	挂接设备名称 joinPoint	挂接设备位置

    var dateList = json.dateLists.dateList;
    if (!(typeof dateList === 'object' && !isNaN(dateList.length))) {
        // dateList 对象
        joinName = [];
        joinName.push(dateList.joinName);

    } else {
        // dateList 数组
        joinName = joinName;
    }
}

// 下载接入点接口bjYdzyGetJoinData返回的值


// 上传计量容器采录信息处理函数
function ydzySetContDevDetail() {

    // 工单状态变为“已完成”，同时将数据存在终端本地数据库，后台不存。
    window.android.updataDataJS('30561', ['listStatus'], ['03'], [appNo, activeNo]); //修改表的字段-->
    confirmPop('提示', '提交成功');
    // 跳转到首页
    window.history.go(-1);

}
// 上传计量容器采录信息处理函数

// 点击上一设备 下一设备 公共方法
var num = 0;
// shebei 0 上一设备 shebei 
//1 当前设备 shebei 2 下一设备
function seachFun(shebei) {

    if (shebei == 0) {
        num--;
    } else if (shebei == 2) {
        num++;
    } else {
        num = 0;
    }
    if (num < 0) {
        confirmPop('提示', '没有上一设备了！');
        return false
    }
    var txt = window.android.seletDataJS('30720', [appNo, activNo]) //查库
    var txtData = JSON.parse(txt).data;
    if (num >= txtData.length) {
        confirmPop('提示', '没有下一设备了！');
        return false
    }
    var data = txtData[num];

    var appNo = data.appNo;
    var consNo = data.consNo;
    var consName = data.consName;
    var elecAddr = data.elecAddr;
    var wiringMode = data.wiringMode;
    var lineName = data.lineName;
    var tgName = data.tgName;
    var tranIde = data.tranIde;
    var boxSchemeId = data.boxSchemeId;
    // 下部分数据
    var assetNo = data.assetNo;
    var relateCode = data.relateCode;
    var joinName = data.joinName;
    var joinId = data.joinId;
    var phaseCode = data.phaseCode;
    var posX = data.posX;
    var posY = data.posY;
    var posZ = data.posZ;


    $(".appNo").html(appNo);
    $(".consNo").html(consNo);
    $(".consName").html(consName);
    $(".elecAddr").html(elecAddr);
    $(".wiringMode").html(wiringMode);
    $(".lineName").html(lineName);
    $(".tgName").html(tgName);
    $(".tranIde").html(tranIde);
    $(".boxSchemeId").html(boxSchemeId);



    // 拟挂接设备 没有字段
    $(".tiaoma_bianhao").html(assetNo);
    $("#guajie_shebei").html(relateCode); //relateCode 挂接设备类型
    $("#guajie_name").html(joinName); //joinName 挂接设备名称
    $("#guajieshebei_biaoshi").html(joinId); //joinId 挂接设备标识
    $("#xiangbie").html(phaseCode); //phaseCode 相别
    $("#posX").html(posX); //posX 经度
    $("#posY").html(posY); //posY 纬度
    $("#posZ").html(posZ); //posZ 高程

}
// 点击上一设备 下一设备 公共方法

// 点击保存按钮公共方法
function baocunFun() {
    // 获取页面上的数据
    var assetNo = $("#tiaoma_bianhao").val(); // assetNo 计量箱资产编号
    var relateCode = $("#guajie_shebei").val(); // relateCode 挂接设备类型
    var joinName = $("#guajie_name").val(); // joinName 挂接设备名称
    var joinId = $("#guajieshebei_biaoshi").val(); // joinId 挂接设备标识
    var phaseCode = $("#xiangbie").val(); // phaseCode 相别
    var posX = $("#posX").val(); // posX 经度
    var posY = $("#posY").val(); // posY 纬度
    var posZ = $("#posZ").val(); // posZ 高程
    // 拟采录设备 要存库 --TODO--

    // 如其中一项必填项为空  采录中
    if (assetNo == '' || relateCode == "" || joinName == "" || joinId == "" || phaseCode == "" || posX == "" || posY == "") {
        var zt = '02';
    } else {
        var zt = '03';
    }

    // 存库
    var arrName = ['zt', 'assetNo', 'relateCode', 'joinName', 'joinId', 'phaseCode', 'posX', 'posY', 'posZ'];
    var arrValue = [zt, assetNo, relateCode, joinName, joinId, phaseCode, posX, posY, posZ];

    // 安卓更新方法 成功 返回 'true'
    var baocunRuku = window.android.updataDataJS('307811', arrName, arrValue, [boxSchemeId]); //修改表的字段-->

    if (baocunRuku == 'true') {
        confirmPop('提示', '保存成功');
    } else {
        confirmPop('提示', '保存失败');
    }

}
// 点击保存按钮公共方法



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