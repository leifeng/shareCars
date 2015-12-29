var Dir = require('./dir.js').default;
$.ajaxSetup({
    dataType: "json"
});

var service = {
    appointmentForCar(vin, scheduleTime, cb){
        $.ajax({
            url: Dir + '/share/appointmentForCar',
            type: 'put',
            data: {vin: vin, scheduleTime: scheduleTime}
        }).done(function (data) {
            cb(data);
        });
    },
    appointmentForCarDelete(appId, cb){
        $.ajax({
            url: Dir + '/share/appointmentForCar',
            type: 'delete',
            data: {appId: appId}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    },
    appointmentForPile(stationId, scheduleTime, cb){
        $.ajax({
            url: Dir + '/share/appointmentForPile',
            type: 'put',
            data: {stationId: stationId, scheduleTime: scheduleTime}
        }).done(function (data) {
            cb(data);
        });
    },
    appointmentForPileDelete(appId, cb){
        $.ajax({
            url: Dir + '/share/appointmentForPile',
            type: 'delete',
            data: {appId: appId}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    },
    returnCar(rentNum, cb){
        $.ajax({
            url: Dir + '/share/returnCar',
            type: 'post',
            data: {rentNum: rentNum}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    },
    appointmentRule(areaId, typee, cb){
        $.ajax({
            url: Dir + '/share/appointmentRule',
            data: {areaId: areaId, type: typee}
        }).done(function (data) {
            cb(data.flag, data.rule);
        });
    },
    rentCarDirectly(vin, cb){
        $.ajax({
            url: Dir + '/share/rentCarDirectly',
            data: {vin: vin}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    },
    operateDoorRemotely(rentNum, isOpenOrClose, cb){
        $.ajax({
            url: Dir + '/share/operateDoorRemotely',
            data: {rentNum: rentNum, isOpenOrClose: isOpenOrClose}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else {
                alert(data.msg);
            }
        });
    }
};
exports['default'] = service;