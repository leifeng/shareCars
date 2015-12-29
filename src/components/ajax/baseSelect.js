var Dir =require('./dir.js').default;
$.ajaxSetup({
    dataType: "json"
});

var baseSelect = {
    rentArea(cb){
        $.ajax({
            url: Dir + '/rentArea'
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.areaList);
            } else {
                alert(data.msg);
            }
        });
    },
    rentAreaSimple(cb){
        $.ajax({
            url: Dir + '/rentArea/simple'
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.areaList);
            } else {
                alert(data.msg);
            }
        });
    },
    areaStation(areaCode, cb){
        $.ajax({
            url: Dir + '/areaStation',
            data: {areaCode: areaCode}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.stationList);
            } else {
                alert(data.msg);
            }
        });
    },
    areaStationSimple(areaCode, cb){
        $.ajax({
            url: Dir + '/areaStation/simple',
            data: {areaCode: areaCode}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.stationList);
            } else {
                alert(data.msg);
            }
        });
    },
    appointmentTime(type, cb){
        $.ajax({
            url: Dir + '/appointmentTime',
            data: {type: type}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.appointmentTimeList);
            } else {
                alert(data.msg);
            }
        });

    },
    mapItems(areaCode, cb){
        $.ajax({
            url: Dir + '/mapItems',
            data: {areaCode: areaCode}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data);
            } else {
                alert(data.msg);
            }
        });
    },
    chargingStation(stationId, cb){
        $.ajax({
            url: Dir + '/chargingStation',
            data: {stationId: stationId}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data);
            } else {
                alert(data.msg);
            }
        });
    },
    appointmentItems(type, areaCode, stationId, pageNo, pageSize, cb){
        $.ajax({
            url: Dir + '/appointmentItems',
            data: {
                type: type,
                areaCode: areaCode,
                stationId: stationId,
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
    siteList(areaCode,name,address,cb){
        $.ajax({
            url: Dir + '/siteList',
            data: {areaCode: areaCode,name:name,address:address}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.cardStationList,data.chargingStationList);
            } else {
                alert(data.msg);
            }
        });
    },
    serviceCall(cb){

        $.ajax({
            url: Dir + '/serviceCall'
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.callList);
            } else {
                alert(data.msg);
            }
        });
    },
    carDetail(vin, numberPlate, cb){

        $.ajax({
            url: Dir + '/carDetail',
            data: {vin: vin, numberPlate: numberPlate}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.car);
            } else {
                alert(data.msg);
            }
        });
    },
    comment(vin, pageNo, pageSize, cb){

        $.ajax({
            url: Dir + '/comment',
            data: {vin: vin, pageNo: pageNo, pageSize: pageSize}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.record);
            } else {
                alert(data.msg);
            }
        });

    },
    priceScheme(areaId, cb){
        $.ajax({
            url: Dir + '/priceScheme',
            data: {areaId: areaId}
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.scheme);
            } else {
                alert(data.msg);
            }
        });
    },
    simulationAmount(minutes, type, areaCode, vin, cb){
        $.ajax({
            url: Dir + '/simulationAmount',
            data: {
                minutes: minutes,
                type: type,
                areaCode: areaCode,
                vin: vin
            }
        }).done(function (data) {
            if (data.flag === 1) {
                cb(data.simulation);
            } else {
                alert(data.msg);
            }
        });
    }

};
exports['default']= baseSelect;