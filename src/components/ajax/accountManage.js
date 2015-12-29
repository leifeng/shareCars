var Dir = require('./dir.js').default;
$.ajaxSetup({
    dataType: "json"
});

var accountManage = {
    applyOpenService(idNumber, idFrontImgId, idBackImgId, driverImgId, areaCode, emergencyContact, emergencyTel, cb){
        $.ajax({
            url: Dir + '/account/applyOpenService',
            type: 'post',
            data: {
                idNumber: idNumber,
                idFrontImgId: idFrontImgId,
                idBackImgId: idBackImgId,
                driverImgId: driverImgId,
                areaCode: areaCode,
                emergencyContact: emergencyContact,
                emergencyTel: emergencyTel
            }
        }).done(function (data) {
            if (data.flag !== 0) {
                cb(data.flag)
            }
            else {
                alert(data.msg);
            }
        });
    },
    isMobileValidated(cb){
        $.ajax({
            url: Dir + '/member/isMobileValidated'
        }).done(function (data) {
            if (data.flag !== 0) {
                cb(data.flag, data.isValidated)
            } else {
                alert(data.msg);
            }
        });
    },
    savePhoto(imgId, imgX, imgY, imgW, imgH, imgWidth, cb){
        $.ajax({
            url: Dir + '/account/savePhoto',
            type: 'post',
            data: {imgId: imgId, imgX: imgX, imgY: imgY, imgW: imgW, imgH: imgH, imgWidth: imgWidth},
            dataType: 'json'
        }).done(function (data) {
            if (data.flag !== 0) {
                cb(data)
            }
            else {
                alert(data.msg);
            }
        });
    },
    accountInfo(cb){
        $.ajax({
            url: Dir + '/account/accountInfo'
        }).done(function (data) {
            cb(data.flag, data.applyProcess, data.account);
        });
    },
    payDeposit(payMethod, cb){
        $.ajax({
            url: Dir + '/pay/payDeposit',
            type: 'post',
            data: {payMethod: payMethod}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    },
    payDepositByBank(issInsCode, cb){
        $.ajax({
            url: Dir + '/pay/payDepositByBank',
            type: 'post',
            data: {issInsCode: issInsCode}
        }).done(function (data) {
            if (data.flag === 1) {
                cb();
            } else {
                alert(data.msg);
            }
        });
    },
    recharge(payMethod, amount, cb){
        $.ajax({
            url: Dir + '/pay/recharge',
            type: 'post',
            data: {payMethod: payMethod, amount: amount}
        }).done(function (data) {
            if (data.flag === 1) {
                cb();
            } else {
                alert(data.msg);
            }
        });
    },
    rechargeByBank(issInsCode, amount, cb){
        $.ajax({
            url: Dir + '/pay/rechargeByBank',
            type: 'post',
            data: {issInsCode: issInsCode, amount: amount}
        }).done(function (data) {
            if (data.flag === 1) {
                cb();
            } else {
                alert(data.msg);
            }
        });
    },
    reportLoss(password, cb){
        $.ajax({
            url: Dir + '/account/reportLoss',
            type: 'post',
            data: {password: password}
        }).done(function (data) {
            if (data.flag === 1) {
                cb();
            } else {
                alert(data.msg);
            }
        });
    },
    coupons(state, areaId, expirationDateBegin, expirationDateEnd, pageNo, pageSize, cb){
        $.ajax({
            url: Dir + '/account/coupons',
            data: {
                state: state,
                areaId: areaId,
                expirationDateBegin: expirationDateBegin,
                expirationDateEnd: expirationDateEnd,
                pageNo: pageNo,
                pageSize: pageSize
            }
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.page);
            } else {
                alert(data.msg);
            }
        });
    },
    isLogin(cb){
        $.ajax({
            url: Dir + '/isLogin/'
        }).done(function (data) {
            cb(data)
        });
    },
    accountProcess(cb){
        $.ajax({
            url:Dir+'/account/accountProcess'
        }).done(function(data){
            cb(data.flag,data.accountProcess)
        })
    }

};

exports['default'] = accountManage;