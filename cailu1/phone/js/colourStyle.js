// 适用于待办已办
function colourStyle () {
  $('.one').each(function (index, el) {
    var btn = $(el).find('.btn');
    var text = btn[0].innerText;
    if ( text == '签收' ) {
      btn.css('background', '#555');
    }
    if ( text == '在办' ) {
      btn.css('background', '#f6ab00');
      
    }
    if ( text == '完成' ) {
      btn.css('background', '#039c7e');
      
    }
    if ( text == '部分未上传' || text == '已处理工单' ) {
      btn.css('background', '#e54c4f');
      
    }
    window.android.show("这是改颜色的")
  });
}

/*function conditions(json){

        var returnCode = json['returnCode'];

        // returnCode=1000，对下面的数据可以保存数据库，其中增加zt=‘04’这条信息；
        // returnCode=1001，不对下面的数据进行保存数据库
        // returnCode=1111：工单不在当前环节，更改AydzyWorkNotices表中的listStatus=05，并向后台发送工单状态变更（ydzyWorkTranStyle，status=‘06’）设置；
        if (returnCode == 1000) {
            var listS = '02';
        }else if (returnCode == 1001) {
            var listS = '03';
            mui.alert('此条无数据');
            return;
        }else if (returnCode == 1111) {
            var objone15 = {
                "activNo": activNo,
                "appNo": appNo,
                "status":"06"
            };
            window.android.updataDataJS('30561', ['listStatus'], ['05'], [appNo, activNo]); //修改表的字段-->
            var data15 = BZYD.data("ydzyWorkTranStyle", objone15);
            var data15 = JSON.stringify(data15);
            window.android.httpServer("ydzyWorkTranStyle", data15);
            window.android.show("工单异常请求接口成功");
            // 关闭遮罩层
            $('.dialog').hide();
            mui.alert("工单异常");
            return;
        }else{
            // 关闭遮罩层
            $('.dialog').hide();
            mui.alert('下载失败');
            return;
        }
}*/

/*function castAbout(){
        var conditions = $('.conditions option:selected').val();//搜索条件\ 0户名 1户号 2抄表段编号 3抄表顺序号
        var hunts = $('.hunts').val();// 搜索框内容
        $('.one').each(function(index, el) {
            $(el).
        });
}*/
function isGrabbles () {// 工单页搜索  抄表段编号/任务编号
  /*var arrAppNo = [];
  var arrMrSectNo = [];*/
 //定义一个变量来判断是否弹出查询结果不存在
 var tan=false
  var grabbles = $('.grabbles').val();// 搜索框内容
  if ( !grabbles ) {
    $('.one').each(function (index, el) {
      $(el).css('display', 'block');// 隐藏全部one元素
    });
   return;
  }
  ;
  window.android.show(grabbles + '');
  $('.one').each(function (index, el) {
    $(el).css('display', 'none');// 隐藏全部one元素
    tan=false
  });
  $('.one').each(function (index, el) {
    var appNo = $(el).find('.appNo').text();
    var mrSectNo = $(el).find('.mrSectNo').text();
    if ( appNo == grabbles || mrSectNo == grabbles ) {
      $(el).css('display', 'block');
      tan=true
    }
    ;
    
  });
  if(tan==false){
  	mui.alert('查询结果不存在')
  }
}

function isGrabblesr () {// 工单页搜索(停电)  抄表段编号/任务编号
  /*var arrAppNo = [];
  var arrMrSectNo = [];*/
 var  panduan=false;
  var grabbles = $('.grabbles').val();// 搜索框内容
  if ( !grabbles ) {
    $('.one').each(function (index, el) {
      $(el).css('display', 'block');// 隐藏全部one元素
    });
    return;
  }
  ;
  window.android.show(grabbles + '');
  $('.one').each(function (index, el) {
    $(el).css('display', 'none');// 隐藏全部one元素
    panduan=false
  });
  $('.one').each(function (index, el) {
    var appNo = $(el).find('.appNo').text();
    if ( appNo == grabbles ) {
      $(el).css('display', 'block');
      panduan=true
    }
    ;
    
  });
  if(panduan=='false'){
  	mui.alert('查询的工单不存在')
  }
}

function isGrabbles_one () {// 列表页搜索  户名/户号/抄表顺序号
  var hunts = $('.hunts').val();// 搜索框内容
  if ( !hunts ) {
    $('.one').each(function (index, el) {
      $(el).css('display', 'block');// 隐藏全部one元素
    });
    return;
  }
  ;
  window.android.show(hunts + '');
  $('.one').each(function (index, el) {
    $(el).css('display', 'none');// 隐藏全部one元素
  });
  $('.one').each(function (index, el) {
    var consName = $(el).find('.consName').text();//户名
    var consNo = $(el).find('.consNo').text();//户号
    var mrSn = $(el).find('.mrSn').text();//抄表顺序号
    if ( consName == hunts || consNo == hunts || mrSn == hunts ) {
      $(el).css('display', 'block');
    }
    ;
    
  });
}

function isGrabbles_two () {// 列表页搜索  户名/户号  结构是span
  var hunts = $('.hunts').val();// 搜索框内容
  if ( !hunts ) {
    $('.one').each(function (index, el) {
      $(el).css('display', 'block');// 隐藏全部one元素
    });
    return;
  }
  ;
  window.android.show(hunts + '');
  $('.one').each(function (index, el) {
    $(el).css('display', 'none');// 隐藏全部one元素
  });
  $('.one').each(function (index, el) {
    var consName = $(el).find('.consName').text();//户名
    var consNo = $(el).find('.consNo').text();//户号
    if ( consName == hunts || consNo == hunts ) {
      $(el).css('display', 'block');
    }
    ;
    
  });
}

function isGrabbles_three () {// 列表页搜索  户名/户号/抄表顺序号 结构是div
  $('.one').show();
  var hunts = $('.hunts').val(),
    status = true;// 搜索框内容
  // if (!hunts) {
  //     $('.one').each(function(index, el) {
  //         $(el).css('display', 'block');// 隐藏全部one元素
  //     });
  //     return;
  // };
  //window.android.show(hunts+'');
  // $('.one').each(function(index, el) {
  //     $(el).css('display', 'none');// 隐藏全部one元素
  // });
  $('.one').each(function (i, item) {
    var consName = $(item).attr('data-consName');//户名
    var consNo = $(item).attr('data-consNo');//户号
    var mrSn = $(item).attr('data-mrSn');//抄表顺序号
    if ( hunts && (consName == hunts || consNo == hunts || mrSn == hunts) ) {
      $(item).show();
      status = false;
    } else {
      $(item).hide();
    }
  });
  if ( status ) {
    mui.alert('未找到数据');
    $('.one').show();
  }
}

function isGrabbles_four () {// 列表页搜索  户名/户号/抄表顺序号 结构是div
  var hunts = $('.hunts').val();// 搜索框内容
  if ( !hunts ) {
    $('.one').each(function (index, el) {
      $(el).css('display', 'block');// 隐藏全部one元素
    });
    return;
  }
  ;
  //window.android.show(hunts+'');
  $('.one').each(function (index, el) {
    $(el).css('display', 'none');// 隐藏全部one元素
  });
  $('.one').each(function (index, el) {
    var consName = $(el).attr('data-consName');//户名
    var mrSn = $(el).attr('data-mrSn');//抄表顺序号
    var consNo = $(el).attr('data-consNo');//户号
    window.android.show(mrSn + '------' + consNo);
    if ( consName == hunts || consNo == hunts || mrSn == hunts ) {
      $(el).css('display', 'block');
    }
    ;
    
  });
}

// 用户列表根据下拉框值排序
function isListSort () {
  var sorts = $('.sorts').val();// 下拉框值  0户名  1户号  2抄表段编号  3抄表顺序号
  if ( sorts == '0' ) {
    ranks('[data-consName]');
  } else if ( sorts == '1' ) {
    ranks('[data-consNo]');
  } else if ( sorts == '2' ) {
    ranks('[data-sectNo]');
  } else if ( sorts == '3' ) {
    ranks('[data-mrSn]');
  }
  
};

function ranks (myCons) { // myCons 自定义属性  '[data-***]'
  var consArr = [];
  $('.one').each(function (index, el) {
    var isCons = $(el).attr(myCons);
    consArr.push(isCons);
  });
  consArr.sort(function (a, b) {
    return a - b;
  });
  $('.one').each(function (index, el) {
    var isCons = $(el).attr('isCons');
    for ( var i = 0; i < consArr.length; i++ ) {
      if ( consArr[i] == isCons ) {
        $('.lianxi').append($(el));
      }
      ;
    }
    ;
  });
}