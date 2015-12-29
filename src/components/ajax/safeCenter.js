var Dir = require('./dir.js').default;
$.ajaxSetup({
    dataType: "json"
});

var safeCenter = {
    getMobileVerifyCode(mobile, isRegister, cb){
        $.ajax({
            url: Dir + '/security/getMobileVerifyCode',
            data: {mobile: mobile, isRegister: isRegister}
        }).done(function (data) {
            cb(data)
        });
    },
    verifyCode(mobile, code,isRegister,cb){
        $.ajax({
            url: Dir + '/security/verifyCode',
            data: {mobile: mobile, code: code,isRegister:isRegister}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.isLegal)
            } else {
                alert(data.msg);
            }
        });
    },
    mobileVerify(mobile, code, cb){
        $.ajax({
            url: Dir + '/member/mobileVerify',
            type: 'post',
            data: {mobile: mobile, code: code}
        }).done(function (data) {
            cb(data)
        });
    },
    emailVerify(email, cb){
        $.ajax({
            url: Dir + '/member/emailVerify',
            type: 'post',
            data: {email: email}
        }).done(function (data) {
            cb(data)
        });
    },
    emailVerifyCode(memberId, code, cb){
        $.ajax({
            url: Dir + '/security/emailVerify',
            type: 'post',
            data: {memberId: memberId, code: code}
        }).done(function (data) {
            cb(data);
        });
    },
    modifyPwd(oldPass, newPass, cb){
        $.ajax({
            url: Dir + '/member/modifyPwd',
            type: 'post',
            data: {oldPass: oldPass, newPass: newPass}
        }).done(function (data) {
            if (data.flag === 1) {
                cb();
            } else {
                alert(data.msg);
            }
        });
    },
    verifyPassword(password, cb){
        $.ajax({
            url: Dir + '/member/verifyPassword',
            data: {password: password}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.isLegal);
            } else {
                alert(data.msg);
            }
        });
    },
    mobileModify(password, mobile, code, cb){
        $.ajax({
            url: Dir + '/member/mobileModify',
            type: 'post',
            data: {password: password, mobile: mobile, code: code}
        }).done(function (data) {
            if (data.flag === 1) {
                cb();
            } else {
                alert(data.msg);
            }
        });
    },
    emailModify(password, email, cb){
        $.ajax({
            url: Dir + '/member/emailModify',
            type: 'post',
            data: {password: password, email: email}
        }).done(function (data) {
            cb(data);
        });
    },
    findPasswordByMobile(mobile, code, password, cb){
        $.ajax({
            url: Dir + '/security/findPasswordByMobile',
            type: 'post',
            data: {password: password, code: code, mobile: mobile}
        }).done(function (data) {
            if (data.flag === 1) {
                cb();
            } else {
                alert(data.msg);
            }
        });
    },
    findPasswordByEmail(email, cb){
        $.ajax({
            url: Dir + '/security/findPasswordByEmail',
            type: 'post',
            data: {email: email}
        }).done(function (data) {
            cb(data);
        });
    },
    findPwdFromEmailVerify(code, cb){
        $.ajax({
            url: Dir + '/security/findPwdFromEmailVerify',
            type: 'post',
            data: {code: code}
        }).done(function (data) {
            cb(data);
        });
    },
    findPwdFromEmail(code, password, cb){
        $.ajax({
            url: Dir + '/security/findPwdFromEmail',
            type: 'post',
            data: {code: code, password: password}
        }).done(function (data) {
            cb(data);
        });
    },
    securityCenter(cb){
        $.ajax({
            url: Dir + '/member/securityCenter'
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.securityData);
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    }
};
exports['default'] = safeCenter;