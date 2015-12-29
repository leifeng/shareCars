var React = require('react'),
    MapLib = require('../public/mapLib.js').default;
var Map = React.createClass({
    getInitialState() {
        return {
            carId: '',
            stationId: '',
            address: this.props.address
        }
    },
    componentDidMount() {
        var map = this.baiduMap = new BMap.Map("map");
        map.centerAndZoom(this.state.address, 9);
        this.props.setMap(map);
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.address !== this.state.address) {
            this.setState({address: nextProps.address});
            this.baiduMap.centerAndZoom(nextProps.address, 9);
        }

        this.baiduMap.clearOverlays();
        if (nextProps.carList.length !== 0) {
            for (var i = 0, n = nextProps.carList.length; i < n; i++) {
                var carOverlay = MapLib.carMap(new BMap.Point(nextProps.carList[i].baiduLng, nextProps.carList[i].baiduLat), nextProps.carList[i].electricity + '%', nextProps.carList[i].numberPlate, nextProps.carList[i].mileage, nextProps.carList[i].vin, function (vin) {
                    nextProps.vinHandle(vin);
                });
                this.baiduMap.addOverlay(carOverlay);
            }
        }
        if (nextProps.stationList.length !== 0) {
            for (var x = 0, y = nextProps.stationList.length; x < y; x++) {
                var stationOverlay = MapLib.stationMap(nextProps.stationList[x].id, new BMap.Point(nextProps.stationList[x].lng, nextProps.stationList[x].lat), nextProps.stationList[x].rentVehicleNum, nextProps.stationList[x].idleNum, function (id) {
                    nextProps.setMapStation(id);
                });
                this.baiduMap.addOverlay(stationOverlay);
            }
        }
    },

    render() {
        var docHeight = document.documentElement.clientHeight;
        var style = {
            height: this.props.isHide ? '480px' : (docHeight < 680 ? 680 : docHeight) + 'px'
        };
        return (
            <div className="map" id="map" style={style}>
            </div>
        )
    }
});
exports["default"] = Map;