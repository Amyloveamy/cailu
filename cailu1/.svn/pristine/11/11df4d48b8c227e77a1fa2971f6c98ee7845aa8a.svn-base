/**
 * 班组移动 公共JS
 *
 * @author LYTG
 * @since 2016-06-29 13:25:30
 * @description 引入前一定要先引jQuery和mui.min.js
 */

/*功能：
 创建人：
 创建时间：
 修改情况：
 熊珊 2017-09-04 修改请求函数port portConsNo ports
 车鹏飞 2017-09-05 新增判断签收 在办状态函数
 蒙长圆 2017-09-05 新增现场运检判断
 */

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
var source = "24";

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
        var str = uexWindow.getUrlQuery()?uexWindow.getUrlQuery():undefined;
        if(str!=undefined){
            //解码
            str=decodeURI(str);

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
        var str=uexWindow.getUrlQuery();
        str=decodeURI(str);

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
            if (defdata && val == defdata) {
                $(classs).append("<option selected='selected' data-value=" + val + ">" + Name + "</option>");
            } else {
                $(classs).append("<option data-value=" + val + ">" + Name + "</option>");
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
// business_Acceptance增删改查
// 增删改查方法均需要给相应input,select,span加上class: item
// 如果有button或其它标签，需在方法里新增
BZYD.crud = {};
// 接受参数:表名，例如'30010',字符串
BZYD.crud.createAdd = function (arg, one, two, three, four, five, six) {
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
    if (three == "用户电价方案信息") {
        arr3.push("consId");
        arr4.push(window.sessionStorage.getItem("consId"));
    }
    if (arguments.length > 5) {
        var shuju = {};
        var shuju1 = {};
        shuju[five] = [];
        for (var i = 0; i < arr1.length; i++) {
            shuju1[arr1[i]] = arr2[i];
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
                        if (three == "计量点用途方案" && key == "mpSchemeId") {
                            window.sessionStorage.setItem("mpSchemeId1", json[six][i][key]);
                        }
                        if (three == "受电点方案信息" && key == "spId") {
                            window.sessionStorage.setItem("spId", json[six][i][key]);
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
                var zhi = window.android.inseltDataJS(arg, arr3, arr4);

                if (zhi == "true") {
                    mui.alert("上传成功");

                } else {
                    mui.alert("上传失败");
                }
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

            }
        }

    }

};

//删除
BZYD.crud.removeSingle = function (tableNo, PRIMARY_KEY, tableNo1) {
    var d = window.android.seletKeyData(tableNo, PRIMARY_KEY);
    d = JSON.parse(d);
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
    } else {
        mui.alert("失败");
    }

};


BZYD.crud.create = function (arg, one, two) {
    var arr = $(".item");// 每个标签新增类 “item”
    var text, obj, i;
    var arr1 = [];// name值数组
    var arr2 = [];// value值数组
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
        if (obj.tagName == "INPUT") {
            text = obj.value;
            if ($(obj).attr("data-text") != undefined) {
                if (text == "") {
                    mui.alert("请输入" + $(obj).attr('data-text'));
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
                    isNull = true;
                    break;
                }
            }
        }
        if (obj.tagName == "TEXTAREA") {
            text = $(obj).val();

            if ($(obj).attr("data-text") != undefined) {
                if (text == null || text == "") {
                    mui.alert("请填写" + $(obj).attr('data-text'));
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

    arr1.push("zt");
    arr2.push("01");
    var arr3 = [];
    var a = PRIMARY_KEY.toString();
    arr3.push(a);
    var goBack = window.android.updataKeyData(tableNo, arr1, arr2, arr3);
    if (goBack == "true") {
        mui.alert("成功");
        return "true";
    } else {
        mui.alert("失败");
    }
}
// 查询
// 返回列表数据
BZYD.crud.retrieveAll = function (appNo, activNo, tableNo) {
    var arr = [appNo, activNo];
    var d = window.android.seletDataJS(tableNo, arr);
    d = JSON.parse(d);
    return d;

};
// 返回单条数据
BZYD.crud.retrieveSingle = function (tableNo, PRIMARY_KEY) {
    var d = window.android.seletKeyData(tableNo, PRIMARY_KEY);
    d = JSON.parse(d);
    return d;
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
    //txt = JSON.parse(txt);
    //window.android.show("num="+txt);
    return txt;
};

// 待办已办数据的回显
//现场业扩
BZYD.backlogTwo = function (Num, arr, staus) {
    var txt = window.android.seletDataJS(Num, arr);
	window.android.show("打印数据----->"+txt);
    try{
        if(txt!="selet_null"){
            txt = JSON.parse(txt);
            var html = '';
            for (var i = 0; i < txt.data.length; i++) {
                var status = "";
                var colo;
                var NAME = "";
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
                if (txt.data[i].proTitle != -1) {
                    /*busiaccept-业务受理 finalaccept竣工验收 instrmvmr装拆表  midcjk中间检查
                     poweronoff停送电  sitesurvey现场勘查  survey_instmrpoweron勘查装表送电*/
                    switch (txt.data[i].proTitle) {
                        case '高压新装':
                            NAME = "../../images/ywsl_business_icon_High-pressurenewclothes@2x.png"
                            break;
                        case '高压增容':
                            NAME = "../../images/ywsl_business_icon_High-pressurecompatibilization@2x.png"
                            break;
                        case '减容':
                            NAME = "../../images/ywsl_business_icon_Volumereduction@2x.png"
                            break;
                        case '减容恢复':
                            NAME = "../../images/ywsl_ywsl_business_icon_Volumereductionrestoration@2x.png"
                            break;
                        case '低压非居民新装':
                            NAME = "../../images/ywsl_business_icon_low-pressureNonresidentNewclothes@2x.png"
                            break;
                        case '低压非居民增容':
                            NAME = "../../images/ywsl_business_icon_lowpressureNonresidentincreasecapacity@2x.png"
                            break;
                        case '更名':
                            NAME = "../../images/ywsl_business_icon_Name@2x.png"
                            break;
                        case '过户':
                            NAME = "../../images/ywsl_business_icon_Transfer@2x.png"
                            break;
                        case '改类':
                            NAME = "../../images/ywsl_business_icon_Changeclass@2x.png"
                            break;
                        case '改压':
                            NAME = "../../images/ywsl_business_icon_Changepressure@2x.png"
                            break;
                        case '销户':
                            NAME = "../../images/ywsl_business_icon_Cancelaccount@2x.png"
                            break;
                        case '更名':
                            NAME = "../../images/ywsl_business_icon_Name@2x.png"
                            break;
                        case '装表临时用电':
                            NAME = "../../images/ywsl_-business_icon_Temporarypoweronmeter@2x.png"
                            break;
                        case '低压居民新装':
                            NAME = "../../images/ywsl_business_icon_Low-pressure-residents-new-clothes@2x.png"
                            break;
                        case '低压居民增容':
                            NAME = "../../images/ywsl_business_icon_Low-pressure-residents-capacity-increase@2x.png"
                            break;
                        default:
                            break;
                    };

                    html +=
                        '<li class="mui-table-view-cell mui-media add_child" data-overdurDate=' + txt.data[i].overdurDate + ' data-appNo=' + txt.data[i].appNo + ' data-activNo=' + txt.data[i].activNo +' data-orgNo=' + txt.data[i].orgNo+ ' data-zhou=' + txt.data[i].consId + '>' +
                        '<img class="mui-media-object mui-pull-left" src="' + NAME + '">' +
                        '<div class="mui-media-body" >' +
                        '<p class="title" data-activity=' + txt.data[i].activity + '>' + txt.data[i].proTitle + '</p><span style="background-color:' + colo + ';color: white;" class="zhuangTai Sign">' + status + '</span>' +
                        '<p class="appno"'+ ' data-appNo=' + txt.data[i].appNo+'>申请编号:' +txt.data[i].appNo+ '</p>' +
                        '<p class="consBox" data-consId=' + txt.data[i].consName + '>客户名称:' + txt.data[i].consName + '</p>' +
                        '</div>' +
                        '</li>'
                }


                if (txt.data[i].elecAddr.length >= 10) {
                    txt.data[i].elecAddr = txt.data[i].elecAddr.substring(0, 10) + "...";
                }
                ;
                var time;
                if (txt.data[i].warningDate == null || txt.data[i].warningDate == "null") {
                    time = "";
                } else {
                    time = txt.data[i].warningDate;
                }
            }
            if (staus == 'true') {
                $('.yiban').append(html);
            } else {
                $('.daiban').append(html);
            }
        }else{
            window.android.show("txt======>>>>>>查询数据为空");
        }
    }catch (e){
        window.android.show("txt======>>>>>>异常报错");

    }



};

//现场业扩
BZYD.backlog = function (Num, arr, staus) {
    var txt = window.android.seletDataJS(Num, arr);
//	window.android.show("打印数据----->"+txt);
    try{
        if(txt!="selet_null"){
            txt = JSON.parse(txt);
            var html = '';
            for (var i = 0; i < txt.data.length; i++) {
                var status = "";
                var colo;
                var NAME = "";
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
//		if(txt.data[i].proTitle != -1) {
//			/*busiaccept-业务受理 finalaccept竣工验收 instrmvmr装拆表  midcjk中间检查
//			 poweronoff停送电  sitesurvey现场勘查  survey_instmrpoweron勘查装表送电*/
//			switch (txt.data[i].proTitle) {
//				case '高压新装':
//					NAME = "../../images/ywsl_business_icon_High-pressurenewclothes@2x.png"
//					break;
//				case '高压增容':
//					NAME = "../../images/ywsl_business_icon_High-pressurecompatibilization@2x.png"
//					break;
//				case '减容':
//					NAME = "../../images/ywsl_business_icon_Volumereduction@2x.png"
//					break;
//				case '减容恢复':
//					NAME = "../../images/ywsl_ywsl_business_icon_Volumereductionrestoration@2x.png"
//					break;
//				case '低压非居民新装':
//					NAME = "../../images/ywsl_business_icon_low-pressureNonresidentNewclothes@2x.png"
//					break;
//				case '低压非居民增容':
//					NAME = "../../images/ywsl_business_icon_lowpressureNonresidentincreasecapacity@2x.png"
//					break;
//				case '更名':
//					NAME = "../../images/ywsl_business_icon_Name@2x.png"
//					break;
//				case '过户':
//					NAME = "../../images/ywsl_business_icon_Transfer@2x.png"
//					break;
//				case '改类':
//					NAME = "../../images/ywsl_business_icon_Changeclass@2x.png"
//					break;
//				case '改压':
//					NAME = "../../images/ywsl_business_icon_Changepressure@2x.png"
//					break;
//				case '销户':
//					NAME = "../../images/ywsl_business_icon_Cancelaccount@2x.png"
//					break;
//				case '更名':
//					NAME = "../../images/ywsl_business_icon_Name@2x.png"
//					break;
//				case '装表临时用电':
//					NAME = "../../images/ywsl_-business_icon_Temporarypoweronmeter@2x.png"
//					break;
//				case '低压居民新装':
//					NAME = "../../images/ywsl_business_icon_Low-pressure-residents-new-clothes@2x.png"
//					break;
//				case '低压居民增容':
//					NAME = "../../images/ywsl_business_icon_Low-pressure-residents-capacity-increase@2x.png"
//					break;
//				case '现场周期检查服务管理':
//					NAME="../../images/ywsl_business_icon_High-pressurenewclothes@2x.png"
//					break;
//				case '专项检查':
//					NAME="../../images/ywsl_business_icon_High-pressurecompatibilization@2x.png"
//					break;
//				case '违约用电窃电处理':
//					NAME="../../images/ywsl_business_icon_Volumereduction@2x.png"
//					break;
//				default:
//					break;
//			}
//			;
//			html +=
//				'<li class="mui-table-view-cell mui-media add_child" data-overdurDate='+txt.data[i].overdurDate+' data-appNo=' + txt.data[i].appNo + ' data-activNo=' + txt.data[i].activNo + '>' +
//				'<img class="mui-media-object mui-pull-left" src="' + NAME + '">' +
//				'<div class="mui-media-body">' +
//				'<p class="title">' + txt.data[i].proTitle + '</p><span style="background-color:' + colo + ';color: white;" class="zhuangTai">' + status + '</span>' +
//				'<p>申请编号:' + txt.data[i].appNo + '</p>' +
//				'<p>客户名称:' + txt.data[i].consName + '</p>' +
//				'</div>' +
//				'</li>'
//		} else
                if (txt.data[i].activity != -1) {
                    /*amt-现场抄表*/
                    switch (txt.data[i].activity) {
                        case '现场抄表':
                            NAME = "../../images/business_icon_Meterreadingfee_96@2x.png"
                            break;
                        case '现场催费':
                            NAME = "../../images/business_icon_On-sitereminder_96@2x.png"
                            break;
                        case '停电通知':
                            NAME = "../../images/business_icon_Blackoutnotice_96@2x.png"
                            break;
                        case '现场停电':
                            NAME = "../../images/business_icon_Fieldblackout@2x.png"
                            break;
                        case '现场复电':
                            NAME = "../../images/business_icon_Complexscene_96@2x.png"
                            break;
                        case '应急复电':
                            NAME = "../../images/business_icon_Emergencyrestoration_88@2x.png"
                            break;
                        /*elecchk--用电检查*/
                        case '周期检查':
                            NAME = "../../images/ywsl_business_icon_High-pressurenewclothes@2x.png"
                            break;
                        case '专项检查':
                            NAME = "../../images/ywsl_business_icon_High-pressurecompatibilization@2x.png"
                            break;
                        case '违约用电':
                            NAME = "../../images/ywsl_business_icon_Volumereduction@2x.png"
                            break;
                        case '竣工验收':
                            NAME = "../../images/ywsl_business_icon_Volumereduction@2x.png"
                            break;
                        case '现场勘查':
                            NAME = "../../images/ywsl_business_icon_Volumereduction@2x.png"
                            break;
                        case '停送电':
                            NAME = "../../images/ywsl_business_icon_Volumereduction@2x.png"
                            break;
                        case '勘查装表送电':
                            NAME = "../../images/ywsl_business_icon_Volumereduction@2x.png"
                            break;
                        case '故障处理':
                            NAME = "../../images/business_icon_Troubleshooting_88@2x.png"
                            break;
                        case '隐患排查':
                            NAME = "../../images/_business_icon_Hidden-danger-management_88@2x.png"
                            break;
                        case '现场消缺':
                            NAME = "../../images/_business_icon_defect-management_88@2x.png"
                            break;
                        case '现场巡视':
                            NAME = "../../images/_business_icon_Management-By-Walking-Around_88@2x.png"
                            break;
                        case '内部检修':
                            NAME = "../../images/_business_icon_Subscription-query_96@2x.png"
                            break;
                        case '信息收集处理':
                            NAME = "../../images/busiaccept.png"
                            break;
                        case '临时任务处理':
                            NAME = "../../images/_business_icon_Temporarypoweronmeter_96@2x.png"
                            break;
                        default:
                            break;
                    }
                    ;
                    html +=
                        '<li class="mui-table-view-cell mui-media add_child gongdan" data-overdurDate=' + txt.data[i].overdurDate + ' data-appNo=' + txt.data[i].appNo + ' data-activNo=' + txt.data[i].activNo + '>' +
                        '<img class="mui-media-object mui-pull-left" src="' + NAME + '">' +
                        '<div class="mui-media-body">' +
                        '<p class="title">' + txt.data[i].activity + '</p><span style="background-color:' + colo + ';color: white;" class="zhuangTai">' + status + '</span>' +
                        '<p>申请编号:' + '<span class="appno">'+txt.data[i].appNo+'</span>' + '</p>' +
                        '<p>客户名称:' + txt.data[i].consName + '</p>' +
                        '</div>' +
                        '</li>'

                }


                if (txt.data[i].elecAddr.length >= 10) {
                    txt.data[i].elecAddr = txt.data[i].elecAddr.substring(0, 10) + "...";
                }
                ;
                var time;
                if (txt.data[i].warningDate == null || txt.data[i].warningDate == "null") {
                    time = "";
                } else {
                    time = txt.data[i].warningDate;
                }

            }
            if (staus == 'true') {
                $('.yiban').append(html);
            } else {
                $('.daiban').append(html);
            }
        }else{
            window.android.show("txt======>>>>>>查询数据为空");

        }
    }catch (e){
        window.android.show("txt======>>>>>>异常报错");

    }



};
BZYD.checkStatus = function (Num, arr) {
    var txt = window.android.seletDataJS(Num, arr);
//	window.android.show('txt22222222==='+txt);
    txt = JSON.parse(txt);
    var sum = 0;
    for (var i = 0; i < txt.data.length; i++) {
        switch (txt.data[i].listStatus) {
            case '01':
                sum++
                break;
        }
    }
    if (sum != 0) {
        $('#xiazai2').prop('src', '../../images/icon_task_new@2x.png');
    } else {
        $('#xiazai2').prop('src', '../../images/icon_task_done@2x.png');
    }
}
BZYD.checkStatusTwo = function (Num, arr) {
    var txt = window.android.seletDataJS(Num, arr);
	window.android.show('txt22222222==='+txt);
    try{
        if(txt!="selet_null"){
            txt = JSON.parse(txt);
            var sum = 0;
            for (var i = 0; i < txt.data.length; i++) {
                switch (txt.data[i].listStatus) {
                    case '01':
                        sum++
                        break;
                }
            }
            window.android.show('sum222222==='+sum);

            if (sum != 0) {
                $('#xiazai2').prop('src', '../../images/icon_task_new@2x.png');
            } else {
                $('#xiazai2').prop('src', '../../images/icon_task_done@2x.png');
            }
        }else{
            window.android.show('sum222222===查询数据为');

        }
    }catch (e){
        window.android.show('sum222222===异常报错');

    }


}

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
    window.android.show('txt=====' + txt);
    try{
        if(txt!="selet_null"){
            txt = JSON.parse(txt);
            var html = '';
            for (var i = 0; i < txt.data.length; i++) {
                var status = "";
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
                html +=
                    '<div class="add_child clearfix" data-activNo=' + txt.data[i].activNo + '>' +
                    '<div class="add_right clearfix">' +
                    '<div class="add_r_l clearfix">' +
                    '<p>任务编号:<span class="appNo">' + txt.data[i].appNo + '</span></p>' +
//			'<p>电压等级<span>' + dianya + '</span></p>' +
                    '<p>任务来源:<span>' + txt.data[i].activity + '</span></p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="add_left"> <span>待检查户数<br><b>' + txt.data[i].planConsNo + '</b></span></div>' +
                    '<div class="add_r_r" style="background-color: ' + colo + '">' + status + '</div>' +
                    '</div>'
            }
            if (staus == 'true') {
                $('.yiban').append(html);
            } else {
                $('.daiban').append(html);
            }
        }else{
            window.android.show("txt======>>>>>>查询数据为空");

        }
    }catch (e){
        window.android.show("txt======>>>>>>异常报错");

    }


}

//违约用电
BZYD.weiyueyongdian = function (Num, arr, staus) {

    var txt = window.android.seletDataJS(Num, arr);
    try{
        if(txt!="selet_null"){
            txt = JSON.parse(txt);
            var html = '';
            for (var i = 0; i < txt.data.length; i++) {
                var status = "";
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
                html +=
                    '<li class="one">' +
                    '<div class="content left">' +
                    '<p><span>任务编号：</span><label data-activNo="' + txt.data[i].activNo + '">' + txt.data[i].appNo + '</label></p>' +
                    '<p><span >用户名称：</span><label>' + txt.data[i].consName + '</label></p>' +
                    '<p><span>用户编号：</span><label>' + txt.data[i].consNo + '</label></p>' +
                    '</div>' +
                    '<div class="btn mui-btn mui-btn-primary Sign" style="background-color: ' + colo + '">' + status + '</div>' +
                    '</li>'
            }
            if (staus == 'true') {
                $('.yiban').append(html);
            } else {
                $('.daiban').append(html);
            }

        }else{
            window.android.show('txt==查询数据为空');

        }
    }catch (e){
        window.android.show('txt==异常报错');

    }

}

BZYD.DownloadData = function (data) {
    data = JSON.stringify(data);
    window.android.httpServer("ydzyWork", data);
    BZYD.returnHttpServerData = function (txt) {
        window.android.show('txt==' + txt);
        if (txt.indexOf('workList') != -1) {
//			$(id).css('background','url(../images/icon_task_new@2x.png) no-repeat center');
//			$('#xiazai2').attr('src','../../images/icon_task_new@2x.png');
            window.sessionStorage.setItem('staFlag', '1');
            window.android.putString('staFlag', '1');
        } else {
//			$(id).css('background','url(../images/icon_task_done@2x.png) no-repeat center');
//			$('#xiazai2').attr('src','../../images/icon_task_done@2x.png');
            window.sessionStorage.setItem('staFlag', '2');
            window.android.putString('staFlag', '2');
        }
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
                if (txt.workList.appNo != "null") {
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
        $(".dialog").hide();
        mui.init();
//		mui.toast("新增了" + index + "条数据");
        mui.alert('', ("新增了" + index + "条数据"));
        var timer = setTimeout(function () {
            location.reload();
        }, 1000)
    }
};

BZYD.DownloadWei = function (data, name) {
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
                if (txt.workList.appNo != "null") {
                    // 判断值是否在要求的范围内
                    var fox;
                    switch (txt.workList[i].activity) {
                        case name:
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
        $(".dialog").hide();
        mui.init();
//		mui.toast("新增了" + index + "条数据");
//		var timer = setTimeout(function(){
//			location.reload();
//		},1000)
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
};

//接口调用(只有ID)
BZYD.port = function (portId, portTransfer) {
    var commonData = {
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
    var data = JSON.stringify(commonData);
    window.android.httpServer(portTransfer, data);
};

BZYD.portConsNo = function (portConsNo, portTransfer) {
    var commonData = {
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
    var data = JSON.stringify(commonData);
    window.android.httpServer(portTransfer, data);
};

BZYD.ports = function (datas, portTransfer) {
    var commonData = {
        "data": datas,
        "target": "",
        "serviceCode": portTransfer,
        "source": source,
        "userNo": window.sessionStorage.getItem("userNo"),
        "orgNo": window.sessionStorage.getItem("orgNo"),
        "phoneImei": window.sessionStorage.getItem("phoneImei")
    };
    var data = JSON.stringify(commonData);
    window.android.httpServer(portTransfer, data);
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
BZYD.baocunid = function () {
    var appNo = window.sessionStorage.getItem("appNo");
    var activNo = window.sessionStorage.getItem("activNo");
    var elecTypeCode = window.sessionStorage.getItem("activity");
    var appTypeCode = window.sessionStorage.getItem("proTitle");
    //查询数据库
    var historyData = window.android.seletDataJS('30560', [appNo, activNo]);
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
    var json1 = {
        "appNo": appNo,
        "activNo": activNo,
        "orgNo": orgNo,
        "consNo": consNo,
        "consName": consName,
        "elecAddr": elecAddr,
        "tradeCode": "",
        "voltCode": voltCode,
        "elecTypeCode": elecTypeCode,
        "appTypeCode": appTypeCode,
        "activName": "",
        "appFilePath": "/" + appNo + "/" + activNo,
        "fileType": "",
        "isIdCard": "0",
        "fileName": "photo" + timer
    };
    json = JSON.stringify(json1);
    appFilePath = appNo + "/" + activNo + "/";
    fileName = timer;
}


function jsonToName(codeType, value) {
    var mjson = window.android.selPopWin("30002", [codeType, value]);
    if (mjson.indexOf('data') != -1) {
        mjson = JSON.parse(mjson);
        return mjson.data[0].NAME;
    }
    else {
        return "";
    }
}

function jsonToNo(codeNo) {
    var mjson = window.android.selPopWin("300091", [codeNo]);
    if (mjson.indexOf('data') != -1) {
        mjson = JSON.parse(mjson);
        return mjson.data[0].ORG_NAME;
    }
    else {
        return "";
    }
}
function json(){
    
}
