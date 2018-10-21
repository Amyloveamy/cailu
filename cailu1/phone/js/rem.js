(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var isIPad = win.navigator.appVersion.match(/ipad/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    function IsPC()
    {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }
    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (IsPC() && width < 2047) {
            width = width > 540 ? 540 : width;
        }

        var rem = width / 7.5;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 14 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 14 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window, window['lib'] || (window['lib'] = {}));

var android = {
    dbOperation: function(sql_id, where) {
        var json = {};
        json.sql_id = sql_id;
        json.where = where;
        return uexPHYXAndroid.dbOperation(JSON.stringify(json));
    },
    SelectForMes: function(sql_id, where) {
            var json = {};
            json.sql_id = sql_id;
            var whereArray = [];
            whereArray.push(where);
            json.where = whereArray;
            return uexPHYXAndroid.SelectForMes(JSON.stringify(json));
        },
    Sele_Pcode: function(where) {
        var json = {};
        json.where = where;
        return uexPHYXAndroid.Sele_Pcode(JSON.stringify(json));
    },
    selPopWin: function(sql_id, where) {
        var json = {};
        json.sql_id = sql_id;
        json.where = where;
        return uexPHYXAndroid.selPopWin(JSON.stringify(json));
    },
    seletUpDataJS: function(tableName, selectData, where) {
        var json = {};
        json.tableName = tableName;
        json.select = selectData;
        json.where = where;
        return uexPHYXAndroid.seletUpDataJS(JSON.stringify(json));
    },
    SetZtJS: function(tableName, where) {
        var json = {};
        json.tableName = tableName;
        json.where = where;
        return uexPHYXAndroid.SetZtJS(JSON.stringify(json));
    },
    inseltDataJS: function(sql_id, name, value) {
        var json = {};
        json.sql_id = sql_id;
        json.name = name;
        json.value = value;
        return uexPHYXAndroid.inseltDataJS(JSON.stringify(json));
    },
    seletDataJS: function(sql_id, value) {
        var json = {};
        json.sql_id = sql_id;
        json.value = value;
        var result = uexPHYXAndroid.seletDataJS(JSON.stringify(json));
        // console.log("result : " + result);
        return result;
    },
    deletDataJS: function(sql_id, value) {
        var json = {};
        json.sql_id = sql_id;
        json.value = value;
        return uexPHYXAndroid.deletDataJS(JSON.stringify(json));
    },
    updataDataJS: function(sql_id, name, value, where) {
        var json = {};
        json.sql_id = sql_id;
        json.name = name;
        json.value = value;
        json.where = where;
        return uexPHYXAndroid.updataDataJS(JSON.stringify(json));
    },
    seletKeyData: function(sql_id, where) {
        var json = {};
        json.sql_id = sql_id;
        json.where = where;
        return uexPHYXAndroid.seletKeyData(JSON.stringify(json));
    },

    updataKeyData: function(sql_id, name, value, where) {
        var json = {};
        json.sql_id = sql_id;
        json.name = name;
        json.value = value;
        json.where = where;
        return uexPHYXAndroid.updataKeyData(JSON.stringify(json));
    },
    deletKeyData: function(sql_id, where) {
        var json = {};
        json.sql_id = sql_id;
        json.where = where;
        return uexPHYXAndroid.deletKeyData(JSON.stringify(json));
    },
    insertLoginDBDataJS:function (sql_id, name,value) {
        var json = {};
        json.sql_id = sql_id;
        json.value = value;
        json.name = name;
        return uexPHYXAndroid.insertLoginDBDataJS(JSON.stringify(json));
    },
    updataLoginDBDataJS: function(sql_id, name,value,where) {
        var json = {};
        json.sql_id = sql_id;
        json.value = value;
        json.name = name;
        json.where = where;
        return uexPHYXAndroid.updataLoginDBDataJS(JSON.stringify(json));
    },
    seletLoginDBDataJS: function(sql_id, value) {
        var json = {};
        json.sql_id = sql_id;
        json.value = value;
        return uexPHYXAndroid.seletLoginDBDataJS(JSON.stringify(json));
    },
    deleteLoginDBDataJS: function(sql_id, value) {
        var json = {};
        json.sql_id = sql_id;
        json.value = value;
        return uexPHYXAndroid.deleteLoginDBDataJS(JSON.stringify(json));
    },
    seletWorkNoticesJS: function(sql_id, value) {
        var json = {};
        json.sql_id = sql_id;
        json.value = value;
        return uexPHYXAndroid.seletWorkNoticesJS(JSON.stringify(json));
    },
    seletDBNameJS: function(sql_id, where) {
        var json = {};
        json.sql_id = sql_id;
        json.where = where;
        return uexPHYXAndroid.seletDBNameJS(JSON.stringify(json));
    },
    seletPadCommonJS: function(sql_id, where) {
        var json = {};
        json.sql_id = sql_id;
        json.where = where;
        return uexPHYXAndroid.seletPadCommonJS(JSON.stringify(json));
    },
    httpServer: function(code, data) {
        var json = {};
        json.code = code;
        json.data = data;
        uexPHYXAndroid.httpServer(JSON.stringify(json),function(data ){
                // console.log(data.response);
                BZYD.returnHttpServerData(data.response);
        });
    },
    httpServerTwo: function(code,data,path) {
        var json = {};
        json.code = code;
        json.data = data;
        json.path = path;
        uexPHYXAndroid.httpServerTwo(JSON.stringify(json),function(data ){
                // console.log(data.response);
                eval("javascript:aaa" + data.path + "bbb('" + data.response + "')");
        });
    },
    //去除第一个参数code 
    httpServerUpload: function(data,path) {
            var json = {};
//            json.code = code;
            json.data = data;
            json.path = path;
            uexPHYXAndroid.httpServerUpload(JSON.stringify(json),function(data ){
                    // console.log(data.response);
                    eval("javascript:BZYD.returnHttpServerData('" + data.response+ "')");
            });
    },

    ImagePath: function(str){
        var arr = [];
        arr.push(str);
        return uexPHYXAndroid.imagePath(arr);
    },

    videoPath: function(){
        return uexPHYXAndroid.videoPath();
    },

    soundPath: function(){
        return uexPHYXAndroid.soundPath();
    },

    loginExit: function(){
        uexPHYXAndroid.loginExit();
    },

    encrypt: function(data){
        var json = {};
        json.data = data;
        return uexPHYXAndroid.encrypt(JSON.stringify(json));
    },

    decrypt: function(data){
        var json = {};
        json.data = data;
        return uexPHYXAndroid.decrypt(JSON.stringify(json));
    },

    doCheck: function(data,sign){
        var json = {};
        json.data = data;
        json.sign = sign;
        return uexPHYXAndroid.doCheck(JSON.stringify(json));
    },

    getLocation: function(){
        return uexPHYXAndroid.getPosition();
    },

    getPosition: function(){
            return uexPHYXAndroid.getPosition();
    },

    getMessageStatus: function(){
        return uexPHYXAndroid.getMessageStatus();
    },

    takephoto: function(path){
        var json = {};
        json.path = path;
        uexPHYXAndroid.onDeletePic = function(path){
            // console.log("onDeletePic : " + data);
            eval("javascript:removeFile('" + path + "')");
        }
        uexPHYXAndroid.takePhoto(JSON.stringify(json),function(data){
            // console.log("takePhoto : " + data);
            eval("javascript:returnPath(1)");
            eval("javascript:erjinzhi('" + data.fileString + "')");
        });
    },

    takesound: function(path){
        var json = {};
        json.path = path;
        uexPHYXAndroid.takeSound(JSON.stringify(json),function(data){
            eval("javascript:returnPath(2)");
        });
    },

    soundFile: function(path){
        var json = {};
        json.path = path;
        uexPHYXAndroid.soundFile(JSON.stringify(json));
    },

    picFile: function(path){
        var json = {};
        json.path = path;
        uexPHYXAndroid.onDeletePic = function(path){
            eval("javascript:removeFile('" + path + "')");
        }
        uexPHYXAndroid.picFile(JSON.stringify(json));
    },

    takevideo: function(path,name){
        var json = {};
        json.path = path;
        json.name = name;
        uexPHYXAndroid.takeVideo(JSON.stringify(json),function(data){
            eval("javascript:returnPath(3)");
        });
    },

    videoFile: function(path){
        var json = {};
        json.path = path;
        uexPHYXAndroid.videoFile(JSON.stringify(json));
    },

    FileDialog: function(path){
        var json = {};
        json.path = path;
        uexPHYXAndroid.fileDialog(JSON.stringify(json));
    },

    show: function(text){
        // window.uexOnload=function () {
            // console.log(text);
            uexPHYXAndroid.show(text);
        // }

    },

    saveWebViewPic: function(name){
        var json = {};
        json.name = name;
        uexPHYXAndroid.saveWebViewPic(JSON.stringify(json));
    },

    presentPic: function(name){
        var json = {};
        json.name = name;
        return uexPHYXAndroid.presentPic(JSON.stringify(json));
    },

    putBoolean: function(key,value){
        var json = {};
        json.key = key;
        json.value = value;
        uexPHYXAndroid.putBoolean(JSON.stringify(json));
    },

    getBoolean: function(key,defValue){
        var json = {};
        json.key = key;
        json.defValue = defValue;
        return uexPHYXAndroid.getBoolean(JSON.stringify(json));
    },

    putString: function(key,value){
        var json = {};
        json.key = key;
        json.value = value;
        uexPHYXAndroid.putString(JSON.stringify(json));
    },

    getString: function(key,defValue){
        var json = {};
        json.key = key;
        json.defValue = defValue;
        return uexPHYXAndroid.getString(JSON.stringify(json));
    },

    putInt: function(key,value){
        var json = {};
        json.key = key;
        json.value = value;
        uexPHYXAndroid.putInt(JSON.stringify(json));
    },

    getInt: function(key,defValue){
        var json = {};
        json.key = key;
        json.defValue = defValue;
        return uexPHYXAndroid.getInt(JSON.stringify(json));
    },

    putLong: function(key,value){
        var json = {};
        json.key = key;
        json.value = value;
        uexPHYXAndroid.putLong(JSON.stringify(json));
    },

    getLong: function(key,defValue){
        var json = {};
        json.key = key;
        json.defValue = defValue;
        return uexPHYXAndroid.getLong(JSON.stringify(json));
    },

    bluetoothEnabled: function(){
        return uexPHYXAndroid.bluetoothEnabled();
    },

    openBluetooth: function(){
        uexPHYXAndroid.openBluetooth();
    },

    blueToothServiceStart: function(){
        uexPHYXAndroid.blueToothServiceStart();
    },

    tologin: function(){
        uexPHYXAndroid.toLogin();
    },

    doLoading:function () {
        return uexPHYXAndroid.doLoading();
    },

    StringEncrypt:function (str) {
        return uexPHYXAndroid.StringEncrypt(str);
    },

    StringDecrypt:function (str) {
        return uexPHYXAndroid.StringDecrypt(str);
    },
    cbLoad:function () {
        uexPHYXAndroid.cbLoad();
    },
    newtakesound:function (path) {
        var json = {};
        json.path = path;
        uexPHYXAndroid.newtakesound(JSON.stringify(json),function(data){
            eval("javascript:returnPath(2)");
        });
    },
    newtakevideo: function(path,name){
        var json = {};
        window.android.show("path=================>"+path);
        json.path = path;
        json.name = name;
        uexPHYXAndroid.newtakevideo(JSON.stringify(json),function(data){
            eval("javascript:returnPath(3)");
        });
    },
    getIMEI:function () {
        return uexPHYXAndroid.getIMEI();
    },
    setHttpServer:function(){
        uexPHYXAndroid.setHttpServer();
    },
    baseSixfour:function(str){
        var arr = [];
        arr.push(str);
        return uexPHYXAndroid.FileToBase64(arr);
    }
}
