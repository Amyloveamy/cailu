// 计量箱列表

var groupId = window.sessionStorage.getItem('groupId');
window.common_user.consoleShow(' groupId====' + groupId);


// 渲染页面

// 调渲染页面函数 30750/1/2/3  groupId


// 调渲染页面函数


// 渲染页面



// 点击每一项跳转到 电表列表
$(".sel-lis .sel-rig").on("click", function() {
    var metterId = $(this).parent(".sel-lis").attr('data-metterId');
    window.sessionStorage.setItem('metterId', metterId);
    window.common_user.consoleShow(' metterId====' + metterId);
    //   "跳转到 电表列表"
    window.common_user.Click_href('../dianbiao_list/dianbiao_list.html');
})

// 点击每一项跳转到 电表列表

// 复选框点击start
$('.sel-lef img').each(function(index, el) {
    el.flag = false;
});
$(".sel-lef img").on("click", function(even) {
    console.log('flag====' + even)
    if (this.flag) {
        $(this).attr({
            'src': '../images/Public_icon_Notselected@2x.png',
            'data-flag': 'off'
        })
        this.flag = false;
    } else {
        $(this).attr({
            'src': '../images/Generaloperation_icon_check@2x.png',
            'data-flag': 'on'
        })
        this.flag = true;
    }
})


// 复选框点击end

// 三点菜单弹出框start
$("#openPopover").on("click", function() {
    PopoverShow();
})
$(".mui-backdrop").on("click", function() {
    PopoverHide();
})

// 菜单弹出框end


// 点击新增跳转 计量箱组
$("#popover .add").on("click", function() {
    window.sessionStorage.removeItem('edit');
    window.sessionStorage.removeItem('dvcName');
    window.sessionStorage.removeItem('dvcId');
    //    "跳转到计量箱组
    window.common_user.Click_href('../jlx_cailu/jlx_cailu.html');
    PopoverHide();
})

// 点击新增跳转 计量箱组

// 点击编辑跳转 计量箱组
$("#popover .edit").on("click", function() {


    var lis = $(".sel-lis");

    // 存个字段 metterId
    var arr = [];
    var num = 0;
    lis.each(function(index, item) {

        if ($(item).find("#imgCheck").attr('data-flag') == 'on') {
            num++;
            arr.push({
                'metterId': $(item).attr('data-metterId'),
            });
        }
    });

    window.common_user.consoleShow(arr);

    if (num == 0) {
        // 没有选择一个li
        confirmPop('提示', '请选择一个列表项！');

    } else if (num == 1) {
        // 缓存一个edit 下一个页面判断是 编辑按钮跳转过来
        window.sessionStorage.setItem('edit', 'edit');
        // 缓存 metterId
        window.sessionStorage.setItem('metterId', arr[0].metterId);

        // 选择一个 跳转编辑页面 跳转到计量箱采录
        window.common_user.Click_href('../jlx_cailu/jlx_cailu.html');

    } else {
        confirmPop('提示', '请选择一个列表项！');
    }
    PopoverHide();

})

// 点击编辑跳转 计量箱组

// 点击删除
$("#popover .delate").on("click", function() {
    window.common_user.consoleShow('点击删除按钮====');
     var lis = $(".sel-lis");
	var arr = [];
    var num = 0;
    lis.each(function(index, item) {

        if ($(item).find("#imgCheck").attr('data-flag') == 'on') {
            num++;
            arr.push($(item).attr('data-metterId'));
        }
    });
    if(num==0){
    	confirmPop('提示', '请选择一个列表项进行删除！');
    }else{
    	for(var i=0;i<arr.length;i++){
    		window.android.deletKeyData('30753', [arr[i]]);//删
    	};
    	confirmPop('提示', '删除成功！');
    }
    PopoverHide();
})


// 点击删除


jilxList('30740', [groupId]);
// 页面渲染函数
function jilxList(Num, arr) {

    // 30750/1/2/3  (计量箱列表  BJydzyMeterBox)  
    var txt = window.android.seletDataJS(Num, arr);
    window.common_user.consoleShow('计量箱本页数据====' + txt);
    try {
        if (txt.indexOf('data' != -1)) {
            var txt = JSON.parse(txt);
            var html = '';
            for (var i = 0; i < txt.data.length; i++) {


                html += '<li class="sel-lis" data-metterId="' + txt.data[i].metterId + '" data-dvcName="' + txt.data[i].dvcName + ' "data-dvcId="' + txt.data[i].dvcId + '">\n' +
                    '                    <div class="sel-lef fl">\n' +
                    '                        <input type="checkbox" value="ON">\n' +
                    '                        <img src="../images/Public_icon_Notselected@2x.png" data-flag="off" alt="" />\n' +
                    '                    </div>\n' +
                    '                    <div class="sel-rig fl">\n' +
                    '                        <div class="sel-con">\n' +
                    '                            <div>' + txt.data[i].dvcName + '</div>\n' +
                    '                            <div>该分组下包含' + txt.data[i].number + '个电能表</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="cl-rig">\n' +
                    '                            ' + one + '\n' +
                    '                        </div>\n' +
                    '                    </div>';


            }


        } else {
            window.common_user.consoleShow('----------查询数据为空---------');
        }

    } catch (e) {
        window.common_user.consoleShow('----------异常报错---------');
    }






}
// 页面渲染函数

// 弹窗弹出
function PopoverShow() {
    $("#popover").show();
    $(".mui-backdrop").addClass("mui-active");
}
// 弹窗隐藏
function PopoverHide() {
    $("#popover").hide();
    $(".mui-backdrop").removeClass("mui-active");
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