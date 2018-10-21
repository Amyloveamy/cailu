/**
 * 班组移动 公共JS
 *
 * @author LYTG
 * @since 2016-06-29 13:25:30
 * @description 引入前一定要先引jQuery和mui.min.js
 */
//    差异化城市变量
// window.sessionStorage.setItem("City_name", "beijing"); //北京
// window.sessionStorage.setItem("City_name","anhui");//安徽

var BZYD = {};

BZYD.ip = null;
BZYD.serverName = null;
BZYD.token = null;
BZYD.sessionId = null;
BZYD.userId = null;
BZYD.userName = null;
BZYD.roleId = null;
BZYD.baseUrl = null;
BZYD.staticUrl = null;

var ydzyUserNo = "anhui02"; //用户注册号
var userNo = "HF11"; //营销账号
var userName = "测试11" //营销名称
var orgNo = "34401"; //供电单位编号
var orgName = "安徽供电公司"; //供电单位名称
var termNo = "1234567890";
var phoneImei = "1234567890";
var source = "19";
//toast提示消息
$('body').append('<div class="modal_frame" style="display:none;">' +
    '<div class="modal_mask_transparent"></div>' +
    '<div class="modal_toast">' +
    '<p class="fs3 typeface_color"></p>' +
    '</div>' +
    '</div>'
);
var toast = function(text) {
    if (text != '') {
        $('.modal_frame').show('slow');
        $('.modal_frame>.modal_toast>p').text(text);
        setTimeout(function() {
            $('.modal_frame').hide();
            $('.modal_frame>.modal_toast>p').text('');
        }, 2000);
    }
};
BZYD.init = function () {
    /*
     * BZYD.ip = "192.168.1.9:21521"; BZYD.serverName = "sxlfapp"; BZYD.userId =
     * 267; BZYD.baseUrl = "http://" + BZYD.ip + "/" + BZYD.serverName +
     * "/protect/"; BZYD.staticUrl = "http://" + BZYD.ip + "/" + BZYD.serverName +
     * "/";
     */
    BZYD.ip = "192.168.1.14:21521";
    // BZYD.ip = "192.168.1.11:21521";
    BZYD.serverName = "sxlfapp";
    BZYD.baseUrl = "http://" + BZYD.ip + "/" + BZYD.serverName + "/protect/";
    BZYD.staticUrl = "http://" + BZYD.ip + "/" + BZYD.serverName + "/";
    if (!window.WebActivity) {
        BZYD.userId = 267;
        return;
    }
    var config1 = WebActivity.getLoginresult();
    var config2 = eval("var config=" + config1);

    if (config) {
        BZYD.userId = config.id;
        BZYD.nickname = config.nickname;
        // BZYD.ip="127.0.0.1:21521";
        BZYD.bz = config.imIp;
    }

};
/*
 * BZYD.jsonpDefault = { }; BZYD.jsonpDefault.callback = "jsonpCallback";
 * BZYD.jsonpDefault.requestType = "GET"; BZYD.jsonpDefault.dataType = "jsonp";
 * BZYD.jsonpDefault.timeout = 5000;
 *
 * /**使用默认的callbackFunctionName
 */
/*
 * BZYD.jsonp = function(action, para, callback){ para = para==null?{ }:para;
 *
 * para.access_token = BZYD.token; para.sessionId = BZYD.sessionId;
 * para.callbackFunctionName = BZYD.jsonpDefault.callback;
 *
 * $.ajax({ async:false, url: BZYD.baseUrl + action, type:
 * BZYD.jsonpDefault.requestType, dataType: BZYD.jsonpDefault.dataType, jsonp:
 * BZYD.jsonpDefault.callback, jsonpCallback : BZYD.jsonpDefault.callback, data:
 * para, timeout: BZYD.jsonpDefault.timeout, success: function (json) {
 * callback(json); } }); };
 */

/** 使用自定义的callbackFunctionName */
/*
 * BZYD.jsonpp = function(callbackFunctionName, action, para, callback){ para =
 * para==null?{ }:para;
 *
 * para.access_token = BZYD.token; para.sessionId = BZYD.sessionId;
 * para.callbackFunctionName = callbackFunctionName;
 *
 * $.ajax({ async:false, url: BZYD.baseUrl + action, type:
 * BZYD.jsonpDefault.requestType, dataType: BZYD.jsonpDefault.dataType, jsonp:
 * callbackFunctionName, jsonpCallback : callbackFunctionName, data: para,
 * timeout: BZYD.jsonpDefault.timeout, success: function (json) {
 * callback(json); } }); };
 */
/** 获取当前页面地址栏参数 */
BZYD.getLocaPara = function () {
    var url = decodeURI(location.href);
    var theRequest = new Object();
    var index = url.indexOf("?");
    if (index != -1) {
        var str = url.substr(index + 1);
        var idx = str.indexOf("&");
        if (idx != -1) {
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                // theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
            }
        } else {
            theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
            // theRequest[str.split("=")[0]]=str.split("=")[1];
        }
    }
    else if (index == -1 && window.uexOnload) {
        var str = uexWindow.getUrlQuery() ? uexWindow.getUrlQuery() : undefined;
        if (str != undefined) {
            //解码
            str = decodeURI(str);

            var idx = str.indexOf("&");
            if (idx != -1) {
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    // theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
                }
            } else {
                theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
                // theRequest[str.split("=")[0]]=str.split("=")[1];
            }
        }
    }
    return theRequest;
};
/** 获取当前页面地址栏参数字符串  代替window.location.href*/
BZYD.getLocaParaStr = function () {
    var url = decodeURI(location.href);
    var index = url.indexOf("?");
    if (index != -1) {

    }
    else if (index == -1 && window.uexOnload) {
        //解码
        var str = uexWindow.getUrlQuery();
        str = decodeURI(str);

        url = url + "?" + str;
    }
    return url;
};
// *页面跳转
BZYD.jnp = function (e) {
    window.location.href = e;
}
// *返回上一页
BZYD.ggb = function () {
    history.go(-1);
}
// 下拉框的方法
BZYD.xiala = function (str, arr, classs, defdata) {
    var Name;
    var val;
    // 安卓的方法
    var str = window.android.selPopWin(str, arr);
    if (str.indexOf("data") == -1) {
        //window.android.show("str===>>>" + str + '空值，無法回顯')
    } else {
        str = JSON.parse(str);
        var data = str.data;
        for (var i = 0; i < data.length; i++) {
            Name = data[i].NAME;
            val = data[i].VALUE;
            if (val == "0" && defdata == "true") {
                continue;
            } else if (defdata == "true") {
                $(classs).append("<option data-value=" + val + ">" + Name + "</option>");
            } else {
                if (defdata && val == defdata) {
                    $(classs).append("<option selected='selected' data-value=" + val + ">" + Name + "</option>");
                } else {
                    $(classs).append("<option data-value=" + val + ">" + Name + "</option>");
                }
            }
        }

    }

}
//车鹏飞
// 二级下拉框的方法
BZYD.xialaTwo = function (str, arr, classs, defdata) {
    var Name;
    var val;
    // 安卓的方法
    var str = window.android.selPopWin(str, arr);
    if (str.indexOf("data") == -1) {
        //window.android.show("str===>>>" + str + '空值，無法回顯')
    } else {
        str = JSON.parse(str);
        var data = str.data;
        $(classs).html('');
        for (var i = 0; i < data.length; i++) {
            Name = data[i].CAT_PRC_NAME;
            val = data[i].PRC_CODE;
            if (val == defdata) {
                $(classs).append("<option selected data-value=" + val + ">" + Name + "</option>");
            } else {
                $(classs).append("<option data-value=" + val + ">" + Name + "</option>");
            }
        }

    }

}
// 保存每个输入框的数据

BZYD.baocun = function (idName) {
    var getdata_id = window.sessionStorage.getItem($(idName).attr("id"));
    var getvalue = window.sessionStorage.getItem($(idName).attr("name"));
    if (getdata_id != null) {
        $(idName).children().eq(getvalue).after("<option selected='selected' >" + getdata_id + "</option>");
        $(idName).children().eq(getvalue).remove();
    }
}
// yk_pub_busi_accept增删改查
// 增删改查方法均需要给相应input,select,span加上class: item
// 如果有button或其它标签，需在方法里新增
BZYD.crud = {};
// 接受参数:表名，例如'30010',字符串
BZYD.crud.createAdd = function (arg, one, two, three, four, five, six, seven) {
    var stict = false;
    var arr = $(".item"); // 每个标签新增类 “item”
    var text, obj, i;
    var arr1 = []; // name值数组
    var arr2 = []; // value值数组
    for (i = 0; i < arr.length; i++) {
        obj = arr[i];
        arr1.push($(obj).attr("name"));
        if (obj.tagName == "SELECT") {
            text = $(obj).find("option:selected").text();
            if ($(obj).attr("data-text") != undefined) {
                if (text == "请选择" || text == null || text == "" || text == "请搜索") {
                    mui.alert("请选择" + $(obj).attr('data-text'));
                    $(".dialog").hide();
                    isNull = true;
                    break;
                }
            }
            text = $(obj).find("option:selected").attr("data-value");
        }
        if (obj.tagName == "INPUT") {
            text = obj.value;
            if ($(obj).attr("data-text") != undefined) {
                if (text == "") {
                    mui.alert("请输入" + $(obj).attr('data-text'));
                    $(".dialog").hide();
                    break;
                }
            }
        }
        if (obj.tagName == "SPAN") {
            text = $(obj).text();
            if ($(obj).attr("data-text") != undefined) {
                if (text == "请选择" || text == null || text == "" || text == "请搜索") {
                    mui.alert("请选择" + $(obj).attr('data-text'));
                    $(".dialog").hide();
                    isNull = true;
                    break;
                }
            }

            if ($(obj).attr("tree_value")) {
                text = $(obj).attr("tree_value");
            } else {
                if (text == undefined || text == "请选择" || text == "请搜索") {
                    text = '';
                }
            }
        }
        if (obj.tagName == "TEXTAREA") {
            text = $(obj).val();
        }
        arr2.push(text);
    }
    arr1.push("appNo");
    arr1.push("activNo");
    arr1.push("zt");
    arr2.push(one);
    arr2.push(two);
    arr2.push('02');
    var arr3 = [];
    for (var i = 0; i < arr1.length; i++) {
        arr3.push(arr1[i]);
    }

    var arr4 = [];
    for (var k = 0; k < arr2.length; k++) {
        arr4.push(arr2[k]);
    }
    if (three != "计量箱" && three != "计量柜") {
        arr1.push("appId");
        arr2.push(window.sessionStorage.getItem("appId"));
        window.android.show("10101010110" + three);
        window.android.show("20202022" + window.sessionStorage.getItem("appId"));
    }
    if (three == "失压仪" || three == "计量柜" || three == "二次回路" || three == "勘查图纸" || three == "计量点用途方案" || three == "计费关系") {
        arr1.push("mpSchemeId");
        arr2.push(window.sessionStorage.getItem("mpSchemeId"));
    }
    if (three == "计量点方案" || three == "用户电价方案信息" || three == "用户定价策略" || three == "电源点") {
        arr1.push("spId");
        arr2.push(window.sessionStorage.getItem("spId"));
        window.android.show("我进来拿spId==" + window.sessionStorage.getItem("spId"));
    }
    if (three == "计量点用途方案" || three == "计费关系") {
        arr1.push("mpId");
        arr2.push(window.sessionStorage.getItem("mpId"));
    }
    if (three == "用户电价方案信息" || three == "勘查信息" || three == "供电方案" || three == "计费关系" || three == "计量点方案" || three == "受电点方案信息") {
        arr1.push("consId");
        arr2.push(window.sessionStorage.getItem("consId"));
    }
    if (three == "计量点方案" || three == "用户电价方案信息" || three == "用户定价策略") {
        arr1.push("schemeId2");
        arr2.push(window.sessionStorage.getItem("schemeId2"));
    }
    if (three == "二次回路" || three == "电源点" || three == "受电点方案信息" || three == "计量点方案") {
        arr1.push("schemeId");
        arr2.push(window.sessionStorage.getItem("schemeId"));
        window.android.show("我进来拿schemeId==" + window.sessionStorage.getItem("schemeId"));
    }
    if (three == "装拆示数") {
        arr1.push("id2");
        arr2.push(window.sessionStorage.getItem("id2"));
    }
    if (three == "互感器" || three == "电能表") {
        arr1.push("mpSchemeId");
        arr2.push(window.sessionStorage.getItem("mpSchemeId"));
    }
    if (three == "计费关系") {
        arr1.push("relaMpId");
        arr2.push(window.sessionStorage.getItem("relaMpId"));
    }
    if (three == "受电点方案信息" || three == "电源点") {
        arr3.push("schemeId");
        arr4.push(window.sessionStorage.getItem("schemeId"));
    }
    if (three == "用户电价方案信息" || three == "供电方案" || three == "计量点方案" || three == "计费关系" || three == "勘查信息") {
        arr3.push("consId");
        arr4.push(window.sessionStorage.getItem("consId"));
    }
    if (three == "用户电价方案信息" || three == "用户定价策略") {
        arr3.push("schemeId2");
        arr4.push(window.sessionStorage.getItem("schemeId2"));
    }
    if (three == "电源点" || three == "供电方案" || three == "计量点方案" || three == "计费关系" || three == "勘查图纸" || three == "用户定价策略" || three == "受电点方案信息") {
        arr3.push("appId");
        arr4.push(window.sessionStorage.getItem("appId"));
        window.android.show("我进来拿appId==" + window.sessionStorage.getItem("appId"));
    }
    if (three == "计量点用途方案" || three == "计费关系") {
        arr3.push("mpId");
        arr4.push(window.sessionStorage.getItem("mpId"));
    }
    if (three == "计量点方案") {
        arr3.push("schemeId2");
        arr4.push(window.sessionStorage.getItem("schemeId2"));
    }
    if (three == "勘查图纸") {
        arr3.push("mpSchemeId");
        arr4.push(window.sessionStorage.getItem("mpId"));
    }
    if (three == "计量柜") {
        arr3.push("mpSchemeId");
        arr4.push(window.sessionStorage.getItem("mpSchemeId"));
    }
    if (arguments.length > 5) {
        var shuju = {};
        var shuju1 = {};
        shuju[five] = [];
        for (var i = 0; i < arr1.length; i++) {
            shuju1[arr1[i]] = arr2[i];
            window.android.show("---------------------------------------------");
            window.android.show(arr1[i] + "===" + arr2[i]);
        }
        if (three == "计量点方案") {
            var appNo = window.sessionStorage.getItem("appNo");
            var activNo = window.sessionStorage.getItem("activNo");
            var arr = [];
            arr.push(appNo);
            arr.push(activNo);
            //         新增保存要用到的数据
            var b = window.android.seletDataJS("30140", arr);
            try {
                window.android.show(b);
                b = JSON.parse(b);
                b = b.data[0];
                shuju1["schemeId"] = b.schemeId;
            } catch (e) {
                window.android.show("我是代码338捕获异常");
            }
        }
        shuju[five].push(shuju1);
        // 数据入库
        var data = BZYD.data(four, shuju);
        data = JSON.stringify(data);
        window.android.show(data);
        window.android.show("33333---" + arr3);
        window.android.show("44444---" + arr4);
        window.android.httpServer(four, data);
        BZYD.returnHttpServerData = function (json) {
            window.android.show("hahahahaahah" + json);
            json = JSON.parse(json);
            if (json.returnCode == "1000" && json.code == four) {
                for (var i = 0; i < json[six].length; i++) {
                    for (var key in json[six][i]) {
                        if (three == "供电方案" && key == "schemeId") {
                            window.sessionStorage.setItem("schemeId", json[six][i][key]);
                        }
                        if (three == "用户电价方案信息" && key == "schemeId") {
                            window.sessionStorage.setItem("schemeId", json[six][i][key]);
                        }
                        if (three == "计量点方案" && key == "mpSchemeId") {
                            window.sessionStorage.setItem("mpSchemeId", json[six][i][key]);
                        }
                        if (three == "计量点方案" && key == "mpId") {
                            window.sessionStorage.setItem("mpId", json[six][i][key]);
                        }
                        if (three == "计量点用途方案" && key == "mpChgId") {
                            arr4[0] = json[six][i][key];
                        }
                        if (three == "计量点用途方案" && key == "mpSchemeId") {

                            window.sessionStorage.setItem("mpSchemeId1", json[six][i][key]);
                            window.android.show("计量点用途方案mpSchemeId1-------" + json[six][i][key]);
                        }
                        if (three == "受电点方案信息" && key == "spId") {
                            window.sessionStorage.setItem("spId", json[six][i][key]);
                        }
                        if (three == "电能表" && key == "id") {
                            //arr4[12] = json[six][i][key];
                            window.android.show("我是367行代码" + arr4.length);
                            window.android.show("电能表--------" + json[six][i][key]);
                            window.android.show("arr3[12]的key值-------" + arr3[12]);

                            window.sessionStorage.setItem("DianNe", json[six][i][key]);
                        }
                        if (three == "勘查图纸" && key == "id") {
                            arr4[0] = json[six][i][key];
                        }
                        if (key == "id" && three == "失压仪") {
                            arr4[0] = json[six][i][key];
                        } else if (key == "id" && three == "装拆示数") {
                            arr3[3] = key;
                            arr4[3] = json[six][i][key];
                        } else {
                            arr3.push(key);
                            arr4.push(json[six][i][key]);

                        }
                    }
                }
                //由于生成表单会再次调用上传营销接口，所以需将zt变为01----修改------start------
                for (var j = 0; j < arr3.length; j++) {
                    var key = arr3[j];
                    if (key == "zt") {
                        window.android.show("成功修改++++++++++++++++++");
                        arr4[j] = "01";
                        break;
                    }
                }
                //由于生存表单会再次调用上传营销接口，所以需将zt变为01----修改------end------
                window.android.show("arr3值------------" + arr3.join(","));
                window.android.show("arr4值测试++++++++++" + arr4.join(","));
                var zhi = window.android.inseltDataJS(arg, arr3, arr4);

                if (zhi == "true") {
                    //mui.alert("上传成功");
                    $(".dialog").hide();
                    mui.alert("提交成功", "", function () {
                        if (three == "计量点方案") {
                            $(".dialog").hide();
                        }
                        $(".dialog").hide();
                        history.go(-1);
                    });
                } else {
                    $(".dialog").hide();
                    mui.alert("上传失败");
                }
            }
            //陈东东 当请求不是1000 10001 返回
            else {
                $(".dialog").hide();
                mui.alert(json.returnMSG);
            }

        }

    } else {
        var shuju = {};
        for (var i = 0; i < arr1.length; i++) {
            shuju[arr1[i]] = arr2[i];
        }
        // 数据入库
        var data = BZYD.data(four, shuju);
        data = JSON.stringify(data);
        window.android.show(data);
        window.android.show("11111" + arr1.join(","));
        window.android.show("22222" + arr2.join(","));
        window.android.httpServer(four, data);
        BZYD.returnHttpServerData = function (json) {
            window.android.show("lalalalla" + json);
            json = JSON.parse(json);
            if (json.returnCode == "1000" && json.code == four) {
                for (var key in json) {
                    if (key == "returnCode" || key == "code" || key == "returnMSG" || key == 'result') {
                        continue;
                    }
                    arr3.push(key);
                    arr4.push(json[key]);
                }
                var zhi = window.android.inseltDataJS(arg, arr3, arr4);
                if (zhi == "true") {
                    $(".dialog").hide();
                    mui.alert("上传成功");

                } else {
                    $(".dialog").hide();
                    mui.alert("上传失败");
                }

            } else {
                $(".dialog").hide();
                mui.alert("营销错误");
            }
        }

    }
    return stict;

};

// 多一个
BZYD.crud.createAdd2 = function (arg, one, two, three, four, five, six) {
    var stict = false;
    var arr = $(".item2"); // 每个标签新增类 “item”
    var text, obj, i;
    var arr1 = []; // name值数组
    var arr2 = []; // value值数组
    for (i = 0; i < arr.length; i++) {
        obj = arr[i];
        arr1.push($(obj).attr("name"));
        if (obj.tagName == "SELECT") {
            text = $(obj).find("option:selected").text();
            if ($(obj).attr("data-text") != undefined) {
                if (text == "请选择" || text == null || text == "" || text == "请搜索") {
                    mui.alert("请选择" + $(obj).attr('data-text'));
                    isNull = true;
                    break;
                }
            }
            text = $(obj).find("option:selected").attr("data-value");
        }
        if (obj.tagName == "INPUT") {
            text = obj.value;
            if ($(obj).attr("data-text") != undefined) {
                if (text == "") {
                    mui.alert("请输入" + $(obj).attr('data-text'));
                    break;
                }
            }
        }

        if (obj.tagName == "SPAN") {
            text = $(obj).text();
            if ($(obj).attr("data-text") != undefined) {
                if (text == "请选择" || text == null || text == "" || text == "请搜索") {
                    mui.alert("请选择" + $(obj).attr('data-text'));
                    isNull = true;
                    break;
                }
            }

            if ($(obj).attr("tree_value")) {
                text = $(obj).attr("tree_value");
            } else {
                if (text == undefined || text == "请选择" || text == "请搜索") {
                    text = '';
                }
            }
        }
        if (obj.tagName == "TEXTAREA") {
            text = $(obj).val();
        }
        arr2.push(text);
    }
    arr1.push("appNo");
    arr1.push("activNo");
    arr1.push("zt");
    var arr3 = [];
    for (var i = 0; i < arr1.length; i++) {
        arr3.push(arr1[i]);
    }
    arr2.push(one);
    arr2.push(two);
    arr2.push('02');
    var arr4 = [];
    for (var k = 0; k < arr2.length; k++) {
        arr4.push(arr2[k]);
    }
    if (three != "计量箱" && three != "计量柜") {
        arr1.push("appId");
        arr2.push(window.sessionStorage.getItem("appId"));
        window.android.show("10101010110" + three);
        window.android.show("20202022" + window.sessionStorage.getItem("appId"));
    }
    if (three == "失压仪" || three == "计量柜" || three == "二次回路" || three == "勘查图纸" || three == "计量点用途方案" || three == "计费关系") {
        arr1.push("mpSchemeId");
        arr2.push(window.sessionStorage.getItem("mpSchemeId"));
    }
    if (three == "计量点方案" || three == "用户电价方案信息" || three == "用户定价策略" || three == "电源点") {
        arr1.push("spId");
        arr2.push(window.sessionStorage.getItem("spId"));
    }
    if (three == "计量点用途方案" || three == "计费关系") {
        arr1.push("mpId");
        arr2.push(window.sessionStorage.getItem("mpId"));
    }
    if (three == "用户电价方案信息" || three == "勘查信息" || three == "供电方案" || three == "计费关系" || three == "计量点方案" || three == "受电点方案信息") {
        arr1.push("consId");
        arr2.push(window.sessionStorage.getItem("consId"));
    }

    if (three == "计量点方案" || three == "用户电价方案信息" || three == "用户定价策略") {
        arr1.push("schemeId2");
        arr2.push(window.sessionStorage.getItem("schemeId2"));
    }
    if (three == "二次回路" || three == "电源点" || three == "受电点方案信息" || three == "计量点方案") {
        arr1.push("schemeId");
        arr2.push(window.sessionStorage.getItem("schemeId"));
    }
    if (three == "装拆示数") {
        arr1.push("id2");
        arr2.push(window.sessionStorage.getItem("id2"));
    }
    if (three == "互感器" || three == "电能表") {
        arr1.push("mpSchemeId");
        arr2.push(window.sessionStorage.getItem("mpSchemeId"));
    }
    if (three == "计费关系") {
        arr1.push("relaMpId");
        arr2.push(window.sessionStorage.getItem("relaMpId"));
    }
    if (three == "受电点方案信息" || three == "电源点" || three == "用户电价方案信息") {
        arr3.push("schemeId");
        arr4.push(window.sessionStorage.getItem("schemeId"));
    }
    if (three == "用户电价方案信息" || three == "供电方案" || three == "计量点方案" || three == "计费关系" || three == "勘查信息") {
        arr3.push("consId");
        arr4.push(window.sessionStorage.getItem("consId"));
    }
    if (three == "用户电价方案信息" || three == "用户定价策略") {
        arr3.push("schemeId2");
        arr4.push(window.sessionStorage.getItem("schemeId2"));
    }
    if (three == "电源点" || three == "供电方案" || three == "计量点方案" || three == "计费关系") {
        arr3.push("appId");
        arr4.push(window.sessionStorage.getItem("appId"));
    }
    if (three == "计量点用途方案" || three == "计费关系") {
        arr3.push("mpId");
        arr4.push(window.sessionStorage.getItem("mpId"));
    }
    if (three == "计量点方案") {
        arr3.push("schemeId2");
        arr4.push(window.sessionStorage.getItem("schemeId2"));
    }
    if (arguments.length > 5) {
        var shuju = {};
        var shuju1 = {};
        shuju[five] = [];
        for (var i = 0; i < arr1.length; i++) {
            shuju1[arr1[i]] = arr2[i];
        }
        if (three == "计量点方案") {
            var appNo = window.sessionStorage.getItem("appNo");
            var activNo = window.sessionStorage.getItem("activNo");
            var arr = [];
            arr.push(appNo);
            arr.push(activNo);
            //         新增保存要用到的数据
            var b = window.android.seletDataJS("30090", arr);
            window.android.show(b);
            b = JSON.parse(b);
            b = b.data[0];
            shuju1.schemeId = b.schemeId
        }
        shuju[five].push(shuju1);

        // 数据入库
        var data = BZYD.data(four, shuju);
        data = JSON.stringify(data);
        window.android.show(data);
        window.android.show("33333" + arr3);
        window.android.show("44444" + arr4);
        window.android.httpServer(four, data);
        BZYD.returnHttpServerData = function (json) {
            window.android.show("hahahahaahah" + json);
            json = JSON.parse(json)
            if (json.returnCode == "1000" && json.code == four) {
                for (var i = 0; i < json[six].length; i++) {
                    for (var key in json[six][i]) {
                        if (three == "供电方案" && key == "schemeId") {
                            window.sessionStorage.setItem("schemeId", json[six][i][key]);
                        }
                        if (three == "计量点用途方案" && key == "mpSchemeId") {
                            window.sessionStorage.setItem("mpSchemeId1", json[six][i][key]);
                        }
                        if (three == "受电点方案信息" && key == "spId") {
                            window.sessionStorage.setItem("spId", json[six][i][key]);
                        }
                        if (three == "电能表" && key == "id") {
                            arr4[11] = "";
                            window.sessionStorage.setItem("DianNe", json[six][i][key]);
                        }
                        if (key == "id" && three == "失压仪") {
                            arr4[0] = json[six][i][key];
                        } else if (key == "id" && three == "装拆示数") {
                            arr4[3] = json[six][i][key];
                        } else {
                            arr3.push(key);
                            arr4.push(json[six][i][key]);

                        }

                    }
                }
                window.android.show("2222222" + arr3.join(","));
                window.android.show("3333333" + arr4.join(","));
                var zhi = window.android.inseltDataJS(arg, arr3, arr4);

                if (zhi == "true") {
                    mui.alert("上传成功");
                } else {
                    mui.alert("上传失败");
                }
            } else {
                mui.alert("营销错误");
            }

        }

    } else {
        var shuju = {};
        for (var i = 0; i < arr1.length; i++) {
            shuju[arr1[i]] = arr2[i];
        }
        // 数据入库
        var data = BZYD.data(four, shuju);
        data = JSON.stringify(data);
        window.android.show(data);
        window.android.show("11111" + arr1.join(","));
        window.android.show("22222" + arr2.join(","));
        window.android.httpServer(four, data);
        BZYD.returnHttpServerData = function (json) {
            window.android.show("lalalalla" + json);
            json = JSON.parse(json);
            if (json.returnCode == "1000" && json.code == four) {
                for (var key in json) {
                    if (key == "returnCode" || key == "code" || key == "returnMSG" || key == 'result') {
                        continue;
                    }
                    arr3.push(key);
                    arr4.push(json[key]);
                }
                var zhi = window.android.inseltDataJS(arg, arr3, arr4);
                if (zhi == "true") {
                    mui.alert("上传成功");

                } else {
                    mui.alert("上传失败");
                }

            } else {
                mui.alert("营销错误");
            }
        }

    }
    return stict;

};
//删除
BZYD.crud.removeSingle = function (tableNo, PRIMARY_KEY, tableNo1, zhuangTai) {
    var d = window.android.seletKeyData(tableNo, PRIMARY_KEY);
    d = JSON.parse(d);
    if (arguments.length >= 4) {
        if (d.data[0].chgDesc == "01") {
            mui.alert("变更说明是新增状态，不能进行虚拆", "", function () {
                location.reload();
            });
        } else {
            var arr1 = [];
            var arr2 = [];
            for (var key in d.data[0]) {
                if (key == "PRIMARY_KEY") {
                    continue;
                } else if (key == "zt") {
                    arr1.push(key);
                    arr2.push("01");
                } else if (key == "chgDesc") {
                    arr1.push(key);
                    arr2.push("09");
                } else {
                    arr1.push(key);
                    arr2.push(d.data[0][key]);
                }
            }
            var arr3 = [];
            var a = PRIMARY_KEY[0];
            arr3.push(a);
            var goBack = window.android.updataKeyData(tableNo1, arr1, arr2, arr3);
            if (goBack == "true") {
                mui.alert("成功");
                location.reload();
            } else {
                mui.alert("失败");
            }
        }
    } else {
        if (d.data[0].chgDesc == "01") {
            var arr1 = [];
            var arr2 = [];
            for (var key in d.data[0]) {
                if (key == "PRIMARY_KEY") {
                    continue;
                } else if (key == "zt") {
                    arr1.push(key);
                    arr2.push("03");
                } else {
                    arr1.push(key);
                    arr2.push(d.data[0][key]);
                }
            }
            var arr3 = [];
            var a = PRIMARY_KEY[0];
            arr3.push(a);
            var goBack = window.android.updataKeyData(tableNo1, arr1, arr2, arr3);
            if (goBack == "true") {
                mui.alert("成功");
                location.reload();
            } else {
                mui.alert("失败");
            }
        } else if (d.data[0].chgDesc == "04" || d.data[0].chgDesc == "07") {
            var arr1 = [];
            var arr2 = [];
            for (var key in d.data[0]) {
                if (key == "PRIMARY_KEY") {
                    continue;
                } else if (key == "zt") {
                    arr1.push(key);
                    arr2.push("01");
                } else if (key == "chgDesc") {
                    arr1.push(key);
                    arr2.push("06");
                } else {
                    arr1.push(key);
                    arr2.push(d.data[0][key]);
                }
            }
            var arr3 = [];
            var a = PRIMARY_KEY[0];
            arr3.push(a);
            var goBack = window.android.updataKeyData(tableNo1, arr1, arr2, arr3);
            if (goBack == "true") {
                location.reload();
                mui.alert("成功");
            } else {
                mui.alert("失败");
            }
        } else if (d.data[0].chgDesc == "06" || d.data[0].chgDesc == "09") {
            var arr1 = [];
            var arr2 = [];
            for (var key in d.data[0]) {
                if (key == "PRIMARY_KEY") {
                    continue;
                } else if (key == "zt") {
                    arr1.push(key);
                    arr2.push("01");
                } else if (key == "chgDesc") {
                    arr1.push(key);
                    arr2.push("06");
                } else {
                    arr1.push(key);
                    arr2.push(d.data[0][key]);
                }
            }
            var arr3 = [];
            var a = PRIMARY_KEY[0];
            arr3.push(a);
            var goBack = window.android.updataKeyData(tableNo1, arr1, arr2, arr3);
            if (goBack == "true") {
                location.reload();
                mui.alert("成功");
            } else {
                mui.alert("失败");
            }
        } else {
            var arr1 = [];
            var arr2 = [];
            for (var key in d.data[0]) {
                if (key == "PRIMARY_KEY") {
                    continue;
                } else if (key == "zt") {
                    arr1.push(key);
                    arr2.push("03");
                } else {
                    arr1.push(key);
                    arr2.push(d.data[0][key]);
                }
            }
            var arr3 = [];
            var a = PRIMARY_KEY[0];
            arr3.push(a);
            var goBack = window.android.updataKeyData(tableNo1, arr1, arr2, arr3);
            if (goBack == "true") {
                mui.alert("成功");
                location.reload();
            } else {
                mui.alert("失败");
            }
        }
    }
};

BZYD.crud.create = function (arg, one, two) {
    var arr = $(".item"); // 每个标签新增类 “item”
    var text, obj, i;
    var arr1 = []; // name值数组
    var arr2 = []; // value值数组
    for (i = 0; i < arr.length; i++) {
        obj = arr[i];
        arr1.push($(obj).attr("name"));
        if (obj.tagName == "SELECT") {
            text = $(obj).find("option:selected").text();
            if ($(obj).attr("data-text") != undefined) {
                if (text == "请选择") {
                    mui.alert("请选择" + $(obj).attr('data-text'));
                    break;
                }
            }
        }
        if (obj.tagName == "INPUT") {
            text = obj.value;
            if ($(obj).attr("data-text") != undefined) {
                if (text == "") {
                    mui.alert("请输入" + $(obj).attr('data-text'));
                    break;
                }
            }
        }
        if (obj.tagName == "SPAN") {
            text = $(obj).text();
        }

        arr2.push(text);
        arr1.push("appNo");
        arr1.push("activNo");
        arr1.push("zt");
        arr2.push(one);
        arr2.push(two);
        arr2.push('02');

    }

    //	 console.dir(arr1);
    //	 console.dir(arr2);
    // console.log(obgTxt);
    // 表名->'30012'
    // name数组-> arr1
    // value值数组-> arr2
    window.android.inseltDataJS(arg, arr1, arr2);
};
// 删除
// 接收参数，均为必填项
// PRIMARY_KEY--->string
// tableNo->对应表名，如'30010'
BZYD.crud.delete = function (tableNo, PRIMARY_KEY) {
    var arr = [];
    var a = PRIMARY_KEY.toString();
    arr.push(a);
    window.android.deletKeyData(tableNo, arr);
};
// 修改
// 接收参数，均为必填项
// aseletKeyData--->string
// tableNo->对应表名，如'30010'
BZYD.crud.update = function (tableNo, PRIMARY_KEY) {
    var arr = $(".item"); // 每个标签新增类 “item”
    var text, obj, i;
    var arr1 = []; // name值数组
    var arr2 = []; // value值数组

    var isNull = false;

    for (i = 0; i < arr.length; i++) {
        obj = arr[i];
        arr1.push($(obj).attr("name"));
        if ($(obj).attr("name") == "chgDesc") {
            if ($(obj).find("option:selected").attr("data-value") == "06") {
                BZYD.xiala("30001", ["chgDesc"], ".chgDesc", "06");
            } else if ($(obj).find("option:selected").attr("data-value") == "01") {
                BZYD.xiala("30001", ["chgDesc"], ".chgDesc", "01");
            } else if ($(obj).find("option:selected").attr("data-value") == "09") {
                BZYD.xiala("30001", ["chgDesc"], ".chgDesc", "09");
            } else {
                BZYD.xiala("30001", ["chgDesc"], ".chgDesc", "07");
            }
        }
        if (obj.tagName == "INPUT") {
            text = obj.value;
            if ($(obj).attr("data-text") != undefined) {
                if (text == "") {
                    mui.alert("请输入" + $(obj).attr('data-text'));
                    $(".dailogo").hide();
                    isNull = true;
                    break;
                }
            }
        }
        if (obj.tagName == "SELECT") {
            text = $(obj).find("option:selected").text();
            if ($(obj).attr("data-text") != undefined) {
                if (text == "请选择" || text == null || text == "" || text == "请搜索") {
                    mui.alert("请选择" + $(obj).attr('data-text'));
                    $(".dailogo").hide();
                    isNull = true;
                    break;
                }
            }
            text = $(obj).find("option:selected").attr("data-value");
        }
        if (obj.tagName == "SPAN") {
            text = $(obj).text();

            if ($(obj).attr("data-text") != undefined) {
                if (text == "请选择" || text == null || text == "" || text == "请搜索") {
                    mui.alert("请选择" + $(obj).attr('data-text'));
                    $(".dailogo").hide();
                    isNull = true;
                    break;
                }
            }
            if ($(obj).attr("tree_value")) {
                text = $(obj).attr("tree_value");
            } else {
                if (text == undefined || text == "请选择" || text == "请搜索") {
                    text = '';
                }
            }
        }
        if (obj.tagName == "TEXTAREA") {
            text = $(obj).val();

            if ($(obj).attr("data-text") != undefined) {
                if (text == null || text == "") {
                    mui.alert("请填写" + $(obj).attr('data-text'));
                    $(".dailogo").hide();
                    isNull = true;
                    break;
                }
            }
        }
        arr2.push(text);
    }

    if (isNull) {
        delete arr1;
        delete arr2;
        return true;
    }
    if (tableNo == "30125") {
        arr2[11] = window.sessionStorage.getItem("DianNe");
    }
    arr1.push("zt");
    arr2.push("01");
    window.android.show("arr1" + arr1.join(","));
    window.android.show("arr2" + arr2.join(","));
    var arr3 = [];
    var a = PRIMARY_KEY.toString();
    arr3.push(a);
    var goBack = window.android.updataKeyData(tableNo, arr1, arr2, arr3);
    if (goBack == "true") {
        mui.alert("成功");
        $(".dailogo").hide();
    } else {
        mui.alert("失败");
        $(".dailogo").hide();
    }

}
// 查询
// 返回列表数据
BZYD.crud.retrieveAll = function (appNo, activNo, tableNo) {
    var arr = [appNo, activNo];
    var d = window.android.seletDataJS(tableNo, arr);
    try {
        if (d != "select_null") {
            window.android.show("---------查询数据为--------" + d);
            d = JSON.parse(d);
            return d;
        } else {
            window.android.show("---------查询为空--------" + tableNo);
        }
    } catch (e) {
        window.android.show("---------异常报错！-------" + tableNo);
    }
};
// 返回单条数据
BZYD.crud.retrieveSingle = function (tableNo, PRIMARY_KEY) {
    var d = window.android.seletKeyData(tableNo, PRIMARY_KEY);
    try {
        if (d != "select_null") {
            d = JSON.parse(d);
            return d;
        } else {
            window.android.show("---------查询为空--------" + tableNo);
        }
    } catch (e) {
        window.android.show("---------异常报错！-------" + tableNo);
    }
};
/**
 * 查询数据库中业扩01，电费02，用检03在签收（01）状态的工单数 busiName；业扩01，电费02，用检03
 */
BZYD.num = function (busiName) {
    var mbusiName = window.android.seletWorkNoticesJS('305611', [window.sessionStorage.getItem('userNo'), busiName]);
    return mbusiName;
};
/**
 * 查询数据库中业务用检查电费各个子功能在签收（01）状态的工单数 activity；业务受理、现场勘查、中间检查等
 */
BZYD.businum = function (activity) {
    var mactivity = window.android.seletWorkNoticesJS('305622', [window.sessionStorage.getItem('userNo'), activity]);
    return mactivity;
};
BZYD.activitynum = function () {
    var txt = window.android.seletDataJS('3000', ['01', window.sessionStorage.getItem("userNo")]);

    return txt;
};

// 待办已办数据的回显
//现场业扩
BZYD.backlog = function (Num, arr, staus) {
    var txt = window.android.seletDataJS(Num, arr);
    // txt = {
    //     "data": [{
    //         "PRIMARY_KEY": "27",
    //         "listStatus": "02",
    //         "workId": "8380",
    //         "busiName": "01",
    //         "timestamp": "20171128112000",
    //         "orgNo": "34401",
    //         "appNo": "171129214587",
    //         "activNo": "1001000216080338",
    //         "appId": "",
    //         "proName": "01214",
    //         "proTitle": "改压",
    //         "activity": "停送电",
    //         "beginDate": "2017-11-28 11:16:02",
    //         "warningDate": "2017-11-28 11:14:02",
    //         "overdurDate": "2017-11-28 11:14:02",
    //         "consNo": "5131961086",
    //         "consId": "104188424",
    //         "consName": "信地置业（合肥）有限公司",
    //         "elecAddr": "临泉路与全椒路交汇处（基建）",
    //         "voltCode": "AC00061",
    //         "mrSectName": "",
    //         "mrSectNo": "",
    //         "planConsNo": "0",
    //         "userNo": "HF25",
    //         "getFlag": "",
    //         "tqglNo": "",
    //         "taskid": "",
    //         "nowAppNo": "0"
    //     }]
    // }
    try {
        if (txt != "selet_null") {
            txt = JSON.parse(txt);
            for (var i = 0; i < txt.data.length; i++) {
                var html = '';
                var status = "";
                var colo;
                switch (txt.data[i].listStatus) {
                    case '01':
                        status = "签收"
                        colo = "#555555"
                        break;
                    case '02':
                        status = "在办"
                        colo = "#f6ab00"
                        break;
                    case '03':
                        status = "完成"
                        colo = "#009c84"
                        break;
                    case '04':
                        status = "部分未上传"
                        break;
                    case '05':
                        status = "已处理"
                        break;
                    default:
                        break;
                }

                if (txt.data[i].elecAddr.length >= 10) {
                    txt.data[i].elecAddr = txt.data[i].elecAddr.substring(0, 10) + "...";
                }
                // if (txt.data[i].consName.length >= 10) {
                //     txt.data[i].consName = txt.data[i].consName.substring(0, 10) + "...";
                // }
                var time;
                if (txt.data[i].warningDate == null || txt.data[i].warningDate == "null") {
                    time = "";
                } else {
                    time = txt.data[i].warningDate;
                }
                var consId = '';
                if (txt.data[i].consId && txt.data[i].consId != "null") {
                    consId = 'data-consId=' + txt.data[i].consId;
                }

                if (staus == 'true') {
                    html =
                        "<li class='one'><div class='gongdan' data-ihd=" + i + consId + ">" +
                        "<div class='jibie left'>" +
                        "<span class='title-name'>" + txt.data[i].proTitle + "</span>" +
                        "</div><div class='content left' data-zhou=" + txt.data[i].consId + ">" +
                        "<p><span>申请编号</span><label class='appNo'>" + txt.data[i].appNo + "</label></p>" +
                        "<p><span class='names'>户名 </span><label class='consName'>" + txt.data[i].consName + "</label></p>" +
                        "<p><span>用电地址</span><label>" + txt.data[i].elecAddr + "</label></p>" +
                        "<p class='yjsj'><span>预警时间</span><label>" + time + "</label></p>" +
                        "<p class='yinchang activNo'>" + txt.data[i].activNo + "</p>" +
                        "<p class='yinchang orgNo'>" + txt.data[i].orgNo + "</p>" +
                        "<p class='yinchang activity'>" + txt.data[i].activity + "</p>" +
                        "<p class='yinchang busiName'>" + txt.data[i].busiName + "</p>" +
                        "<p class='yinchang proName'>" + txt.data[i].proName + "</p>" +
                        "<p class='yinchang proTitle'>" + txt.data[i].proTitle + "</p>" +
                        "<p class='yinchang workId'>" + txt.data[i].workId + "</p>" +
                        "<p class='yinchang appId'>" + txt.data[i].appId + "</p>" +
                        "<p class='yinchang premarykey'>" + txt.data[i].PRIMARY_KEY + "</p>" +
                        "</div></div><div class='button'>" +
                        '<div class="btn Sign" style="background-color: ' + colo + '">' +
                        status +
                        "</div></div>" +
                        "</li>"

                    $('.yiban').append(html);

                } else {

                    html =
                        "<li class='one'><div class='gongdan' data-ihd=" + i + consId + ">" +
                        "<div class='jibie left'>" +
                        "<span class='title-name'>" + txt.data[i].proTitle + "</span>" +
                        "</div><div class='content left' data-zhou=" + txt.data[i].consId + ">" +
                        "<p><span>申请编号</span><label class='appNo'>" + txt.data[i].appNo + "</label></p>" +
                        "<p><span class='names'>户名 </span><label>" + txt.data[i].consName + "</label></p>" +
                        "<p><span>用电地址</span><label>" + txt.data[i].elecAddr + "</label></p>" +
                        "<p class='yjsj'><span>预警时间</span><label>" + time + "</label></p>" +
                        "<p class='yinchang activNo'>" + txt.data[i].activNo + "</p>" +
                        "<p class='yinchang orgNo'>" + txt.data[i].orgNo + "</p>" +
                        "<p class='yinchang activity'>" + txt.data[i].activity + "</p>" +
                        "<p class='yinchang busiName'>" + txt.data[i].busiName + "</p>" +
                        "<p class='yinchang proName'>" + txt.data[i].proName + "</p>" +
                        "<p class='yinchang proTitle'>" + txt.data[i].proTitle + "</p>" +
                        "<p class='yinchang workId'>" + txt.data[i].workId + "</p>" +
                        "<p class='yinchang appId'>" + txt.data[i].appId + "</p>" +
                        "<p class='yinchang premarykey'>" + txt.data[i].PRIMARY_KEY + "</p>" +
                        "</div>" +
                        "</div>" +
                        "<div class='button'>" +
                        '<div class="btn Sign" style="background-color: ' + colo + '">' +
                        status +
                        "</div>" +
                        "</div><div class='anniu' data-flag=" + txt.data[i].getFlag + ">" +
                        "<span class='zhuangtai'>出发</span>" +
                        "<span class='zhuangtai'>到达</span>" +
                        "<span class='zhuangtai'>离开</span>" +
                        "</div>" +
                        "</li>"
                    $('.daiban').append(html);
                }
            }
        } else {
            window.android.show("---------查询为空--------");
        }
    } catch (e) {
        window.android.show("---------查询为空--------");
    }
};

BZYD.panDuan = function (title) {
    if (title == "减容" || title == "减容恢复") {
        $(".title-one").hide();
    } else if (title == "高压增容" || title == "低压非居民增容" || title == "改压") {
        $(".title-two").hide();
    } else if (title == "改类") {
        // 受电设备信息录入加入title-three类名
        $(".title-three").hide();
    } else if (title == "更名") {
        $(".title-four").hide();
    } else if (title == "过户") {
        $(".title-five").hide();
    } else if (title == "销户") {
        $(".title-six").hide();
    }
}

BZYD.sX = function (title) {
    if (title == "减容" || title == "减容恢复") {
        $(".title-three").hide();
        $(".title-four").hide();
    } else if (title == "高压增容" || title == "低压非居民增容" || title == "改压") {
        $(".title-four").hide();
    } else if (title == "改类") {
        // 受电设备信息录入加入title-three类名
        $(".title-five").hide();
    } else if (title == "更名") {
        $(".title-four").hide();
        $(".title-three").hide();
        $(".title-five").hide();
    } else if (title == "过户") {
        $(".title-five").hide();
        $(".title-three").hide();
    } else if (title == "销户") {
        $(".title-six").hide();
        $(".title-three").hide();
        $(".title-four").hide();
        $(".title-five").hide();
    }
};

//用电检查
BZYD.useDian = function (Num, arr, staus) {
    var txt = window.android.seletDataJS(Num, arr);
    try {
        if (txt != "selet_null") {
            txt = JSON.parse(txt);
            for (var i = 0; i < txt.data.length; i++) {
                var html = '';
                var status = "";
                var colo;
                switch (txt.data[i].listStatus) {
                    case '01':
                        status = "签收"
                        colo = "#555555"
                        break;
                    case '02':
                        status = "在办"
                        colo = "#f6ab00"
                        break;
                    case '03':
                        status = "完成"
                        colo = "#009c84"
                        break;
                    case '04':
                        status = "部分未上传"
                        break;
                    case '05':
                        status = "已处理"
                        break;
                    default:
                        break;
                }
                ;
                var dianya = window.android.selPopWin("30002", txt.data[i].voltCode);

                if (staus == 'true') {
                    html =
                        "<div class='add_child clearfix' >" +
                        "<div class='add_right clearfix'>" +
                        "<div class='add_r_l clearfix'>" +
                        "<p>任务编号:<span class='appNo'>" + txt.data[i].appNo + "</span></p>" +
                        "<p>任务来源:<span>" + txt.data[i].activity + "</span></p>" +
                        "<p>待检查用户:<span>" + txt.data[i].planConsNo + "</span></p>" +
                        "<p class='yinchang'><span class='activNo'>" + txt.data[i].activNo + "</span></p>" +
                        "<p class='yinchang'><span class='overdurDate'>" + txt.data[i].overdurDate + "</span></p>" +
                        "<p class='yinchang'><span class='primary'>" + txt.data[i].PRIMARY_KEY + "</span></p>" +
                        "<p class='yinchang'><span class='proTitle'>" + txt.data[i].proTitle + "</span></p>" +
                        "<p class='yinchang'><span class='proName'>" + txt.data[i].proName + "</span></p>" +
                        "<p class='yinchang'><span class='busiName'>" + txt.data[i].busiName + "</span></p>" +
                        "<p class='yinchang'><span class='listStatus'>" + txt.data[i].listStatus + "</span></p>" +
                        "<p class='yinchang'><span class='workId'>" + txt.data[i].workId + "</span></p>" +
                        "</div>" +
                        "</div>" +
                        '<div class="add_r_r" style="background-color: ' + colo + '">' + status + '</div>' +
                        "</div>"
                    $('.yiban').append(html);
                } else {
                    html =
                        "<div class='add_child clearfix' >" +
                        "<div class='add_right clearfix'>" +
                        "<div class='add_r_l clearfix'>" +
                        "<p>任务编号:<span class='appNo'>" + txt.data[i].appNo + "</span></p>" +
                        "<p>任务来源:<span>" + txt.data[i].activity + "</span></p>" +
                        "<p>待检查用户:<span>" + txt.data[i].planConsNo + "</span></p>" +
                        "<p class='yinchang'><span class='activNo'>" + txt.data[i].activNo + "</span></p>" +
                        "<p class='yinchang'><span class='overdurDate'>" + txt.data[i].overdurDate + "</span></p>" +
                        "<p class='yinchang'><span class='primary'>" + txt.data[i].PRIMARY_KEY + "</span></p>" +
                        "<p class='yinchang'><span class='proTitle'>" + txt.data[i].proTitle + "</span></p>" +
                        "<p class='yinchang'><span class='proName'>" + txt.data[i].proName + "</span></p>" +
                        "<p class='yinchang'><span class='busiName'>" + txt.data[i].busiName + "</span></p>" +
                        "<p class='yinchang'><span class='listStatus'>" + txt.data[i].listStatus + "</span></p>" +
                        "<p class='yinchang'><span class='workId'>" + txt.data[i].workId + "</span></p>" +
                        "</div>" +
                        "</div>" +
                        '<div class="add_r_r" style="background-color: ' + colo + '">' + status + '</div>' +
                        "<div class='zhuangtai' data-flag=" + txt.data[i].getFlag + ">" +
                        "<span class='getflags'>出发</span>" +
                        "<span class='getflags'>到达</span>" +
                        "<span class='getflags'>离开</span>" +
                        "</div>" +
                        "</div>";
                    $('.daiban').append(html);
                }
            }
        }
    } catch (e) {
        window.android.show("---------查询为空--------");
    }

}

//违约用电
BZYD.weiyueyongdian = function (Num, arr, staus) {
    var txt = window.android.seletDataJS(Num, arr);
    try {
        if (txt != "selet_null") {
            txt = JSON.parse(txt);
            for (var i = 0; i < txt.data.length; i++) {
                var html = '';
                var status = "";
                var colo;
                switch (txt.data[i].listStatus) {
                    case '01':
                        status = "签收"
                        colo = "#555555"
                        break;
                    case '02':
                        status = "在办"
                        colo = "#f6ab00"
                        break;
                    case '03':
                        status = "完成"
                        colo = "#009c84"
                        break;
                    case '04':
                        status = "部分未上传"
                        break;
                    case '05':
                        status = "已处理"
                        break;
                    default:
                        break;
                }
                ;

                if (staus == 'true') {
                    html =
                        "<li class='one'>" +
                        "<div class='content left'>" +
                        "<p><span>任务编号：</span><label class='appNo'>" + txt.data[i].appNo + "</label></p>" +
                        "<p><span>用户名称：</span><label class='consName'>" + txt.data[i].consName + "</label></p>" +
                        "<p><span>用户编号：</span><label class='consNo'>" + txt.data[i].consNo + "</label></p>" +
                        "<span class='activNo yinchang'>" + txt.data[i].activNo + "</span>" +
                        "<span class='primary yinchang'>" + txt.data[i].PRIMARY_KEY + "</span>" +
                        "<span class='proTitle yinchang '>" + txt.data[i].proTitle + "</span>" +
                        "<span class='proName yinchang'>" + txt.data[i].proName + "</span>" +
                        "<span class='busiName yinchang'>" + txt.data[i].busiName + "</span>" +
                        "<span class='listStatus yinchang'>" + txt.data[i].listStatus + "</span>" +
                        "<span class='workId yinchang'>" + txt.data[i].workId + "</span>" +
                        "</div>" +
                        '<div class="btn mui-btn mui-btn-primary Sign" style="background-color: ' + colo + '">' + status + '</div>' +
                        "</li>";

                    $('.yiban').append(html);
                } else {
                    html =
                        "<li class='one'>" +
                        "<div class='content left'>" +
                        "<p><span>任务编号：</span><label class='appNo'>" + txt.data[i].appNo + "</label></p>" +
                        "<p><span>用户名称：</span><label class='consName'>" + txt.data[i].consName + "</label></p>" +
                        "<p><span>用户编号：</span><label class='consNo'>" + txt.data[i].consNo + "</label></p>" +
                        "<span class='activNo yinchang'>" + txt.data[i].activNo + "</span>" +
                        "<span class='primary yinchang'>" + txt.data[i].PRIMARY_KEY + "</span>" +
                        "<span class='proTitle yinchang '>" + txt.data[i].proTitle + "</span>" +
                        "<span class='proName yinchang'>" + txt.data[i].proName + "</span>" +
                        "<span class='busiName yinchang'>" + txt.data[i].busiName + "</span>" +
                        "<span class='listStatus yinchang'>" + txt.data[i].listStatus + "</span>" +
                        "<span class='workId yinchang'>" + txt.data[i].workId + "</span>" +
                        "</div>" +
                        '<div class="btn mui-btn mui-btn-primary Sign" style="background-color: ' + colo + '">' + status + '</div>' +
                        "<div class='zhuangtai' data-flag=" + txt.data[i].getFlag + ">" +
                        "<span class='getflags'>出发</span>" +
                        "<span class='getflags'>到达</span>" +
                        "<span class='getflags'>离开</span>" +
                        "</div>" +
                        "</li>";

                    $('.daiban').append(html);
                }

            }

        } else {
            window.android.show("try---------查询为空--------");
        }

    } catch (e) {
        window.android.show("catch---------查询为空--------");
    }
}

BZYD.Download = function (data) {
    var index = 0;
    data = JSON.stringify(data);
    window.android.httpServer("ydzyWork", data);
    // 返回的值
    BZYD.returnHttpServerData = function (txt) {
        if (txt.indexOf('workList') != -1) {
            txt = JSON.parse(txt);
            for (var i = 0; i < txt.workList.length; i++) {
                txt.workList[i].listStatus = "01";
                var arrName = [];
                var value = [];
                for (var key in txt.workList[i]) {
                    arrName.push(key);
                    value.push(txt.workList[i][key]);
                }
                if (txt.workList.activNo != "null" && txt.workList.appNo != "null" && txt.workList.activNo != "" && txt.workList.appNo != "") {
                    // 判断值是否在要求的范围内
                    var fox;
                    switch (txt.workList[i].activity) {
                        case "业务受理":
                            fox = true
                            break;
                        case "现场勘查":
                            fox = true
                            break;
                        case "中间检查":
                            fox = true
                            break;
                        case "竣工验收":
                            fox = true
                            break;
                        case "装拆表":
                            fox = true
                            break;
                        case "停送电":
                            fox = true
                            break;
                        case "现场抄表":
                            fox = true
                            break;
                        case "现场催费":
                            fox = true
                            break;
                        case "停电通知":
                            fox = true
                            break;
                        case "现场停电":
                            fox = true
                            break;
                        case "现场复电":
                            fox = true
                            break;
                        case "应急复电":
                            fox = true
                            break;
                        case "周期检查":
                            fox = true
                            break;
                        case "专项检查":
                            fox = true
                            break;
                        case "违约用电":
                            fox = true
                            break;
                        case "勘查装表送电":
                            fox = true
                            break;
                        default:
                            fox = false
                            break;
                    }
                    ;
                    if (fox == true) {
                        var arr1 = [];
                        arr1.push(txt.workList[i].appNo);
                        arr1.push(txt.workList[i].activNo);
                        // 查询这条数据表里面有没有
                        var result = window.android.seletDataJS('30560', arr1);
                        if (result == "selet_null") {
                            window.android.inseltDataJS("30562", arrName, value);
                            index++;
                        }
                    }
                }
            }
        }
        $(".tanchu").hide();
        mui.init();
        mui.toast("新增了" + index + "条数据");
        var timer = setTimeout(function () {
            location.reload();
        }, 1000)
    }
};

// 发送的数据获取
BZYD.data = function (code, datas) {
    if (code != null && datas != null) {
        var data = {
            "data": datas,
            "orgNo": window.sessionStorage.getItem("orgNo"),
            "phoneImei": window.sessionStorage.getItem("phoneImei"),
            "serviceCode": code,
            "source": source,
            "target": "",
            "userNo": window.sessionStorage.getItem("userNo")
        }
        return data;
    }
};

// 发送的数据获取2
BZYD.data2 = function (code, datas) {
    if (code != null && datas != null) {
        var data = {
            "data": datas,
            "orgNo": window.sessionStorage.getItem("orgNo") ? window.sessionStorage.getItem("orgNo") : "",
            "phoneImei": window.sessionStorage.getItem("phoneImei") ? window.sessionStorage.getItem("phoneImei") : "",
            "serviceCode": code,
            "source": source,
            "target": "",
            "userNo": window.sessionStorage.getItem("userNo") ? window.sessionStorage.getItem("userNo") : ""
        }
        return data;
    }
};

//抄表
BZYD.chaoBiao = function (Num, arr, staus) {
    var txt = window.android.seletDataJS(Num, arr);
    txt = JSON.parse(txt);
    var html = '';
    for (var i = 0; i < txt.data.length; i++) {
        var status = "";
        switch (txt.data[i].listStatus) {
            case '01':
                status = "签收"
                break;
            case '02':
                status = "在办"
                break;
            case '03':
                status = "完成"
                break;
            case '04':
                status = "部分未上传"
                break;
            case '05':
                status = "已处理"
                break;
            default:
                break;
        }
        ;
        html +=
            '<li class="one">' +
            '<div class="content left">' +
            '<div><span>任务编号：</span><div class="content_right"><input type="text" value=' + txt.data[i].appNo + '></div></div>' +
            '<div><span>抄表段编号：</span><div class="content_right"><input type="text" value=' + txt.data[i].mrSectNo + '></div></div>' +
            '<div><span>待抄表户数：</span><div class="content_right"><input type="text" value=' + txt.data[i].planConsNo + '></div></div>' +
            '<div><span>抄表段名称：</span><div class="content_right"><input type="text" value=' + txt.data[i].mrSectName + '></div></div>' +
            '<div><span>供电单位：</span><div class="content_right"><input type="text" value=' + txt.data[i].orgNo + '></div></div>' +
            '<div><span>抄表员：</span><div class="content_right"><input type="text" value=' + txt.data[i].consName + '></div></div>' +
            '</div>' +
            '<div class="btn mui-btn mui-btn-primary">' + status + '</div>' +
            '</li>'
    }
    if (staus == 'true') {
        $('.yiban').append(html);
    } else {
        $('.daiban').append(html);
    }
}

//接口调用(只有ID)
BZYD.port = function (portId, portTransfer) {
    var commonData1 = {
        "data": {
            "consId": portId
        },
        "target": "",
        "serviceCode": portTransfer,
        "source": source,
        "userNo": window.sessionStorage.getItem("userNo"),
        "orgNo": window.sessionStorage.getItem("orgNo"),
        "phoneImei": window.sessionStorage.getItem("phoneImei")
    };
    window.android.httpServer(portTransfer, JSON.stringify(commonData1));
};

BZYD.portConsNo = function (portConsNo, portTransfer) {
    var commonData2 = {
        "data": {
            "consNo": portConsNo
        },
        "target": "",
        "serviceCode": portTransfer,
        "source": source,
        "userNo": window.sessionStorage.getItem("userNo"),
        "orgNo": window.sessionStorage.getItem("orgNo"),
        "phoneImei": window.sessionStorage.getItem("phoneImei")
    };
    window.android.httpServer(portTransfer, JSON.stringify(commonData2));
};

BZYD.ports = function (datas, portTransfer) {
    var commonData3 = {
        "data": datas,
        "target": "",
        "serviceCode": portTransfer,
        "source": source,
        "userNo": window.sessionStorage.getItem("userNo"),
        "orgNo": window.sessionStorage.getItem("orgNo"),
        "phoneImei": window.sessionStorage.getItem("phoneImei")
    };
    window.android.httpServer(portTransfer, JSON.stringify(commonData3));
};

//陈涛
BZYD.spanxiala = function (classs, pecode, defdata) {
    var arr = [pecode, defdata];
    var Name = [];
    var val = [];
    // 安卓的方法
    var str = window.android.selPopWin("30002", arr);
    window.android.show(str);
    if (str.indexOf("data") == -1) {
        $(classs).attr("datavalue", "").text(defdata);
    } else {
        str = JSON.parse(str);
        var data = str.data;
        for (var i = 0; i < data.length; i++) {
            Name = data[i].NAME;
            val = data[i].VALUE;
            if (val == defdata) {
                $(classs).attr("datavalue", defdata).text(Name);
            } else {
                continue;
            }
        }
    }
}
//图片的保存于传入acitveNo文件
BZYD.tupianbaocun = function () {
    //	var appNo = window.sessionStorage.getItem("appNo");
    //	var activNo = window.sessionStorage.getItem("activNo");
    //	window.android.show("1111111111111" + appNo);
    //	var elecTypeCode = window.sessionStorage.getItem("activity");
    //	var appTypeCode = window.sessionStorage.getItem("proTitle");
    //查询数据库
    //	var historyData = window.android.seletDataJS('30560',[appNo, activNo]);
    //转换数据
    //	historyData1 = JSON.parse(historyData).data;

    //	var ydzyAcceptData = window.android.seletDataJS('30010',[appNo, activNo]);
    //	var ydzyAcceptData1 = JSON.parse(ydzyAcceptData).data;
    //				获取内容
    //	var tradeCode = ydzyAcceptData1.tradeCode;
    //	var orgNo = historyData1[0].orgNo;
    //	var consNo = historyData1[0].consNo;
    //	var consName = historyData1[0].consName;
    //	var elecAddr = historyData1[0].elecAddr;
    //	var voltCode = historyData1[0].voltCode;
    var data = new Date();
    var timer = data.getTime();
    var json1 = {
        "appNo": "",
        "activNo": "",
        "orgNo": "",
        "consNo": "",
        "consName": "",
        "elecAddr": "",
        "tradeCode": "",
        "voltCode": "",
        "elecTypeCode": "",
        "appTypeCode": "",
        "activName": "",
        "appFilePath": "/appNo/activeNo",
        "fileType": "",
        "isIdCard": "0",
        "fileName": "photo" + timer
    };
    json = JSON.stringify(json1);
}

//图片/视频、录音的保存
BZYD.baocunids = function (appNo, activNo, proTitle, yongdianleibie, hangyefeilei, chenTao, voltCode) {
    window.android.show("appNo----" + appNo);
    window.android.show("activNo----" + activNo);
    window.android.show("proTitle----" + proTitle);
    var historyData = window.android.seletDataJS('30560', [appNo, activNo]);
    if (yongdianleibie == false || yongdianleibie == "null" || yongdianleibie == "") {
        yongdianleibie = "";
    }
    if (chenTao == false || chenTao == "null" || chenTao == "") {
        chenTao = "";
    }
    if (hangyefeilei == false || hangyefeilei == "null" || hangyefeilei == "") {
        hangyefeilei = "";
    }
    if (historyData != "select_null" || historyData != "null") {
        window.android.show("111111111111" + historyData);
        //转换数据
        historyData1 = JSON.parse(historyData).data;
        //	获取内容
        var orgNo = historyData1[0].orgNo;
        var consNo = historyData1[0].consNo;
        var consName = historyData1[0].consName;
        var elecAddr = historyData1[0].elecAddr;
        var data = new Date();
        var timer = data.getTime();
        window.android.show("timer" + timer);
        window.sessionStorage.setItem("timer", timer);
        //	window.android.show("------------------------" + contentId);
        var json01 = {
            "appNo": appNo,
            "activNo": activNo,
            "orgNo": orgNo,
            "consNo": consNo,
            "consName": consName,
            "elecAddr": elecAddr,
            "tradeCode": hangyefeilei,
            "voltCode": voltCode,
            "elecTypeCode": yongdianleibie,
            "appTypeCode": proTitle,
            "activName": chenTao,
            "appFilePath": "/" + appNo + "/" + activNo,
            "fileType": "01",
            "isIdCard": "0",
            "fileName": "photo" + timer
        };
        //判断是否保存成功时传的名称
        photofileName = "photo" + timer + ".jpg";
        //插库时传的名称
        photofileName2 = json01.fileName;
        var json02 = {
            "appNo": appNo,
            "activNo": activNo,
            "orgNo": orgNo,
            "consNo": consNo,
            "consName": consName,
            "elecAddr": elecAddr,
            "tradeCode": hangyefeilei,
            "voltCode": voltCode,
            "elecTypeCode": yongdianleibie,
            "appTypeCode": proTitle,
            "activName": chenTao,
            "appFilePath": "/" + appNo + "/" + activNo,
            "fileType": "03",
            "isIdCard": "0",
            "fileName": "video" + timer
        };
        //判断是否保存成功时传的名称
        videofileName = "video" + timer + ".mp4";
        //插库时传的名称
        videofileName2 = json02.fileName;
        var json03 = {
            "appNo": appNo,
            "activNo": activNo,
            "orgNo": orgNo,
            "consNo": consNo,
            "consName": consName,
            "elecAddr": elecAddr,
            "tradeCode": hangyefeilei,
            "voltCode": voltCode,
            "elecTypeCode": yongdianleibie,
            "appTypeCode": proTitle,
            "activName": chenTao,
            "appFilePath": "/" + appNo + "/" + activNo,
            "fileType": "02",
            "isIdCard": "0",
            "fileName": "sound" + timer
        };
        //判断是否保存成功时传的名称
        soundfileName = "sound" + timer + ".amr";
        //插库时传的名称
        soundfileName2 = json03.fileName;
        json1 = JSON.stringify(json01);
        json2 = JSON.stringify(json02);
        json3 = JSON.stringify(json03);
        //查看附件时的路径
        appFilePath = appNo + "/" + activNo + "/";
        //上传库时的路径
        appFilePath2 = "/" + appNo + "/" + activNo;
    } else {
        mui.alert("", "运行错误");
    }

}
//没有其他参数只有主要的参数的图片保存
BZYD.photo = function (appNo, activNo, proTitle) {
    window.android.show("appNo----" + appNo);
    window.android.show("activNo----" + activNo);
    //	    window.android.show("proTitle----" + proTitle);
    var historyData = window.android.seletDataJS('30560', [appNo, activNo]);
    if (historyData != "select_null" || historyData != "null") {
        window.android.show("111111111111" + historyData);
        //转换数据
        historyData1 = JSON.parse(historyData).data;
        //	获取内容
        var orgNo = historyData1[0].orgNo;
        var consNo = historyData1[0].consNo;
        var consName = historyData1[0].consName;
        var elecAddr = historyData1[0].elecAddr;
        var voltCode = historyData1[0].voltCode;
        var data = new Date();
        var timer = data.getTime();
        //	window.android.show("------------------------" + contentId);
        var json01 = {
            "appNo": appNo,
            "activNo": activNo,
            "orgNo": orgNo,
            "consNo": consNo,
            "consName": consName,
            "elecAddr": elecAddr,
            "tradeCode": "",
            "voltCode": "",
            "elecTypeCode": "",
            "appTypeCode": "",
            "activName": "",
            "appFilePath": "/" + appNo + "/" + activNo + "/" + 'chentao',
            "fileType": "01",
            "isIdCard": "0",
            "fileName": "photo" + timer
        };
        //判断是否保存成功时传的名称
        photofileName = "photo" + timer + ".jpg";
        //插库时传的名称
        photofileName2 = json01.fileName;
        var json02 = {
            "appNo": appNo,
            "activNo": activNo,
            "orgNo": orgNo,
            "consNo": consNo,
            "consName": consName,
            "elecAddr": elecAddr,
            "tradeCode": "",
            "voltCode": "",
            "elecTypeCode": "",
            "appTypeCode": "",
            "activName": "",
            "appFilePath": "/" + appNo + "/" + activNo + 'chentao',
            "fileType": "03",
            "isIdCard": "0",
            "fileName": "video" + timer
        };
        //判断是否保存成功时传的名称
        videofileName = "video" + timer + ".mp4";
        //插库时传的名称
        videofileName2 = json02.fileName;
        var json03 = {
            "appNo": appNo,
            "activNo": activNo,
            "orgNo": orgNo,
            "consNo": consNo,
            "consName": consName,
            "elecAddr": elecAddr,
            "tradeCode": "",
            "voltCode": "",
            "elecTypeCode": "",
            "appTypeCode": "",
            "activName": "",
            "appFilePath": "/" + appNo + "/" + activNo + 'chentao',
            "fileType": "02",
            "isIdCard": "0",
            "fileName": "sound" + timer
        };
        //判断是否保存成功时传的名称
        soundfileName = "sound" + timer + ".amr";
        //插库时传的名称
        soundfileName2 = json03.fileName;
        json1 = JSON.stringify(json01);
        json2 = JSON.stringify(json02);
        json3 = JSON.stringify(json03);
        //查看附件时的路径
        appFilePath = appNo + "/" + activNo + "/" + 'chentao';
        //上传库时的路径
        appFilePath2 = "/" + appNo + "/" + activNo + 'chentao';
    } else {
        mui.alert("", "运行错误");
    }

}

BZYD.returnPath = function (value) {
    var appNos = window.sessionStorage.getItem("appNo") ? window.sessionStorage.getItem("appNo") : "";
    var activNos = window.sessionStorage.getItem("activNo") ? window.sessionStorage.getItem("activNo") : "";
    var activeName = window.sessionStorage.getItem("chenTao") ? window.sessionStorage.getItem("chenTao") : "";
    window.android.show("value============>" + value);
    //获取路径判断是否保存到路径内
//			var data = new Date();
//			var timer = data.getTime();
//
    var Photo = window.android.ImagePath();
    var Photos = Photo + "/" + appNo + "/" + activNo + "/" + photofileName;
    var Video = window.android.videoPath();
    var Videos = Video + "/" + appNo + "/" + activNo + "/" + videofileName;
    var Sound = window.android.soundPath();
    var Sounds = Sound + "/" + appNo + "/" + activNo + "/" + soundfileName;
    window.android.show("Photo============>" + Photos);
    window.android.show("Video============>" + Videos);
    window.android.show("Sound============>" + Sounds);
    //获取经纬度
    var getPosition = window.android.getPosition();
    var getPositions = JSON.parse(getPosition);
    window.android.show("getPositions============>" + getPositions);
    window.android.show("k============>" + getPositions.longitude);
    window.android.show("k============>" + getPositions.latitude);
    var jingdu = getPositions.longitude;
    var weidu = getPositions.latitude;
    //判断是什么类型的附件
    if (value == 1) {
        var aa = window.android.fileExists(Photos);
        window.android.show("aa=============>" + aa);
        if (aa == true) {
//					var accessory1 = ["appNo","activNo","fileType","filePath","fileName","posX","posY","posZ"];
//					var accessoryValue1 = [appNo,activNo,"01",appFilePath2,photofileName2,jingdu,weidu,"0"];
            var accessory1 = ["userNo", "appNo", "activNo", "id", "consNo", "photoForm", "consName", "consSortCode", "busiClass", "appTypeCode", "activeName", "pOrgNo", "orgNo", "uploadDay", "photoId", "photoName", "appPhotoPath", "gpsLongitude", "gpsLatitude", "posZ", "photoStr", "zt", "carrType", "photoStatus", "photoTypeCode", "status"];
            window.sessionStorage.setItem("accessory1", accessory1);
            window.android.show("accessory1 key" + accessory1);
            var userNo = window.sessionStorage.getItem("userNo"); //工号
            var id = appNo + "_" + activNo; //相关业务标识
            var consNo = window.sessionStorage.getItem("consNo") ? window.sessionStorage.getItem("consNo") : ""; //用户编号
            var consName = window.sessionStorage.getItem("consName") ? window.sessionStorage.getItem("consName") : ""; //用户名
            var consSortCode = window.sessionStorage.getItem("consSortCode") ? window.sessionStorage.getItem("consSortCode") : ""; //用户类别编码
            var busiClass = ""; //业务类编号
            window.android.show("title" + window.sessionStorage.getItem("title"));
            var appTypeCode = appTypeCode1(window.sessionStorage.getItem("title")); //业务类型
            var activeName = chenTao ? chenTao : ""; //环节名称
            var pOrgNo = window.sessionStorage.getItem("pOrgNo") ? window.sessionStorage.getItem("pOrgNo") : ""; //省单位编号
            var orgNo = window.sessionStorage.getItem("orgNo"); //单位编号
            var uploadDay = ToData(); //上传日期
            var photoId = ""; //附件标识
            var photoName = photofileName; //照片名称
            window.android.show("photoName" + photoName);
            window.android.show("id" + id);
            var appPhotoPath = Photos; //图片终端路径  webViewPicPath
            window.android.show("appPhotoPath" + appPhotoPath);
            var dingwei = window.android.getPosition() ? window.android.getPosition() : "";
            var dingwei = JSON.parse(dingwei) ? JSON.parse(dingwei) : "";
            var gpsLongitude = dingwei.longitude ? dingwei.longitude : ""; //GPS经度
            var gpsLatitude = dingwei.latitude ? dingwei.latitude : ""; //GPS纬度
            var posZ = ""; //高度
//						var photoStr = window.android.FileToStringTab(id); //文件字符串  FileToStringTab
            var photoStr = "";//文件字符串
            window.android.show("photoStr" + photoStr);
            var zt = "02"; //状态
            var carrType = "02"; //载体类型
            var photoStatus = "01"; //附件类型
            var photoTypeCode = "01"; //附件类型
            var accessoryValue1 = [userNo, appNos, activNos, id, consNo, "20", consName, consSortCode, busiClass, appTypeCode, activeName, pOrgNo, orgNo, uploadDay, photoId, photoName, appPhotoPath, gpsLongitude, gpsLatitude, posZ, photoStr, zt, carrType, photoStatus, photoTypeCode, "02"];
            var A = window.android.inseltDataJS("30725", accessory1, accessoryValue1);
            window.android.show("A============>" + A);
            if (A == "true") {
                mui.alert("保存成功。");
            } else {
                mui.alert("保存失败。");
            }
        } else {
            mui.alert("图片未保存成功");
        }
    } else if (value == 2) {
        var bb = window.android.fileExists(Sounds);
        window.android.show("bb=============>" + bb);
        if (bb == true) {
//					var accessory2 = ["appNo","activNo","fileType","filePath","fileName","posX","posY","posZ"];
//					var accessoryValue2 = [appNo,activNo,"02",appFilePath2,soundfileName2,jingdu,weidu,"0"];
            var accessory1 = ["userNo", "appNo", "activNo", "id", "consNo", "photoForm", "consName", "consSortCode", "busiClass", "appTypeCode", "activeName", "pOrgNo", "orgNo", "uploadDay", "photoId", "photoName", "appPhotoPath", "gpsLongitude", "gpsLatitude", "posZ", "photoStr", "zt", "carrType", "photoStatus", "photoTypeCode", "status"];
            window.sessionStorage.setItem("accessory1", accessory1);
            window.android.show("accessory1 key" + accessory1);
            var userNo = window.sessionStorage.getItem("userNo"); //工号
            var id = appNo + "_" + activNo; //相关业务标识
            var consNo = window.sessionStorage.getItem("consNo") ? window.sessionStorage.getItem("consNo") : ""; //用户编号
            var consName = window.sessionStorage.getItem("consName") ? window.sessionStorage.getItem("consName") : ""; //用户名
            var consSortCode = window.sessionStorage.getItem("consSortCode") ? window.sessionStorage.getItem("consSortCode") : ""; //用户类别编码
            var busiClass = ""; //业务类编号
            window.android.show("title" + window.sessionStorage.getItem("title"));
            var appTypeCode = appTypeCode1(window.sessionStorage.getItem("title")); //业务类型
            var activeName = chenTao ? chenTao : ""; //环节名称
            var pOrgNo = window.sessionStorage.getItem("pOrgNo") ? window.sessionStorage.getItem("pOrgNo") : ""; //省单位编号
            var orgNo = window.sessionStorage.getItem("orgNo"); //单位编号
            var uploadDay = ToData(); //上传日期
            var photoId = ""; //附件标识
            var photoName = soundfileName;//照片名称
            window.android.show("photoName" + photoName);
            window.android.show("id" + id);
            var appPhotoPath = Sounds; //图片终端路径  webViewPicPath
            window.android.show("appPhotoPath" + appPhotoPath);
            var dingwei = window.android.getPosition() ? window.android.getPosition() : "";
            var dingwei = JSON.parse(dingwei) ? JSON.parse(dingwei) : "";
            var gpsLongitude = dingwei.longitude ? dingwei.longitude : ""; //GPS经度
            var gpsLatitude = dingwei.latitude ? dingwei.latitude : ""; //GPS纬度
            var posZ = ""; //高度
//						var photoStr = window.android.FileToStringTab(id); //文件字符串  FileToStringTab
            var photoStr = "";//文件字符串
            window.android.show("photoStr" + photoStr);
            var zt = "02"; //状态
            var carrType = "02"; //载体类型
            var photoStatus = "01"; //附件类型
            var photoTypeCode = "01"; //附件类型
            var accessoryValue1 = [userNo, appNos, activNos, id, consNo, "20", consName, consSortCode, busiClass, appTypeCode, activeName, pOrgNo, orgNo, uploadDay, photoId, photoName, appPhotoPath, gpsLongitude, gpsLatitude, posZ, photoStr, zt, carrType, photoStatus, photoTypeCode, "02"];
            var B = window.android.inseltDataJS("30725", accessory2, accessoryValue2);
            window.android.show("B============>" + B);
            if (B == "true") {
                mui.alert("保存成功。");
            } else {
                mui.alert("保存失败。");
            }
        } else {
            mui.alert("视频未保存成功");
        }
    } else if (value == 3) {
        var cc = window.android.fileExists(Videos);
        window.android.show("cc=============>" + cc);
        if (cc == true) {
//					var accessory3 = ["appNo","activNo","fileType","filePath","fileName","posX","posY","posZ"];
//					var accessoryValue3 = [appNo,activNo,"03",appFilePath2,videofileName2,jingdu,weidu,"0"];
            var accessory1 = ["userNo", "appNo", "activNo", "id", "consNo", "photoForm", "consName", "consSortCode", "busiClass", "appTypeCode", "activeName", "pOrgNo", "orgNo", "uploadDay", "photoId", "photoName", "appPhotoPath", "gpsLongitude", "gpsLatitude", "posZ", "photoStr", "zt", "carrType", "photoStatus", "photoTypeCode", "status"];
            window.sessionStorage.setItem("accessory1", accessory1);
            window.android.show("accessory1 key" + accessory1);
            var userNo = window.sessionStorage.getItem("userNo"); //工号
            var id = appNo + "_" + activNo; //相关业务标识
            var consNo = window.sessionStorage.getItem("consNo") ? window.sessionStorage.getItem("consNo") : ""; //用户编号
            var consName = window.sessionStorage.getItem("consName") ? window.sessionStorage.getItem("consName") : ""; //用户名
            var consSortCode = window.sessionStorage.getItem("consSortCode") ? window.sessionStorage.getItem("consSortCode") : ""; //用户类别编码
            var busiClass = ""; //业务类编号
            window.android.show("title" + window.sessionStorage.getItem("title"));
            var appTypeCode = appTypeCode1(window.sessionStorage.getItem("title")); //业务类型
            var activeName = chenTao ? chenTao : ""; //环节名称
            var pOrgNo = window.sessionStorage.getItem("pOrgNo") ? window.sessionStorage.getItem("pOrgNo") : ""; //省单位编号
            var orgNo = window.sessionStorage.getItem("orgNo"); //单位编号
            var uploadDay = ToData(); //上传日期
            var photoId = ""; //附件标识
            var photoName = videofileName; //照片名称
            window.android.show("photoName" + photoName);
            window.android.show("id" + id);
            var appPhotoPath = Videos; //图片终端路径  webViewPicPath
            window.android.show("appPhotoPath" + appPhotoPath);
            var dingwei = window.android.getPosition() ? window.android.getPosition() : "";
            var dingwei = JSON.parse(dingwei) ? JSON.parse(dingwei) : "";
            var gpsLongitude = dingwei.longitude ? dingwei.longitude : ""; //GPS经度
            var gpsLatitude = dingwei.latitude ? dingwei.latitude : ""; //GPS纬度
            var posZ = ""; //高度
//						var photoStr = window.android.FileToStringTab(id); //文件字符串  FileToStringTab
            var photoStr = "";//文件字符串
            window.android.show("photoStr" + photoStr);
            var zt = "02"; //状态
            var carrType = "02"; //载体类型
            var photoStatus = "01"; //附件类型
            var photoTypeCode = "01"; //附件类型
            var accessoryValue1 = [userNo, appNos, activNos, id, consNo, "20", consName, consSortCode, busiClass, appTypeCode, activeName, pOrgNo, orgNo, uploadDay, photoId, photoName, appPhotoPath, gpsLongitude, gpsLatitude, posZ, photoStr, zt, carrType, photoStatus, photoTypeCode, "02"];
            var C = window.android.inseltDataJS("30725", accessory3, accessoryValue3);
            window.android.show("C============>" + C);
            if (C == "true") {
                mui.alert("保存成功。");
            } else {
                mui.alert("保存失败。");
            }
        } else {
            mui.alert("录音未保存成功");
        }
    }
}

function jsonToName(codeType, value) {
    var jtnson = window.android.selPopWin("30002", [codeType, value]);
    if (jtnson.indexOf('data') != -1) {
        jtnson = JSON.parse(jtnson);
        return jtnson.data[0].NAME;
    } else {
        return "";
    }
}

function jsonToNo(codeNo) {
    var jtson = window.android.selPopWin("300091", [codeNo]);
    if (jtson.indexOf('data') != -1) {
        jtson = JSON.parse(jtson);
        return jtson.data[0].ORG_NAME;
    } else {
        return "";
    }
}

function jsonToHD(codeNoHD) {
    var jthdson = window.android.selPopWin("30003", [codeNoHD]);
    if (jthdson.indexOf('data') != -1) {
        jthdson = JSON.parse(jthdson);
        return jthdson.data[0].NAME;
    } else {
        return "";
    }
}
//将-地理位置-信息数据发送到服务器 上官凯静
function getDataAndSend(appNo, activity, proMode, proTitle, proName, staffStatus) {
    window.android.show("getDataAndSend()--------------------------------------");
    var dd = window.android.getLocation();
    window.android.show("经纬度---" + dd); //经纬度---{"longitude":"116.309414","latitude":"40.091871"}
    dd = JSON.parse(dd);

    var taData = {
        "data": {
            "longitude": dd.longitude, //经度
            "latitude": dd.latitude, //纬度
            "position": "", //位置
            "status": "02", //工单状态(01签收、02在办、03完成、04部分未上传、05已处理工单)
            "staffStatus": staffStatus, //到达现场01，现场作业02，离开现场03，路途中04，其他05。
            "appNo": appNo, //申请编号
            "activity": activity, //环节名称
            "proMode": proMode, //业务分类
            "proTitle": proTitle, //流程名称
            "proName": proName, //业务类型 业务名称（其实是环节编号）
            "userName": window.sessionStorage.getItem("userName"), //处理人员姓名
            "tqglNo": window.sessionStorage.getItem("sysUserName"), //台区经理编号
        },
        "phoneImei": window.sessionStorage.getItem("phoneImei"),
        "serviceCode": "ydzySetXYData",
        "source": source,
        "target": "",
        "userNo": window.sessionStorage.getItem("userNo"),
        "orgNo": window.sessionStorage.getItem("orgNo"),
        "appNo": appNo
    };
    var data = JSON.stringify(taData);
    window.android.httpServer("ydzySetXYData", data);

    //数据返回
    BZYD.returnHttpServerData = function (taBackData) {
        var taBackString = JSON.parse(taBackData);
        var taReturnCode = taBackString.returnCode;
        var taReturnMSG = taBackString.returnMSG;
        window.android.show('taReturnMSG==>' + taReturnMSG);
        if (taReturnCode == '1000') {
            window.android.show("地理位置信息发送成功-------");
            //return false;
        }
    }
}

/*出发、到达、离开点击事件封装    上官凯静   2017-9-1 13:19*/
function sendPositionStatus(appNo, activity, activNo, busiName, proTitle, proName, premarykey, getFlag) {
    var content = [];
    content.push(appNo);
    content.push(activNo);
    window.android.show("content" + content);
    var res = window.android.seletKeyData("305614", ["1", window.sessionStorage.getItem("sysUserName")]); //查询本地库AydzyWorkNotices当前进行中的工单
    var flag = false; //开关 为true则进行人员状态改变，否则不进行任何操作
    if (res != 'selet_null') { //之前有工单在进行中
        window.android.show("res-305614-->" + res);
        res = JSON.parse(res);
        res = res.data;
        res = res[0];
        if (res.appNo == appNo && res.activNo == activNo) { //是当前工单时
            flag = true;
        } else {
            var btnArray = ['取消', '确定'];
            mui.confirm('是否终止【' + res.activity + '】环节的申请编号【' + res.appNo + '】工单任务，确认？', '提示', btnArray, function (e) {
                if (e.index == 1) {
                    window.android.show("que确定-->");
                    //--------------------之前的工单离开
                    var dd = window.android.getLocation();
                    window.android.show("经纬度---" + dd); //经纬度---{"longitude":"116.309414","latitude":"40.091871"}
                    dd = JSON.parse(dd);
                    var longitude = dd.longitude;
                    var latitude = dd.latitude;
                    if (longitude == "" || longitude == undefined || longitude == null) {
                        longitude = "0.0";
                    }
                    if (latitude == "" || latitude == undefined || latitude == null) {
                        latitude = "0.0";
                    }
                    var taData = {
                        "data": {
                            "longitude": longitude, //经度
                            "latitude": latitude, //纬度
                            "position": "", //位置
                            "status": "02", //工单状态(01签收、02在办、03完成、04部分未上传、05已处理工单)
                            "staffStatus": "03", //到达现场01，现场作业02，离开现场03，路途中04，其他05。
                            "appNo": res.appNo, //申请编号
                            "activity": res.activity, //环节名称
                            "proMode": res.busiName, //业务分类
                            "proTitle": res.proTitle, //流程名称
                            "proName": res.proName, //业务类型 业务名称（其实是环节编号）
                            "userName": window.sessionStorage.getItem("userName"), //处理人员姓名
                            "tqglNo": window.sessionStorage.getItem("sysUserName"), //台区经理编号
                        },
                        "phoneImei": window.sessionStorage.getItem("phoneImei"),
                        "serviceCode": "ydzySetXYData",
                        "source": source,
                        "target": "",
                        "userNo": window.sessionStorage.getItem("userNo"),
                        "orgNo": window.sessionStorage.getItem("orgNo"),
                        "appNo": appNo
                    };
                    var data = JSON.stringify(taData);
                    window.android.httpServer("ydzySetXYData", data);
                    BZYD.returnHttpServerData = function (taBackData) {
                        var taBackString = JSON.parse(taBackData);
                        var taReturnCode = taBackString.returnCode;
                        var taReturnMSG = taBackString.returnMSG;
                        window.android.show('taReturnMSG==>' + taReturnMSG);
                        if (taReturnCode == '1000') {
                            window.android.show("地理位置信息发送成功-------");

                        }
                    }
                    var flagssssssss = window.android.updataDataJS("305613", ['nowAppNo'], ['0'], ['1', window.sessionStorage.getItem("sysUserName")]); //把nowApp标志全部更为0
                    window.android.show(flagssssssss);
                    //----------之前的工单离开结束
                    var aa = window.android.updataKeyData("30565", ['getFlag'], [''], [res.PRIMARY_KEY]);

                    window.android.show("开始出发！" + getFlag);
                    var aa = window.android.updataKeyData("30565", ['getFlag'], ['04'], [premarykey]);
                    var flagssssssss1 = window.android.updataDataJS("30561", ['nowAppNo'], ['1'], content); //把当前nowApp标志更为1

                    if (aa == "true") {
                        _this.addClass("teshuhongse");
                        _this.addClass("zhuangtais");
                        _this.children().removeClass("chufa");
                        _this.children().eq(1).addClass("chufa");
                        _this.attr("data-flag", "04");
                        mui.alert("出发状态上传成功！");
                    } else {
                        mui.alert("更新状态失败！");
                    }
                    //--------------------
                    var dd = window.android.getLocation();
                    window.android.show("经纬度---" + dd); //经纬度---{"longitude":"116.309414","latitude":"40.091871"}
                    dd = JSON.parse(dd);
                    var longitude = dd.longitude;
                    var latitude = dd.latitude;
                    if (longitude == "" || longitude == undefined || longitude == null) {
                        longitude = "0.0";
                    }
                    if (latitude == "" || latitude == undefined || latitude == null) {
                        latitude = "0.0";
                    }
                    var taData = {
                        "data": {
                            "longitude": longitude, //经度
                            "latitude": latitude, //纬度
                            "position": "", //位置
                            "status": "02", //工单状态(01签收、02在办、03完成、04部分未上传、05已处理工单)
                            "staffStatus": "04", //到达现场01，现场作业02，离开现场03，路途中04，其他05。
                            "appNo": appNo, //申请编号
                            "activity": activity, //环节名称
                            "proMode": busiName, //业务分类
                            "proTitle": proTitle, //流程名称
                            "proName": proName, //业务类型 业务名称（其实是环节编号）
                            "userName": window.sessionStorage.getItem("userName"), //处理人员姓名
                            "tqglNo": window.sessionStorage.getItem("sysUserName"), //台区经理编号
                        },
                        "phoneImei": window.sessionStorage.getItem("phoneImei"),
                        "serviceCode": "ydzySetXYData",
                        "source": source,
                        "target": "",
                        "userNo": window.sessionStorage.getItem("userNo"),
                        "orgNo": window.sessionStorage.getItem("orgNo"),
                        "appNo": appNo
                    };
                    var data = JSON.stringify(taData);
                    window.android.httpServer("ydzySetXYData", data);
                    BZYD.returnHttpServerData = function (taBackData) {
                        var taBackString = JSON.parse(taBackData);
                        var taReturnCode = taBackString.returnCode;
                        var taReturnMSG = taBackString.returnMSG;
                        window.android.show('taReturnMSG==>' + taReturnMSG);
                        if (taReturnCode == '1000') {
                            window.android.show("地理位置信息发送成功-------");

                        }
                    }
                    //----------
                    history.go(0);
                } else {
                    window.android.show("que取消-->");
                    flag = false;
                }
            });
        }
    } else { //查询结果为空===当前没有任何进行中的工单
        flag = true;
    }
    window.android.show("000000000000000-->");
    if (flag == true) {
        window.android.show("222222222222-->");

        var txt1 = window.android.seletKeyData("30564", [premarykey]);
        window.android.show("30564+txt1+1====>" + txt1);
        window.sessionStorage.setItem("premarykey", premarykey);
        window.android.show("appNo-====================" + appNo);
        window.android.show("activNo-====================" + activNo);
        window.android.show("premarykey-====================" + premarykey);
        window.android.show("getFlag-====================" + getFlag);

        if (getFlag == "" || getFlag == undefined || getFlag == null) {
            window.android.show("开始出发！" + getFlag);
            var flagssssssss = window.android.updataDataJS("305613", ['nowAppNo'], ['0'], ['1', window.sessionStorage.getItem("sysUserName")]);
            window.android.show(flagssssssss);
            var aa = window.android.updataKeyData("30565", ['getFlag'], ['04'], [premarykey]);

            if (aa == "true") {

                var flagssssssss1 = window.android.updataDataJS("30561", ['nowAppNo'], ['1'], content);
                window.android.show("30561+nowAppNo+1====>" + flagssssssss1);
                _this.children().removeClass("chufa");
                _this.children().eq(1).addClass("chufa");
                _this.addClass("teshuhongse");
                _this.addClass("zhuangtais");
                _this.attr("data-flag", "04");
                mui.alert("出发状态上传成功！");
            } else {
                mui.alert("更新状态失败！");
            }
            //  var tt=getDataAndSend(appNo,activity,busiName,proTitle,proName,"04");
            //--------------------
            var dd = window.android.getLocation();
            window.android.show("经纬度---" + dd); //经纬度---{"longitude":"116.309414","latitude":"40.091871"}
            dd = JSON.parse(dd);
            var longitude = dd.longitude;
            var latitude = dd.latitude;
            if (longitude == "" || longitude == undefined || longitude == null) {
                longitude = "0.0";
            }
            if (latitude == "" || latitude == undefined || latitude == null) {
                latitude = "0.0";
            }
            var taData = {
                "data": {
                    "longitude": longitude, //经度
                    "latitude": latitude, //纬度
                    "position": "", //位置
                    "status": "02", //工单状态(01签收、02在办、03完成、04部分未上传、05已处理工单)
                    "staffStatus": "04", //到达现场01，现场作业02，离开现场03，路途中04，其他05。
                    "appNo": appNo, //申请编号
                    "activity": activity, //环节名称
                    "proMode": busiName, //业务分类
                    "proTitle": proTitle, //流程名称
                    "proName": proName, //业务类型 业务名称（其实是环节编号）
                    "userName": window.sessionStorage.getItem("userName"), //处理人员姓名
                    "tqglNo": window.sessionStorage.getItem("sysUserName"), //台区经理编号
                },
                "phoneImei": window.sessionStorage.getItem("phoneImei"),
                "serviceCode": "ydzySetXYData",
                "source": source,
                "target": "",
                "userNo": window.sessionStorage.getItem("userNo"),
                "orgNo": window.sessionStorage.getItem("orgNo"),
                "appNo": appNo
            };
            var data = JSON.stringify(taData);
            window.android.httpServer("ydzySetXYData", data);
            BZYD.returnHttpServerData = function (taBackData) {
                var taBackString = JSON.parse(taBackData);
                var taReturnCode = taBackString.returnCode;
                var taReturnMSG = taBackString.returnMSG;
                window.android.show('taReturnMSG==>' + taReturnMSG);
                if (taReturnCode == '1000') {
                    window.android.show("地理位置信息发送成功-------");

                }
            }

            //----------

        } else if (getFlag == "04") {
            window.android.show("到达现场！" + getFlag);
            //  getDataAndSend(appNo,activity,busiName,proTitle,proName,"01");
            //--------------------
            var dd = window.android.getLocation();
            window.android.show("经纬度---" + dd); //经纬度---{"longitude":"116.309414","latitude":"40.091871"}
            dd = JSON.parse(dd);
            var longitude = dd.longitude;
            var latitude = dd.latitude;
            if (longitude == "" || longitude == undefined || longitude == null) {
                longitude = "0.0";
            }
            if (latitude == "" || latitude == undefined || latitude == null) {
                latitude = "0.0";
            }
            var taData = {
                "data": {
                    "longitude": longitude, //经度
                    "latitude": latitude, //纬度
                    "position": "", //位置
                    "status": "02", //工单状态(01签收、02在办、03完成、04部分未上传、05已处理工单)
                    "staffStatus": "01", //到达现场01，现场作业02，离开现场03，路途中04，其他05。
                    "appNo": appNo, //申请编号
                    "activity": activity, //环节名称
                    "proMode": busiName, //业务分类
                    "proTitle": proTitle, //流程名称
                    "proName": proName, //业务类型 业务名称（其实是环节编号）
                    "userName": window.sessionStorage.getItem("userName"), //处理人员姓名
                    "tqglNo": window.sessionStorage.getItem("sysUserName"), //台区经理编号
                },
                "phoneImei": window.sessionStorage.getItem("phoneImei"),
                "serviceCode": "ydzySetXYData",
                "source": source,
                "target": "",
                "userNo": window.sessionStorage.getItem("userNo"),
                "orgNo": window.sessionStorage.getItem("orgNo"),
                "appNo": appNo
            };
            var data = JSON.stringify(taData);
            window.android.httpServer("ydzySetXYData", data);
            BZYD.returnHttpServerData = function (taBackData) {
                var taBackString = JSON.parse(taBackData);
                var taReturnCode = taBackString.returnCode;
                var taReturnMSG = taBackString.returnMSG;
                window.android.show('taReturnMSG==>' + taReturnMSG);
                if (taReturnCode == '1000') {
                    window.android.show("地理位置信息发送成功-------");

                }
            }
            var aa = window.android.updataKeyData("30565", ['getFlag'], ['02'], [premarykey]);
            if (aa == "true") {
                _this.children().removeClass("chufa");
                _this.children().eq(2).addClass("chufa");
                _this.addClass("teshuhongse");
                _this.addClass("zhuangtais");
                _this.attr("data-flag", "02");
                mui.alert("到达状态上传成功");
            } else {
                mui.alert("到达状态失败！");
            }
            //----------

        } else if (getFlag == "02") {
            window.android.show("离开成功！" + getFlag);

            //--------------------
            var dd = window.android.getLocation();
            window.android.show("经纬度---" + dd); //经纬度---{"longitude":"116.309414","latitude":"40.091871"}
            dd = JSON.parse(dd);
            var longitude = dd.longitude;
            var latitude = dd.latitude;
            if (longitude == "" || longitude == undefined || longitude == null) {
                longitude = "0.0";
            }
            if (latitude == "" || latitude == undefined || latitude == null) {
                latitude = "0.0";
            }
            var taData = {
                "data": {
                    "longitude": longitude, //经度
                    "latitude": latitude, //纬度
                    "position": "", //位置
                    "status": "02", //工单状态(01签收、02在办、03完成、04部分未上传、05已处理工单)
                    "staffStatus": "03", //到达现场01，现场作业02，离开现场03，路途中04，其他05。
                    "appNo": appNo, //申请编号
                    "activity": activity, //环节名称
                    "proMode": busiName, //业务分类
                    "proTitle": proTitle, //流程名称
                    "proName": proName, //业务类型 业务名称（其实是环节编号）
                    "userName": window.sessionStorage.getItem("userName"), //处理人员姓名
                    "tqglNo": window.sessionStorage.getItem("sysUserName"), //台区经理编号
                },
                "phoneImei": window.sessionStorage.getItem("phoneImei"),
                "serviceCode": "ydzySetXYData",
                "source": source,
                "target": "",
                "userNo": window.sessionStorage.getItem("userNo"),
                "orgNo": window.sessionStorage.getItem("orgNo"),
                "appNo": appNo
            };
            var data = JSON.stringify(taData);
            window.android.httpServer("ydzySetXYData", data);
            BZYD.returnHttpServerData = function (taBackData) {
                var taBackString = JSON.parse(taBackData);
                var taReturnCode = taBackString.returnCode;
                var taReturnMSG = taBackString.returnMSG;
                window.android.show('taReturnMSG==>' + taReturnMSG);
                if (taReturnCode == '1000') {
                    window.android.show("地理位置信息发送成功-------");

                }
            }
            var flagssssssss = window.android.updataDataJS("305613", ['nowAppNo'], ['0'], ['1', window.sessionStorage.getItem("sysUserName")]);
            window.android.show("gengxinzhuangtai====>>>>" + flagssssssss);
            //----------
            var aa = window.android.updataKeyData("30565", ['getFlag'], [''], [premarykey]);
            if (aa == "true") {
                _this.removeClass("teshuhongse");
                _this.removeClass("zhuangtais");
                mui.alert("离开状态上传成功", function () {
                    history.go(0);
                });

            } else {
                mui.alert("离开状态失败");
            }
        } else {
            //window.android.show("开始出发！" + getFlag);
            //var aa= window.android.updataKeyData("30565", ['getFlag'], ['04'], [premarykey]);
            //if(aa=="true"){
            //	_this.children().removeClass("chufa");
            //	_this.children().eq(1).addClass("chufa");
            //	_this.attr("data-flag","04");
            //	mui.alert("出发状态上传成功！");
            //}else{
            //	mui.alert("更新状态失败！");
            //}
        }
    }

}

BZYD.getUrlsessionStorege = function (url) {
    window.sessionStorage.setItem("commonBack", url);
};
//获取当前时间
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
    var times = Hours + ':' + Minutes + ":" + Seconds;

    var dates = myDate.getFullYear() + Month + data;
    return dates;
}
//根据title获取 业务类型
var appTypeCode1 = function (title) {
    switch (title) {
        case "高压新装":
            return "104"
            break;
        case "高压增容":
            return "111"
            break;
        case "减容":
            return "201"
            break;
        case "减容恢复":
            return "202"
            break;
        case "低压非居民增容":
            return "110"
            break;
        case "低压非居民新装":
            return "102"
            break;
        case "更名":
            return "210"
            break;
        case "过户":
            return "211"
            break;
        case "改类":
            return "215"
            break;
        case "改压":
            return "214"
            break;
        case "销户":
            return "216"
            break;
        case "装表临时用电":
            return "105"
            break;
        case "低压居民新装":
            return "101"
            break;
    }
}

//表单保存图片和入库 activeName环节名称 consNo用户编号 consName用户名 consSortCode用户类别编码 activeName环节名称 pOrgNo省单位编号
//zt 状态    photoStatus附件类型  photoTypeCode 附件类型
var saveFormPhoto = function (appNo, activNo, activeName) {
    var accessory1 = ["userNo", "appNo", "activNo", "id", "consNo", "photoForm", "consName", "consSortCode", "busiClass", "appTypeCode", "activeName", "pOrgNo", "orgNo", "uploadDay", "photoId", "photoName", "appPhotoPath", "gpsLongitude", "gpsLatitude", "posZ", "photoStr", "zt", "carrType", "photoStatus", "photoTypeCode", "status"];
    window.sessionStorage.setItem("accessory1", accessory1);
    window.android.show("accessory1 key" + accessory1);
    var userNo = window.sessionStorage.getItem("userNo"); //工号
    var id = appNo + "_" + activNo; //相关业务标识
    var consNo = window.sessionStorage.getItem("consNo") ? window.sessionStorage.getItem("consNo") : ""; //用户编号
    var consName = window.sessionStorage.getItem("consName") ? window.sessionStorage.getItem("consName") : ""; //用户名
    var consSortCode = window.sessionStorage.getItem("consSortCode") ? window.sessionStorage.getItem("consSortCode") : ""; //用户类别编码
    var busiClass = ""; //业务类编号
    window.android.show("title" + window.sessionStorage.getItem("title"));
    var appTypeCode = appTypeCode1(window.sessionStorage.getItem("title")); //业务类型
    var pOrgNo = window.sessionStorage.getItem("pOrgNo") ? window.sessionStorage.getItem("pOrgNo") : ""; //省单位编号
    var orgNo = window.sessionStorage.getItem("orgNo"); //单位编号
    var uploadDay = ToData(); //上传日期
    var photoId = ""; //附件标识
    var photoName = id; //照片名称
    window.android.show("photoName" + photoName);
    var appPhotoPath = window.android.webViewPicPath(id); //图片终端路径  webViewPicPath
    window.android.show("appPhotoPath" + appPhotoPath);
    var dingwei = window.android.getPosition() ? window.android.getPosition() : "";
    var dingwei = JSON.parse(dingwei) ? JSON.parse(dingwei) : "";
    var gpsLongitude = dingwei.longitude ? dingwei.longitude : ""; //GPS经度
    var gpsLatitude = dingwei.latitude ? dingwei.latitude : ""; //GPS纬度
    var posZ = ""; //高度
//						var photoStr = window.android.FileToStringTab(id); //文件字符串  FileToStringTab
    var photoStr = "";//文件字符串
    window.android.show("photoStr" + photoStr);
    var zt = "02"; //状态
    var carrType = "02"; //载体类型
    var photoStatus = "02"; //附件类型
    var photoTypeCode = "02"; //附件类型
    var accessoryValue1 = [userNo, appNos, activNos, id, consNo, "20", consName, consSortCode, busiClass, appTypeCode, activeName, pOrgNo, orgNo, uploadDay, photoId, photoName, appPhotoPath, gpsLongitude, gpsLatitude, posZ, photoStr, zt, carrType, photoStatus, photoTypeCode, "02"];
    window.sessionStorage.setItem("accessoryValue1", accessoryValue1);
    window.android.show("accessoryValue1 value" + accessoryValue1)
    var A = window.android.inseltDataJS("30725", accessory1, accessoryValue1);
    if (A == "true") {
        mui.alert("表单保存成功");
    } else {
        mui.alert("保存失败");
    }
};
//表单图片上传
var formPhotoUpload = function (appNos, activNos) {
    sqldata = window.android.seletDataJS('30727', [appNos, activNos]);
    if (sqldata == "selet_null") {
        mui.alert("已经没有数据上传");
        $(".jiaZai").removeClass("mui-visibility");
        $('.dialogss').hide();
        return false;
    }
    var orgNo = window.sessionStorage.getItem("orgNo");
    var num = 0;
    mreturnData = "userNo, appNo,activNo, id, consNo, photoForm, consName, consSortCode, busiClass, appTypeCode,activeName,pOrgNo,orgNo,uploadDay,photoName,appPhotoPath,gpsLongitude,gpsLatitude,posZ,photoStr,zt,carrType,photoStatus,photoTypeCode";
    //window.android.seletDataJS("30727",);
    var sqldata1 = JSON.parse(sqldata)
    window.android.show("sqldata" + sqldata);
    var mdata = sqldata1.data[num];
    window.android.httpServerUpload(JSON.stringify(mdata), num);
    BZYD.returnHttpServerData = function (json) {
        json = JSON.parse(json);
        if (json.returnCode == "1000") {
            num++;
            mreturnData = "userNo, appNo,activNo, id, consNo, photoForm, consName, consSortCode, busiClass, appTypeCode,activeName,pOrgNo,orgNo,uploadDay,photoName,appPhotoPath,gpsLongitude,gpsLatitude,posZ,photoStr,zt,carrType,photoStatus,photoTypeCode";
            sqldata = window.android.seletDataJS('30727', [appNos, activNos]);
            if (sqldata == "selet_null") {
                mui.alert("已经没有数据上传");
                return false;
            }
            var sqldata1 = JSON.parse(sqldata)
            window.android.show("sqldata" + sqldata);
            if (num == sqldata1.data.length) {
                window.android.show("表单上传成功");
                $(".jiaZai").removeClass("mui-visibility");
                $('.dialogss').hide();
                mui.alert("表单图片上传成功", "提示");
                num = 0;
                var ui = window.android.updataDataJS('30728', ["status"], ["03"], [appNos, activNos]);
                window.android.show("更新返回值" + ui);
                return false;
            }
            var mdata = sqldata1.data[num];
            window.android.httpServerUpload(JSON.stringify(mdata), num);
        } else {
            window.android.show(json.returnMSG);
            $(".jiaZai").removeClass("mui-visibility");
            $('.dialogss').hide();
            mui.alert(json.returnMSG);
        }
    }
}

