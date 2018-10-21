// 采录设备列表
// 跳转到 设备信息采录页面
// $("#cl-list .cl-lis").on("click", function() {
//     window.common_user.Click_href('../jlx_xinxi_cailu/jlx_xinxi_cailu.html');
// })
// boxSchemeId	计量箱方案标识 assetNo	计量箱资产编号

// 获取缓存 activNo appNo
var activNo = window.sessionStorage.getItem('activNo');
var appNo = window.sessionStorage.getItem('appNo');


// 获取
$(function() {

    // 渲染页面

    // 调用页面渲染函数 30780  根据appNo和activNo查询
    cailuList("30780", [activNo, appNo]);
    // 调用页面渲染函数

    // 渲染页面


    // 点击列表跳转 信息采录页面
    $(".cl-uls").on("click", ".cl-lis", function() {

        var tranIde = $(this).attr('tranIde');

        // 未采录 下载接入点信息（bjYdzyGetJoinData）
        var cailuSign = $(this).find('.cl-rig').html();
        window.common_user.consoleShow('cailuSign====' + cailuSign);

        // 未采录 需要下载接入点信息（bjYdzyGetJoinData） joinName =>挂接设备名称
        //入参 userNo 工号 termNo 移动作业终端编号  orgNo 单位编号 tranIde 生产变压器标识
        var rucanData = {
            "orgNo": window.sessionStorage.getItem("orgNo1"),
            "tranIde": tranIde,
            "userNo": window.sessionStorage.getItem("userNo"),
            "termNo": window.sessionStorage.getItem("termNo"),
        }

        var data = BZYD.data("bjYdzyGetJoinData", rucanData);
        data = JSON.stringify(data);
        window.android.httpServer("bjYdzyGetJoinData", data); // 发出请求

    })

    // 点击列表跳转 信息采录页面


    // 上传按钮
    $("#subBtn").on("click", function() {

        // 判断设备状态是否均为“已采”，若否，则提示“您还有设备未采录！”，
        // 否则，调用“上传计量容器采录信息（ydzySetContDevDetail）”将采录设备信息上传至营销系统。

        var caiStu = $(".cl-lis");

        var flag = true;

        caiStu.each(function(index, item) {

            if ($(item).find('.cl-rig').text() != '已采录') {
                flag = false;
            } else {
                flag = true;
            }

        })

        if (flag == false) {
            confirmPop('提示', '您还有设备未采录！');
            return false;
        }

        // 上传计量容器采录信息（ydzySetContDevDetail）
        var data = {
            'appNo': appNo,
            "activNo": activNo,
            "boxLists": []
        };
        var txt = window.android.seletDataJS("3002332", [appNo, activNo]);
        var txtData = JSON.parse(txt).data;
        for (var i = 0; i < txtData.length; i++) {
            data.boxLists.push({
                'boxSchemeId': txtData[i].boxSchemeId,
                'assetNo': txtData[i].assetNo,
                'relateCode': txtData[i].relateCode,
                'joinName': txtData[i].joinName,
                'joinId': txtData[i].joinId,
                'phaseCode': txtData[i].phaseCode,
                'posX': txtData[i].posX,
                'posY': txtData[i].posY,
                'posZ': txtData[i].posZ

            })
        };

        var data = BZYD.data("ydzySetContDevDetail", data);
        data = JSON.stringify(data);
        window.android.httpServer("ydzySetContDevDetail", data); // 发出请求



    })






    // 上传按钮





    // 安卓方法 返回值处理
    BZYD.returnHttpServerData = function(json) {
        var json = JSON.parse(json).data ? JSON.parse(json).data : JSON.parse(json);
        if (json.returnCode == "1000" || json.returncode == "1001") {
            if (json.code == 'bjYdzyGetJoinData') {
                // 下载接入点信息
                bjYdzyGetJoinData(json);
            } else if (json.code == 'ydzySetContDevDetail') {
                // 上传计量容器采录信息（ydzySetContDevDetail）
                ydzySetContDevDetail(json);
            }
        } else if (json.returncode == "1111") {

            var activNo = window.sessionStorage.getItem('activNo');
            var appNo = window.sessionStorage.getItem('appNo');

            var objone15 = {
                "activNo": activNo,
                "appNo": appNo,
                "status": "06"
            };
            var data15 = BZYD.data("ydzyWorkTranStyle", objone15);
            window.android.updataDataJS('30561', ['listStatus'], ['05'], [isAppNo, isActivNo]); //修改表的字段-->
            window.android.httpServer("ydzyWorkTranStyle", data15);
            consoleShow('成功接收')

            wu.hideToast();
            // $('.dialog').hide();
            var listS = '03';
            window.history.go(0)

        } else {
            confirmPop('提示', json.returnMSG);
        }



    }

    // 上传计量容器采录信息（ydzySetContDevDetail）处理函数
    function ydzySetContDevDetail(json) {

        // 工单状态变为“已完成”，同时将数据存在终端本地数据库，后台不存。
        window.android.updataDataJS('30561', ['listStatus'], ['03'], [appNo, activeNo]); //修改表的字段-->

        confirmPop('提示', '提交成功');
        // 跳转到首页
        window.history.go(-1);

    }


    // 下载接入点bjYdzyGetJoinDat处理函数
    function bjYdzyGetJoinData(json) {

        // dateList  joinId	挂接设备标识 joinName	挂接设备名称 joinPoint	挂接设备位置

        var dateList = json.dateLists.dateList;

        if (!(typeof dateList === 'object' && !isNaN(dateList.length))) {
            // dateList 对象
            joinName = [];
            joinName.push(dateList.joinName)

        } else {
            // dateList 数组
            joinName = joinName;
        }

        //--TODO-- 缓存  boxSchemeId 计量箱方案标识 下个页面 查库
		
        window.common_user.Click_href('../jlx_xinxi_cailu/jlx_xinxi_cailu.html');

    }







    // 列表渲染函数
    function cailuList(Num, arr) {
        var txt = window.android.seletDataJS(Num, arr);
        window.common_user.consoleShow('这是本页数据' + txt);
        try {
            if (txt.indexOf("data") != -1) {
                window.common_user.consoleShow('在try上是否有本页数据' + txt);

                txt = JSON.parse(txt);

                // 采录 已采录 采录中 数量变量

                var weicaiNum = 0;
                var yicaiNum = 0;
                var cailuzhongNum = 0;

                var html = '';
                for (var i = 0; i < txt.data.length; i++) {
                    var cailuStatus = "";

                    switch (txt.data[i].cailuStatus) {
                        case '01':
                            cailuStatus = "未采录"
                            colo = "#555555"
                            weicaiNum++
                            break;
                        case '02':
                            cailuStatus = "采录中"
                            colo = "#f6ab00"
                            cailuzhongNum++
                            break;
                        case '03':
                            cailuStatus = "已采录"
                            colo = "#009c84"
                            yicaiNum++
                            break;
                        default:
                            break;
                    };
                    html += '<li class="cl-lis clear" data-tranIde="' + txt.data[i].tranIde + '">\n' +
                        '                    <div class="cl-lef fl">\n' +
                        '                        <div><span>计量箱资产编号：</span> <span class="assetNo">' + txt.data[i].assetNo + '</span></div>\n' +
                        '                        <div><span>计量箱方案标识：</span> <span class="boxSchemeId">' + txt.data[i].boxSchemeId + '</span></div>\n' +
                        '                    </div>\n' +
                        '                    <div class="cl-rig">\n' +
                        '                        ' + cailuStatus + '\n' +
                        '                    </div>\n' +
                        '                </li>'
                }
                $('.cl-uls').html(html);

                $(".cl-title .yicai").html(yicaiNum);
                $(".cl-title .cailuzhong").html(cailuzhongNum);
                $(".cl-title .weicai").html(weicaiNum);
            }
        } catch (e) {
            window.common_user.consoleShow('----------异常报错---------');
        }
    }

})





//缓存一个信息 跳转页面 按钮显示数量
window.sessionStorage.setItem('btnNum', '3');