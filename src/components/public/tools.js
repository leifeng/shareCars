var tool = {
    getCookie(name){
        var _cookie = document.cookie;
        var arrCookie = _cookie.split("; ");
        var val = '';
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (name == arr[0]) {
                if (arr[1]) {
                    val = arr[1];
                    break;
                }

            }
        }
        return val;
    },
    getQuery(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return encodeURI(r[2]);
        return null;
    },
    on(obj, etype, handle){
        if (obj.addListener) {
            obj.addListeners(etype, handle, false)
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + etype, handle)
        } else {
            obj['on' + etype] = handle;
        }
    },
    off(obj, etype, handle){
        if (obj.removeEventListener) {
            obj.removeEventListener(etype, handle, false);
        } else if (obj.detachEvent) {
            obj.detachEvent('on' + etype, handle);
        } else {
            obj['on' + etype] = null;
        }
    }
};
exports['default'] = tool;