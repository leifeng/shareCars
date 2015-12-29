var Dir = require('./dir.js').default;
$.ajaxSetup({
    dataType: "json"
});

var userManage = {
    login(userName, password, cb){
        $.ajax({
            url: Dir + '/login',
            type: 'post',
            data: {userName: userName, password: password}
        }).done(function (data) {
            cb(data.flag, data);
        });
    },
    logout(str, cb){
        $.ajax({
            url: Dir + '/logout',
            type: 'post',
            data: {callBack: str}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    },
    registerByAccount(userName, password, cb){
        $.ajax({
            url: Dir + '/registerByAccount',
            type: 'post',
            data: {userName: userName, password: password}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    },
    registerByMobile(mobile, password, code, cb){
        $.ajax({
            url: Dir + '/registerByMobile',
            type: 'post',
            data: {mobile: mobile, password: password, code: code}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    },
    isUserNameExist(userName, cb){
        $.ajax({
            url: Dir + '/uniqueVerify/isUserNameExist',
            data: {userName: userName}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.isExist)
            } else {
                alert(data.msg);
            }
        });
    },
    isMobileExist(mobile, cb){
        $.ajax({
            url: Dir + '/uniqueVerify/isMobileExist',
            data: {mobile: mobile}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.isExist)
            } else {
                alert(data.msg);
            }
        });
    },
    isEmailExist(email, cb){
        $.ajax({
            url: Dir + '/uniqueVerify/isEmailExist',
            data: {email: email}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.isExist)
            } else {
                alert(data.msg);
            }
        });
    },
    isIDExist(idNumber, cb){
        $.ajax({
            url: Dir + '/uniqueVerify/isIDExist',
            data: {idNumber: idNumber}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.isExist)
            } else {
                alert(data.msg);
            }
        });
    },
    uploadPhoto(cb){
        $.ajax({
            url: Dir + '/member/uploadPhoto',
            type: 'post',
            contentType: 'multipart/form-data'
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.imgId, data.imgPath);
            } else {
                alert(data.msg);
            }
        });
    },
    headPhoto(cb){
        $.ajax({
            url: Dir + '/member/headPhoto'
        }).done(function (data) {
            cb(data.flag, data.isIn, data.headPhoto);
        });
    },
    saveHeadPhoto(imgId, imgX, imgY, imgW, imgH, imgWidth, cb){
        $.ajax({
            url: Dir + '/member/savePhoto',
            type: 'post',
            data: {imgId: imgId, imgX: imgX, imgY: imgY, imgW: imgW, imgH: imgH, imgWidth: imgWidth}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data);
            } else {
                alert(data.msg);
            }
        });
    },
    userInfo(cb){
        $.ajax({
            url: Dir + '/member/userInfo'
        }).done(function (data) {
            cb(data);
        });
    },
    saveUserInfo(nickName, vName, qq, sex, age, province, city, county, address, cb){
        $.ajax({
            url: Dir + '/member/userInfo',
            type: 'post',
            data: {
                nickName: nickName,
                vName: vName,
                qq: qq,
                sex: sex,
                age: age,
                province: province,
                city: city,
                county: county,
                address: address
            }
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.user);
            } else {
                alert(data.msg);
            }
        });
    }
};
exports['default'] = userManage;