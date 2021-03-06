//进入页面先确定显示哪个tab页
var page_location = window.common_user.get_sessiondata('page_local'); //底部切换
$('nav>div[data-nav=' + page_location + ']').click();

//进入页面先确定显示哪个tab页

$(function() {
    //底部tab栏切换start
    $('nav>div').on("click", function() {
        var tab_page = $(this).attr('data-nav');
        switch (tab_page) {
            case 'task':
                $('#header>h1').text('营配采录任务');
                $('#tuxiang_icon').show();
                break;
            case 'operation':
                $('#header>h1').text('营配采录');
                $('#tuxiang_icon').hide();
                break;
            case 'my':
                $('#header>h1').text('我的');
                $('#tuxiang_icon').hide();
                break;
            default:
                break;
        }
        $(this).addClass('active-item').siblings().removeClass('active-item');
        $('#' + $(this).attr('data-nav')).addClass('content-active').siblings().removeClass('content-active');

        //设置切换标记缓存
        window.common_user.set_sessiondata('page_local', tab_page);
        //设置切换标记缓存
    });
    // 底部tab栏切换end

    // 任务start

    // 下载工单弹窗start
    $("#tuxiang_icon").on("click", function() {
        wu.showLoading();
        // $('.dialog').show();
        var shuju = {
            "busiName": "06",
            "userNo": window.sessionStorage.getItem("userNo")
        };
        var data = BZYD.data("ydzyWork", shuju);
        data = JSON.stringify(data);
        window.android.httpServer("ydzyWork", data);
        BZYD.returnHttpServerData = function(json) {
            // 关闭弹窗
            wu.hideToast()
            if (json.returnCode == "1000" || json.returnCode == "1001") {
                if (json.indexOf('workList') != -1) {
                    var index = 0;
                    var json = JSON.parse(json).data ? JSON.parse(json).data : JSON.parse(json);
                    for (var i = 0; i < txt.workList.length; i++) {
                        txt.workList[i].listStatus = "01";
                        var arrName = [];
                        var value = [];
                        for (var key in txt.workList[i]) {
                            arrName.push(key);
                            value.push(txt.workList[i][key]);
                        }

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
                var content = '<div style="padding-bottom: .2rem;"> <span style="font-size:.6rem;color: #366ca7;">' + index + '</span>条 <div>'

                confirmPop('已下载工单', content);

            } else {
                // 操作提示弹窗
                confirmPop('下载失败', json.returnMSG);
            }
        }


    })

    // 下载工单弹窗end

    // 清除按钮数量缓存
    window.sessionStorage.removeItem('btnNum');
    // 清除按钮数量缓存

    //tab栏 进入任务中先确定显示哪个tab页
    var tab_location = window.sessionStorage.getItem('tab_location') ? window.sessionStorage.getItem('tab_location') : 'daiban';
    window.sessionStorage.removeItem('tab_location');
    $('.tab-box>div[data-nav=' + tab_location + ']').click()
    $(".tab-box>.tab-item").on("click", function() {
        var tab_location = $(this).attr('data-nav');
        window.sessionStorage.setItem('tab_location', tab_location);

        $(this).addClass("tab-active").siblings().removeClass("tab-active");
        $('#' + $(this).attr("data-nav")).addClass("tab-con-active").siblings().removeClass("tab-con-active");
    })

    // tab栏 进入任务中先确定显示哪个tab页


    // 任务列表页面渲染start
    colours("30567", [window.sessionStorage.getItem("userNo"), "拓扑关系"], 'false');
    colours('30568', [window.sessionStorage.getItem("userNo"), "拓扑关系"], 'true');
    // 任务列表页面渲染end

    // 点击“签收”，调用下载计量容器信息采录接口
    $(".lis-uls").on("click", ".lis-lis", function() {

        // 获取输入参数
        var activNo = $(this).attr('activNo');
        var appNo = $(this).attr('appNo');
        var orgNo = $(this).attr('orgNo');
        var tranIde = $(this).attr('tranIde');

        // 缓存 在return 1111 时使用
        window.sessionStorage.setItem('activNo', activNo);
        window.sessionStorage.setItem('appNo', appNo);

        window.sessionStorage.setItem('tranIde', tranIde);
        window.sessionStorage.setItem('orgNo1', orgNo);

        consoleShow("activNo===" + activNo);

        var htmls = $(this).children('.lis-rig').children('.sign').html();
        if ($(this).children('.lis-rig').children('.sign').attr("boxNum")) {
            var boxNum = $(this).children('.lis-rig').children('.sign').attr("boxNum");
        }

        window.common_user.consoleShow('htmls====' + htmls);

        if (htmls.indexOf('签收') != -1) {
            // 加个类名
            $(this).addClass('list-active');

            // 添加遮罩层
            wu.showLoading();

            // 输入参数
            var datas = {
                "activNo": activNo,
                "appNo": appNo,
                "orgNo": orgNo,
                "termNo": window.sessionStorage.getItem("termNo"),
                "userNo": window.sessionStorage.getItem("userNo")
            };

            window.common_user.consoleShow('datas=====' + JSON.stringify(datas));
            // 调用下载计量容器信息采录接口
            var data = BZYD.data("bjYdzyGetContDevData", datas);
            data = JSON.stringify(data);
            window.android.httpServer("bjYdzyGetContDevData", data); // 发出请求
            // 返回数据在返回函数中处理


        } else if (htmls.indexOf('在办') != -1) {
            if (boxNum == 1) {
                // 单设备需要下载接入点信息（bjYdzyGetJoinData） joinName =>挂接设备名称
                //入参 userNo 工号 termNo 移动作业终端编号  orgNo 单位编号 tranIde 生产变压器标识
                var rucanData = {
                    "orgNo": window.sessionStorage.getItem("orgNo1"),
                    "tranIde": window.sessionStorage.getItem("tranIde"),
                    "userNo": window.sessionStorage.getItem("userNo"),
                    "termNo": window.sessionStorage.getItem("termNo"),
                }

                var data = BZYD.data("bjYdzyGetJoinData", rucanData);
                data = JSON.stringify(data);
                window.android.httpServer("bjYdzyGetJoinData", data); // 发出请求


            } else if (boxNum > 1) {
                window.common_user.Click_href('../cailushebei_list/cailushebei_list.html');
            }
        } else if (htmls.indexOf('已完成') != -1) {
            //我是点击完成状态
            consoleShow('我是点击完成状态');
        }

    })

    // 点击“签收”，调用下载计量容器信息采录接口

    //点击搜索按钮
    $(document).on("click", ".searChImg", function() {
        isGrabbles();
    })

    //点击搜索按钮

    // 功能跳转到计量箱组
    $("#jiliang_zu").on("click", function() {
        window.common_user.Click_href('../jiliangxiang_zu/jiliangxiang_zu.html');
    })

    // 功能跳转到计量箱组

    // 我的start
    $("#details").on("click", function() {
        window.common_user.Click_href('./mine/accountInfor.html');
    })
    $("#binding").on("click", function() {
        window.common_user.Click_href('./mine/bindAccount.html');
    })
    $("#about").on("click", function() {
        window.common_user.Click_href('./mine/about.html');
    })

    // 我的end

    // 安卓方法 返回值处理
    BZYD.returnHttpServerData = function(json) {

        var json = JSON.parse(json).data ? JSON.parse(json).data : JSON.parse(json);
        if (json.returnCode == "1000" || json.returncode == "1001") {
            if (json.code == 'bjYdzyGetContDevData') {
                // 下载计量容器采录信息
                bjYdzyGetContDevData(json);
            } else if (json.code == 'bjYdzyGetJoinData') {
                // 下载接入点
                bjYdzyGetJoinData(json);

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
            window.common_user.consoleShow('成功接收')

            // 弹窗关闭
            wu.hideToast();
            var listS = '03';
            window.history.go(0)

        } else {
            confirmPop('提示', json.returnMSG);
        }

    }

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

    // 列表搜索函数
    function isGrabbles() { // 工单页搜索  流程名称/申请编号
        /*var arrAppNo = [];
         var arrMrSectNo = [];*/
        //定义一个变量来判断是否弹出查询结果不存在
        var tan = false;
        var grabbles = $('.searCh').val(); // 搜索框内容
        if (!grabbles) {
            $('.lis-lis').each(function(index, el) {
                $(el).css('display', 'none'); // 隐藏全部one元素
            });
            return;
        };
        consoleShow('grabbles' + grabbles);

        $('.lis-lis').each(function(index, el) {
            $(el).css('display', 'none'); // 隐藏全部one元素
            tan = false
        });
        $('.lis-lis').each(function(index, el) {
            var appNo = $(el).find('.appNo').text();
            var name = $(el).find('.lis-lef').text();
            if (appNo == grabbles || name == grabbles) {
                $(el).css('display', 'block');
                tan = true
            };

        });
        if (tan == false) {
            confirmPop('提示', '查询结果不存在');
        }
    }
    // 列表搜索函数

    // 下载计量箱采录接口bjYdzyGetContDevData 返回的值
    function bjYdzyGetContDevData(json) {

        // 显示loding
        wu.hideToast();

        var arrName = [];
        var arrValue = [];
        // 将私有数据暂时保存
        if (json['boxLists']) {
            var boxLists = json['boxLists'];
        } else {
            var boxLists = "";
        }
        if (!(typeof json['boxLists']['boxList'] === 'object' && !isNaN(json['boxLists']['boxList'].length))) {
            // 对象 遍历私有数据

            var arrUserName = [];
            var arrUserValue = [];
            for (key in json['boxLists']['boxList']) {
                //查看boxLists[i]中的数据
                //  window.common_user.consoleShow("boxLists[i]中的key"+key+"   boxLists[i][key]"+boxLists[i][key]);

                arrUserName.push(key);
                arrUserValue.push(json['boxLists']['boxList'][key]);
            };
            arrUserName.push("appNo");
            arrUserName.push("activNo");
            arrUserValue.push(json.appNo);
            arrUserValue.push(json.activNo);
            // 未采录状态
            arrUserValue.push('01');
            arrUserName.push("cailuStatus");

            var isUserName = arrName.concat(arrUserName);
            var isUserValue = arrValue.concat(arrUserValue);
            // window.android.inseltDataJS('30362', arrUserName, arrUserValue);
            var iww = window.android.inseltDataJS('30362', isUserName, isUserValue);
            window.common_user.consoleShow('是否保存成功:::iww' + iww);

            var boxNum = json.boxNum;
            if (boxNum == 1) {
                window.sessionStorage.setItem("boxLists", JSON.stringify(boxLists));
                // 缓存 计量箱方案标识 boxSchemeId 计量箱资产编号 assetNo 
                window.sessionStorage.setItem('boxSchemeId', boxLists.boxSchemeId);
                window.sessionStorage.setItem('assetNo', boxLists.assetNo);
            }
            // 存boxnum 修改在办 修改背景色
            $('.list-active').children('.lis-rig').children('.sign').attr("boxNum", boxNum).html('在办').css('background-color', '#f6ab00');

            window.android.updataDataJS('30561', ['listStatus'], ['02'], [isAppNo, isActivNo]); //修改表的字段-->

            confirmPop('提示', '下载成功');

            return false
        }


        var lengths = boxLists.boxList.length;

        // 数组 遍历私有数据
        for (var i = 0; i < lengths; i++) {
            var arrUserName = [];
            var arrUserValue = [];

            for (key in boxLists.boxList[i]) {
                //查看boxLists[i]中的数据
                // consoleShow("boxLists[i]中的key"+key+"   boxLists[i][key]"+boxLists[i][key]);
                arrUserName.push(key);
                arrUserValue.push(boxLists.boxList[i][key]);
            };
            arrUserName.push("appNo");
            arrUserName.push("activNo");
            isUserValue.push(json.appNo);
            isUserValue.push(json.activNo);
            var isUserName = arrName.concat(arrUserName);
            var isUserValue = arrValue.concat(arrUserValue);
            // window.android.inseltDataJS('30362', arrUserName, arrUserValue);
            var iww = window.android.inseltDataJS('30362', isUserName, isUserValue);
            consoleShow('是否保存成功:::' + iww)
        };
        var boxNum = json.boxNum;
        if (boxNum == 1) {
            window.sessionStorage.setItem("boxLists", JSON.stringify(boxLists.boxList));
        }
        // 存boxnum 修改在办 修改背景色
        $('.list-active').children('.lis-rig').children('.sign').attr("boxNum", boxNum).html('在办').css('background-color', '#f6ab00');
        $('.list-active').removeClass('list-active');
        window.android.updataDataJS('30561', ['listStatus'], ['02'], [appNo, activNo]); //修改表的字段-->

        confirmPop('提示', '下载成功')
    }
    // 下载计量箱采录接口bjYdzyGetContDevData 返回的值

    // 下载接入点接口bjYdzyGetJoinData返回的值
    function bjYdzyGetJoinData(json) {
        // dateList => joinId	挂接设备标识 joinName	挂接设备名称 joinPoint	挂接设备位置

        var dateList = json.dateLists.dateList;

        if (!(typeof dateList === 'object' && !isNaN(dateList.length))) {
            // dateList 是一个对象
            joinName = [];
            joinName.push(dateList.joinName)

        } else {
            // dateList 是一个数组
            joinName = joinName;
        }

        window.common_user.Click_href('../jlx_xinxi_cailu/jlx_xinxi_cailu.html');
    }

    // 下载接入点接口bjYdzyGetJoinData返回的值

    // 渲染页面函数
    function colours(Num, arr, staus) {
        var txt = window.android.seletDataJS(Num, arr);
        window.common_user.consoleShow('这是本页数据' + txt);
        try {
            if (txt.indexOf("data") != -1) {
                window.common_user.consoleShow('在try上是否有本页数据' + txt);

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
                            colo = "#555555"
                            break;
                        case '05':
                            status = "已处理"
                            colo = "#555555"
                            break;
                        default:
                            break;
                    };
                    html += '<li class="lis-lis" data-tranIde="' + txt.data[i].tranIde + '" data-appNo="' + txt.data[i].appNo + '" data-activNo="' + txt.data[i].activNo + '" data-orgNo="' + txt.data[i].orgNo + '">\n' +
                        '                                <div class="lis-lef">\n' +
                        '                                    ' + txt.data[i].proTitle + '\n' +
                        '                                </div>\n' +
                        '                                <div class="lis-mid">\n' +
                        '                                    <div> <span>申请编号 :</span><div class="appNo">' + txt.data[i].appNo + '</div></div>\n' +
                        '                                    <div><span>户名 :</span><div class="consName">' + txt.data[i].consName + '</div></div>\n' +
                        '                                    <div><span>用电地址 :</span><div class="elecAddr">' + txt.data[i].elecAddr + '</div></div>\n' +
                        '                                    <div class="colorf40c17"><span>预警时间 :</span><div class="warningDate">' + txt.data[i].warningDate + '</div></div>\n' +
                        '                                    <div class="hiden">\n' +
                        '                                        <span>环节编号 :</span>\n' +
                        '                                        <div class="activNo">200200202</div>\n' +
                        '                                    </div>\n' +
                        '                                    <div class="hiden">\n' +
                        '                                        <span>供电单位 :</span>\n' +
                        '                                        <div class="orgNo">北京供电单位</div>\n' +
                        '                                    </div>'
                    '                                       </div>\n' +
                    '                                   <div class="lis-rig">\n' +
                    '                                    <div class="icon daohang"></div>\n' +
                    '                                       <div class="sign">\n' +
                    '                                        ' + status + '\n' +
                        '                                    </div>\n' +
                        '                                </div>\n' +
                        '                            </li>'

                }
                if (staus == 'true') {
                    $('.yiban').html(html);
                } else {
                    $('.daiban').html(html);
                }
            } else {
                window.common_user.consoleShow('----------查询数据为空---------');
            }
        } catch (e) {
            window.common_user.consoleShow('----------异常报错---------');
        }


    }

    // 渲染页面函数
})