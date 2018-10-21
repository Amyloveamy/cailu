// 电表列表

// 渲染页面  30760/1/2/3 操作 ID ：dvcName,dvcId,dataList (计量箱资产编号)
var meterId=window.sessionStorage.getItem("meterId");
// dianbiao(30760, [meterId]);

// 渲染页面











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
// 点击编辑
$('#edit').on("click", function() {
	var ammeterId=$(this).attr("data-ammeterId");
	window.sessionStorage.setItem("ammeterId",ammeterId);
	window.sessionStorage.setItem("edit","edit");
    window.common_user.consoleShow('点击编辑按钮');
    // 跳转到电表采录
    window.common_user.Click_href('../diaobiao_cailu/diaobiao_cailu.html');
});




// 点击编辑

//点击删除

// 点击删除
$("#popover .delate").on("click", function() {
    window.common_user.consoleShow('点击删除按钮====');
     var lis = $(".sel-lis");
	var arr = [];
    var num = 0;
    lis.each(function(index, item) {

        if ($(item).find("#imgCheck").attr('data-flag') == 'on') {
            num++;
            arr.push($(item).attr('data-ammeterId'));
        }
    });
    if(num==0){
    	confirmPop('提示', '请选择一个列表项进行删除！');
    }else{
    	for(var i=0;i<arr.length;i++){
    		window.android.deletKeyData('30763', [arr[i]]);//删
    	};
    	confirmPop('提示', '删除成功！');
    }
    PopoverHide();
})

//点击删除

// 点击新增跳转 电表
$("#popover .add").on("click", function() {
	window.sessionStorage.removeItem("edit");
    // 跳转到电表采录
    window.common_user.Click_href('../diaobiao_cailu/diaobiao_cailu.html');
    PopoverHide();
})

// 点击新增跳转 电表

// 菜单弹出框start
$("#openPopover").on("click", function() {
    PopoverShow();
})
$(".mui-backdrop").on("click", function() {
    PopoverHide();
})

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

// 菜单弹出框end


// 渲染函数
function dianbiao(Num, arr) {
    //查库  30760/1/2/3   操作 ID ：dvcName  ，dvcId  , dataList (计量箱资产编号) 
    var txt = window.android.seletDataJS(Num, arr);
    window.common_user.consoleShow('计量箱采录本页数据====' + txt);
    try {
        if (txt.indexOf('data' != -1)) {
            var txt = JSON.parse(txt).data;
            var html="";
            for(var i=0;i<txt.length;i++){
            	  html += '<li class="sel-lis" data-ammeterId="'txt[i].ammeterId'">\n' +
                '                    <div class="sel-lef fl">\n' +
                '                        <input type="checkbox" value="ON">\n' +
                '                        <img src="../images/Public_icon_Notselected@2x.png" data-flag="off" alt="" data-ammeterId="'txt[i].ammeterId'"/>\n' +
                '                    </div>\n' +
                '                    <div class="sel-rig fl">\n' +
                '                        <div class="sel-con">\n' +
                '                            <div>'+txt[i].dvcName +'</div>\n' +
                '                            <div>电能表位：\n' +
                '                                <span class="boxCol">'+txt[i].boxCol +'</span>行，\n' +
                '                                <span class="boxRow"> '+ txt[i].boxRow+'</span>列\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <!-- 编辑图标 -->\n' +
                '                        <div class="edit-btn" id="edit" data-ammeterId="'txt[i].ammeterId'">\n' +
                '                            <span>编辑</span>\n' +
                '                            <img src="../images/edit_icon.jpg" alt="">\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </li>';
            }
           



        } else {
            window.common_user.consoleShow('----------查询数据为空---------');
        }

    } catch (e) {
        window.common_user.consoleShow('----------异常报错---------');
    }

}

// 渲染函数