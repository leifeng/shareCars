var mapLib = {
    carMap: function (point, electricity, numberPlate, mileage, vin, cb) {
        return new carOverlay(point, electricity, numberPlate, mileage, vin, cb);
    },
    stationMap: function (id, point, carnum, stationnum, cb) {
        return new stationOverlay(id, point, carnum, stationnum, cb);
    }
};

function clearInfoWindow(){
    $(".carPop" ).each(function( index,item ) {
            $(item).hide();
    });
}
function carPopDom(electricity, numberPlate, mileage, vin, cb) {
    var div = document.createElement('div');
    div.className = "carPop icon-home_popup";
    div.innerHTML = '<div><i class="icon-home_electricity">' + electricity + '</i>' +
        '</div><div><dl>' +
        '<dt>' + numberPlate + '</dt>' +
        '<dd>续航里程' + mileage + 'km</dd>' +
        '<dd><a data-vin=' + vin + '>预约</a></dd>' +
        '</dl></div>';
    div.onclick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName === 'A') {
            cb(target.getAttribute('data-vin'));
        }
    };
    return div;
}
function carOverlay(point, electricity, numberPlate, mileage, vin, cb) {
    this._point = point;
    this._electricity = electricity;
    this._numberPlate = numberPlate;
    this._mileage = mileage;
    this._vin = vin;
    this._cb = cb;
}
carOverlay.prototype = new BMap.Overlay();
carOverlay.prototype.initialize = function (map) {
    var mp = this._map = map;
    var pop = carPopDom(this._electricity, this._numberPlate, this._mileage, this._vin, this._cb);
    var a = this._a = document.createElement("a");
    a.appendChild(pop);
    a.className = 'carIcon';
    var span = document.createElement('span');
    span.innerHTML = this._electricity;
    a.appendChild(span);
    a.onclick = function () {
        clearInfoWindow();
        pop.style.display = 'block';
    };

    mp.getPanes().labelPane.appendChild(a);
    return a;
};
carOverlay.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._a.style.left = pixel.x + "px";
    this._a.style.top = pixel.y - 30 + "px";
};


function stationOverlay(id, point, carnum, stationnum, cb) {
    this._id = id;
    this._point = point;
    this._carnum = carnum;
    this._stationnum = stationnum;
    this._cb = cb;
}
stationOverlay.prototype = new BMap.Overlay();
stationOverlay.prototype.initialize = function (map) {
    var mp = this._map = map;
    var id = this._id;
    var a = this._a = document.createElement("a");
    var cb = this._cb;
    a.className = 'stationIcon';
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    a.appendChild(span1);
    a.appendChild(span2);
    span1.innerHTML = this._carnum;
    span2.innerHTML = this._stationnum;

    a.onclick = function () {
        cb(id);
    };

    mp.getPanes().labelPane.appendChild(a);
    return a;

};
stationOverlay.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._a.style.left = pixel.x + "px";
    this._a.style.top = pixel.y - 30 + "px";
};
exports['default'] = mapLib;