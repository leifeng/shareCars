var Dir = require('./dir.js').default;
$.ajaxSetup({
    dataType: "json"
});
var serviceSelect = {
    //我的车辆
    myCar (cb) {
        $.ajax({
            url: Dir + '/my/myCar'
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.myCarList);
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    },
    //我的预约
    appointment(cb){
        $.ajax({
            url: Dir + '/my/appointment'
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.appointmentList);
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    },
    //租赁记录查询
    rentRecord(days, state, rentNum, vin, pageNo, pageSize, cb){
        $.ajax({
            url: Dir + '/my/rentRecord',
            data: {
                days: days,
                state: state,
                rentNum: rentNum,
                vin: vin,
                pageNo: pageNo,
                pageSize: pageSize
            }
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.page);
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    },
    //租赁记录详情
    rentDetail(rentNum, cb){
        $.ajax({
            url: Dir + '/my/rentalDetail',
            data: {rentNum: rentNum}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.rental);
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    },
    //消费记录查询
    consumeRecord(pageNo, pageSize, cb){
        $.ajax({
            url: Dir + '/my/consumeRecord',
            data: {pageNo: pageNo, pageSize: pageSize}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.page);
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    },
    //我的申诉
    appealRecord(pageNo, pageSize, cb){
        $.ajax({
            url: Dir + '/my/appealRecord',
            data: {pageNo: pageNo, pageSize: pageSize}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.page);
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    },
    //积分记录
    integralRecord(pageNo, pageSize, cb){
        $.ajax({
            url: Dir + '/my/integralRecord',
            data: {pageNo: pageNo, pageSize: pageSize}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.page);
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    }
};

exports['default'] = serviceSelect;