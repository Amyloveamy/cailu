/**
 * Created by angel on 2017/7/14.
 */

/*
 * 使用： P_code
 *  $('#second').click(function () {
 P_code("spTypeCode", '#second');
 if(!$(this).hasClass('firstClick')){
 $(this).addClass('firstClick').click();
 }
 });
 P_org  供电单位   只需要传一个ID 用来接收就行
 $('#second').click(function () {
 P_org('#second');
 if(!$(this).hasClass('firstClick')){
 $(this).addClass('firstClick').click();
 }
 });
 * 第八行选择器为ID，标签为span
 * 第九行 函数第一个参数为请求类型，第二个为接受结果的span标签的id，也就是第八行的id
 * 10，11行是为了判断是否为第一次点击，没有意义，但是需要写
 *
 *编码值在自定义属性 tree_value 中
 *
 * */
function P_code(selType, selClick, ORG_NO) {
    window.sessionStorage.removeItem('treeValueCode');
    var img1 = "data:images/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAxklEQVRYCe3Bu0oDQRQA0LtZ2T88hXaBVCkULURFRItUAUUbm0AKhSiBNMnnhRktLER85LFi4ZwTURRFURR/ycRerMiuSazL3FI3VqBraR7r0lhIevEDPclCE+vTmEn68Q19yUwTm9GYSg7iC/YlU01sTu1JdhSfcCh5thPbUXuQncQHjmWP6tie2lh2Ee84l43V0Q4dI9lVvHEpG+lEe1TuZYN4ZSC7V0W7VG5lQ0PZnSrap3Ity25U8VucOouiKIqi+IdeAPBwThhsFvJLAAAAAElFTkSuQmCC",
        img2 = "data:images/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAxUlEQVRYhe3NuwrCQBSE4U0iecO/0E6wslC0EBURLawCijY2gRQKKkKa+Hiyx04Qb7mCwvm63TPMGKOUUkr9HkaMqyt3WCIIK5xq6tcIAQHCpvQJHLYIC2OMYYGwLXUClxBhfn/PEELcsuo9IoTpw98EIcIrp36HMHz6HyDsC0/gcUTov7z1sJyoFan3OWPpvr13sJzx89fHWNofM20sca4JfC5YWl9zLSyXHBMkXGmmSja5kmQfONBIna1zyDyglFJK/ZUbT91OGLwt5QgAAAAASUVORK5CYII=",
        img3 = "data:images/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA70lEQVRYw+3XS04CURSEYVbi+wmkfUEQXbOJi9GJA0VRlFaxdQOfA9JGF1DtpGsBf+Xem1unTqfTqtW/SmHiMofvK3GTwveUmOtm8F1zlHoZ/L4XlPoZ/J7nLH6GUpHB75rh1UEGv+MJbw4z+G2PeHeUwW+ZYuE4g980xYeTDH7DAyqDDH7dPSrDDH7NBJVRBr/qDpXTDH7FLSrjVCRf49NZbqRc4ct5zmB5RdEz1I88zluMchb1TxjmLOq/PMhZLNMoFXa/8nSRtMhOhAZmWgNTuYFe8ad4FTmLbHVsoPw2UN8bWEB+VqiLdpVsldY3hJ0ZKAqSopcAAAAASUVORK5CYII=";

    function treeInquire(typeCode, valueCode) {
        var treeStr = window.android.selPopWin('30007', [typeCode, valueCode]);
        return treeStr;
    }

    function treeInquireBusi(typeCode, valueCode) {
        var treeStr = window.android.selPopWin('300071', [typeCode, valueCode]);
        return treeStr;
    }

    $('body').append('<div class = "tree_dialog">' +
        '<div class="topBar">' +
        '<div class="return_after">' +
        '<img src="' + img3 + '" />' +
        '<span>返回</span>' +
        '</div>' +
        '</div>' +
        '<ul>' +
        '</ul>' +
        '</div>');
    $(selClick).click(function() {
        var str = "";
        if (ORG_NO) {
            if (selType === "busiMagReg") {
                str = treeInquireBusi(selType, ORG_NO);
                window.android.show(str);
                if (str === "selet_null" || str === "null") {
                    str = treeInquire(selType, '999999');
                }
            } else {
                str = treeInquire(selType, ORG_NO);
            }
        } else {
            str = treeInquire(selType, '999999');
        }
        var tree = JSON.parse(str),
            tree_array = tree.data,
            arr = [];
        $('.tree_dialog').show().find('ul').html('');
        for (var i in tree_array) {
            var tree_value = tree_array[i].VALUE,
                tree_name = tree_array[i].NAME,
                tree_second = treeInquire(selType, tree_value);
            if (tree_second !== 'null') {
                $('.tree_dialog').show().find('ul').append('<li class="first_li">' +
                    '<div tree_value="' + tree_value + '">' +
                    '<span>' + tree_name + '</span>' +
                    '<p class="show_children">' +
                    '<span>展开</span>' +
                    '<img src="' + img1 + '"/>' +
                    '</p>' +
                    '</div>' +
                    '</li>');
            } else {
                $('.tree_dialog').show().find('ul').append('<li>' +
                    '<div tree_value="' + tree_value + '">' +
                    '<span>' + tree_name + '</span>' +
                    '</div>' +
                    '</li>');
            }
        }
    });
    $('.tree_dialog').on('click', '.show_children', function(event) {
        event.stopPropagation();
        if ($(this).parents('li:first').has('ul').length) {
            $(this).toggleClass('tree_show').parent().siblings('ul').slideToggle(300);
            if ($(this).hasClass('tree_show')) {
                $(this).children('img').attr('src', img1);
                if ($(this).parents('li:first').hasClass('first_li')) {
                    $(this).parents('li:first').find('span:first').css('color', '#555');
                } else {
                    $(this).parents('li:first').find('span:first').css('color', '#555');
                }
            } else {
                $(this).children('img').attr('src', img2);
                if ($(this).parents('li:first').hasClass('first_li')) {
                    $(this).parents('li:first').find('span:first').css('color', '#009c84');
                } else {
                    $(this).parents('li:first').find('span:first').css('color', '#009c84');
                }

            }
        } else {
            $(this).children('img').attr('src', img2);
            var tree_value = $(this).parent().attr('tree_value'),
                str = treeInquire(selType, tree_value),
                tree = JSON.parse(str),
                tree_array = tree.data;
            $(this).parents('li:first').append('<ul></ul>');
            if ($(this).parents('li:first').hasClass('first_li')) {
                $(this).parents('li:first').find('span:first').css('color', '#009c84');
            } else {
                $(this).parents('li:first').find('span:first').css('color', '#009c84');
            }
            for (var i in tree_array) {
                var tree_value = tree_array[i].VALUE,
                    tree_name = tree_array[i].NAME,
                    tree_second = treeInquire(selType, tree_value);
                if (tree_second !== 'null') {
                    $(this).parents('li:first').find('ul').append(
                        '<li>' +
                        '<div tree_value="' + tree_value + '">' +
                        '<span>' + tree_name + '</span>' +
                        '<p class="show_children">' +
                        '<span>展开</span>' +
                        '<img src="' + img1 + '" />' +
                        '</p>' +
                        '</div>' +
                        '</li>');
                } else {
                    $(this).parents('li:first').children('ul').append('<li>' +
                        '<div tree_value="' + tree_value + '">' +
                        '<span>' + tree_name + '</span>' +
                        '</div>' +
                        '</li>');
                }
            }
        }
    });
    var returnCode = {};
    $('.tree_dialog').on('click', 'li', function(event) {
        event.stopPropagation();
        returnCode.returnName = $(this).find('span:first').text();
        returnCode.returnValue = $(this).find('div:first').attr('tree_value');
        $(selClick).attr('tree_value', returnCode.returnValue).text(returnCode.returnName);
        window.android.show($(selClick).attr('tree_value'));
        window.sessionStorage.setItem('treeValueCode', $(selClick).attr('tree_value'));
        $('.tree_dialog').remove();

    });
    $('.tree_dialog').on('click', '.return_after', function() {
        $('.tree_dialog').remove();
    });

}

function P_org(selClick, ORG_NO) {
    window.sessionStorage.removeItem('treeValueCode');
    var img1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAxklEQVRYCe3Bu0oDQRQA0LtZ2T88hXaBVCkULURFRItUAUUbm0AKhSiBNMnnhRktLER85LFi4ZwTURRFURR/ycRerMiuSazL3FI3VqBraR7r0lhIevEDPclCE+vTmEn68Q19yUwTm9GYSg7iC/YlU01sTu1JdhSfcCh5thPbUXuQncQHjmWP6tie2lh2Ee84l43V0Q4dI9lVvHEpG+lEe1TuZYN4ZSC7V0W7VG5lQ0PZnSrap3Ity25U8VucOouiKIqi+IdeAPBwThhsFvJLAAAAAElFTkSuQmCC",
        img2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAxUlEQVRYhe3NuwrCQBSE4U0iecO/0E6wslC0EBURLawCijY2gRQKKkKa+Hiyx04Qb7mCwvm63TPMGKOUUkr9HkaMqyt3WCIIK5xq6tcIAQHCpvQJHLYIC2OMYYGwLXUClxBhfn/PEELcsuo9IoTpw98EIcIrp36HMHz6HyDsC0/gcUTov7z1sJyoFan3OWPpvr13sJzx89fHWNofM20sca4JfC5YWl9zLSyXHBMkXGmmSja5kmQfONBIna1zyDyglFJK/ZUbT91OGLwt5QgAAAAASUVORK5CYII=",
        img3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA70lEQVRYw+3XS04CURSEYVbi+wmkfUEQXbOJi9GJA0VRlFaxdQOfA9JGF1DtpGsBf+Xem1unTqfTqtW/SmHiMofvK3GTwveUmOtm8F1zlHoZ/L4XlPoZ/J7nLH6GUpHB75rh1UEGv+MJbw4z+G2PeHeUwW+ZYuE4g980xYeTDH7DAyqDDH7dPSrDDH7NBJVRBr/qDpXTDH7FLSrjVCRf49NZbqRc4ct5zmB5RdEz1I88zluMchb1TxjmLOq/PMhZLNMoFXa/8nSRtMhOhAZmWgNTuYFe8ad4FTmLbHVsoPw2UN8bWEB+VqiLdpVsldY3hJ0ZKAqSopcAAAAASUVORK5CYII=";

    function treeInquire(typeCode, valueCode) {
        var treeStr = window.android.selPopWin(typeCode, [valueCode]);
        return treeStr;
    }

    $('body').append('<div class = "tree_dialog">' +
        '<div class="topBar">' +
        '<div class="return_after">' +
        '<img src="' + img3 + '" />' +
        '<span>返回</span>' +
        '</div>' +
        '</div>' +
        '<ul>' +
        '</ul>' +
        '</div>');
    $(selClick).click(function() {
        var str = "";
        if (ORG_NO) {
            str = treeInquire('300010', ORG_NO);
        } else {
            str = treeInquire('30008', '02');
        }
        var tree = JSON.parse(str),
            tree_array = tree.data,
            arr = [];
        $('.tree_dialog').show().find('ul').html('');
        for (var i in tree_array) {
            var tree_value = tree_array[i].ORG_NO,
                tree_name = tree_array[i].ORG_NAME,
                tree_second = treeInquire('30009', tree_value);
            if (tree_second !== 'null') {
                $('.tree_dialog').show().find('ul').append('<li class="first_li">' +
                    '<div tree_value="' + tree_value + '">' +
                    '<span class="ooo">' + tree_name + '</span>' +
                    '<p class="show_children">' +
                    '<span>展开</span>' +
                    '<img src="' + img1 + '"/>' +
                    '</p>' +
                    '</div>' +
                    '</li>');
            } else {
                $('.tree_dialog').show().find('ul').prepend('<li>' +
                    '<div tree_value="' + tree_value + '">' +
                    '<span class="ooo">' + tree_name + '</span>' +
                    '</div>' +
                    '</li>');
            }
        }
    });
    $('.tree_dialog').on('click', '.show_children', function(event) {
        event.stopPropagation();
        if ($(this).parents('li:first').has('ul').length) {
            $(this).toggleClass('tree_show').parent().siblings('ul').slideToggle(300);
            if ($(this).hasClass('tree_show')) {
                $(this).children('img').attr('src', img1);
                if ($(this).parents('li:first').hasClass('first_li')) {
                    $(this).parents('li:first').find('span:first').css('color', '#555');
                } else {
                    $(this).parents('li:first').find('span:first').css('color', '#555');
                }
            } else {
                $(this).children('img').attr('src', img2);
                if ($(this).parents('li:first').hasClass('first_li')) {
                    $(this).parents('li:first').find('span:first').css('color', '#009c84');
                } else {
                    $(this).parents('li:first').find('span:first').css('color', '#009c84');
                }

            }
        } else {
            $(this).children('img').attr('src', img2);
            window.android.show($(this).parent().attr('tree_value'));
            var tree_value = $(this).parent().attr('tree_value'),
                str = treeInquire('30009', tree_value),
                tree = JSON.parse(str),
                tree_array = tree.data;
            $(this).parents('li:first').append('<ul></ul>');
            if ($(this).parents('li:first').hasClass('first_li')) {
                $(this).parents('li:first').find('span:first').css('color', '#009c84');
            } else {
                $(this).parents('li:first').find('span:first').css('color', '#009c84');
            }
            for (var i in tree_array) {
                var tree_value = tree_array[i].ORG_NO,
                    tree_name = tree_array[i].ORG_NAME,
                    tree_second = treeInquire('30009', tree_value);
                if (tree_second !== 'null') {
                    $(this).parents('li:first').find('ul').append(
                        '<li>' +
                        '<div tree_value="' + tree_value + '" class="qqq">' +
                        '<span  class="ooo">' + tree_name + '</span>' +
                        '<p class="show_children">' +
                        '<span>展开</span>' +
                        '<img src="' + img1 + '" />' +
                        '</p>' +
                        '</div>' +
                        '</li>');
                } else {
                    $(this).parents('li:first').children('ul').prepend('<li>' +
                        '<div tree_value="' + tree_value + '">' +
                        '<span class="ooo">' + tree_name + '</span>' +
                        '</div>' +
                        '</li>');
                }
            }
        }
    });
    var returnCode = {};
    $('.tree_dialog').on('click', 'li', function(event) {
        event.stopPropagation();
        returnCode.returnName = $(this).find('span:first').text();
        returnCode.returnValue = $(this).find('div:first').attr('tree_value');
        $(selClick).attr('tree_value', returnCode.returnValue).text(returnCode.returnName);
        window.android.show($(selClick).attr('tree_value'));
        window.sessionStorage.setItem('treeValueCode', $(selClick).attr('tree_value'));
        $('.tree_dialog').remove();
    });
    $('.tree_dialog').on('click', '.return_after', function() {
        $('.tree_dialog').remove();
    });
}


/*
 * url 参数获取
 * */
function GetQueryString(name) { // url参数获取函数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    // if (r === null && window.uexOnload) {
    //     var str = uexWindow.getUrlQuery();
    //     var t = str.match(reg);
    //     if (t !== null) return unescape(t[2]);
    // }
    return null;
}