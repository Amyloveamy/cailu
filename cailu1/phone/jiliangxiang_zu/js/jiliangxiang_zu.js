// 计量箱组列表


// 渲染页面
// 查库
// jilxZuList('30740', null);

// 查库

// 渲染页面


// 点击每一项跳转到 计量箱列表
$(".sel-lis .sel-rig").on("click", function() {
    var groupId = $(this).parent(".sel-lis").attr('data-groupId');

    window.sessionStorage.setItem('groupId', groupId);
    window.common_user.consoleShow(' groupId====' + groupId);

    //    "跳转到 计量箱列表"
    window.common_user.Click_href('../jiliangxiang_list/jiliangxiang_list.html');
})

// 点击每一项跳转到 计量箱列表

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

// 菜单弹出框start
$("#openPopover").on("click", function() {
    PopoverShow();
})
$(".mui-backdrop").on("click", function() {
    PopoverHide();
})

// 点击新增跳转 计量箱组
$("#popover .add").on("click", function() {
    // console.log("跳转到计量箱组")
    window.sessionStorage.removeItem('edit');
    window.sessionStorage.removeItem('dvcName');
    window.sessionStorage.removeItem('dvcId');
    window.common_user.Click_href('../jlx_zu_cailu/jlx_zu_cailu.html');
    PopoverHide();
})

// 点击新增跳转 计量箱组

// window.common_user.consoleShow($('.sel-lis').find("#imgCheck").attr('data-flag'));

// 点击编辑跳转 计量箱组
$("#popover .edit").on("click", function() {
    var lis = $(".sel-lis");

    // 存两个字段 dvcName  dvcId
    var arr = [];
    var num = 0;
    lis.each(function(index, item) {

        if ($(item).find("#imgCheck").attr('data-flag') == 'on') {
            num++;
            arr.push({
                'groupId': $(item).attr('data-groupId')
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
        // 缓存  dvcName  dvcId
        window.sessionStorage.setItem('groupId', arr[0].groupId);
        // 选择一个 跳转编辑页面 跳转到计量箱组
        window.common_user.Click_href('../jlx_zu_cailu/jlx_zu_cailu.html');

    } else {
        confirmPop('提示', '请选择一个列表项！');
    }
    PopoverHide();
})

// 点击编辑跳转 计量箱组

// 点击删除按钮
$("#popover .delate").on("click", function() {
    window.common_user.consoleShow('点击删除按钮');
    var lis = $(".sel-lis");

    // 存两个字段 dvcName  dvcId
    var arr = [];
    var num = 0;
    lis.each(function(index, item) {

        if ($(item).find("#imgCheck").attr('data-flag') == 'on') {
            num++;
            arr.push( $(item).attr('data-groupId'));
        }
    });

    window.common_user.consoleShow(arr);
    if (num == 0) {
        confirmPop('提示', '请选择列表项！');
    } else {
        // 删除所选列表项 => 查库 =>渲染
        for(var i=0;i<arr.length;i++){
        	window.android.deletKeyData('30743', [arr[i]]);
        }
		confirmPop('提示', '删除成功！');
        //删除成功重新渲染页面
        // 查库
		// jilxZuList('30740', null);




    }


    PopoverHide();
})



// 点击删除按钮


// 点击上传按钮

$("#submit").on("click", function() {
    window.common_user.consoleShow('点击上传按钮');
    // 勾选复选框 之后上传
	var lis = $(".sel-lis");

    // 存两个字段 dvcName  dvcId
    var arr = [];
    var num = 0;
    lis.each(function(index, item) {

        if ($(item).find("#imgCheck").attr('data-flag') == 'on'&&$(item).find("#imgCheck").attr('one')=="01") {
            num++;
            arr.push( $(item).attr('data-groupId'));
        }
    });
    if(num==0){
    	confirmPop('提示', '请选择一条未上传的数据！');
    	return false;
    }else if(num>9){
    	confirmPop('提示', '选择未上传的数据不能超过九条！');
    	return false;
    }
    

})






// 点击上传按钮







// 三点弹窗弹出
function PopoverShow() {
    $("#popover").show();
    $(".mui-backdrop").addClass("mui-active");
}
// 三点弹窗隐藏
function PopoverHide() {
    $("#popover").hide();
    $(".mui-backdrop").removeClass("mui-active");
}

// 菜单弹出框end




// 页面渲染函数
function jilxZuList(Num, arr) {

    // 查库 30740/1/2/3 计量箱组 
    var txt = window.android.seletDataJS(Num, arr);
    window.common_user.consoleShow('计量箱组本页数据====' + txt);
    try {
        if (txt.indexOf('data' != -1)) {
            var txt = JSON.parse(txt);
            var html = '';
            for (var i = 0; i < txt.data.length; i++) {

                // 上传按钮状态 one --TODO--
                switch (txt.data[i].one) {
                    case '01':
                        status = "未上传"
                        break;
                    case '02':
                        status = "已上传"
                        break;
                    default:
                        break;
                };

                html += '<li class="sel-lis" "data-groupId="' + txt.data[i].groupId + '" >\n' +
                    '                    <div class="sel-lef fl">\n' +
                    '                        <input type="checkbox" value="ON">\n' +
                    '                        <img src="../images/Public_icon_Notselected@2x.png" data-flag="off" one="'txt.data[i].one'" alt="" />\n' +
                    '                    </div>\n' +
                    '                    <div class="sel-rig fl">\n' +
                    '                        <div class="sel-con">\n' +
                    '                            <div>' + txt.data[i].dvcName + '</div>\n' +
                    '                            <div>该分组下包含' + txt.data[i].number + '个计量箱</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="cl-rig">\n' +
                    '                            ' + status + '\n' +
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