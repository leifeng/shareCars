var React = require('react');

var map = React.createClass({
    getInitialState(){
        return{
            areaName:this.props.areaName
        }
    },
    componentDidMount(){
        var map = this._map = new BMap.Map("map");
        map.centerAndZoom(this.state.areaName, 11);
        map.enableScrollWheelZoom(true);
        this.props.setMap(map);
    },
    setMarker(nextProps){
        var i = 0, n = 0, pt, myIcon, marker;
        for (i = 0, n = nextProps.stationList.length; i < n; i++) {
            pt = new BMap.Point(nextProps.stationList[i].lng, nextProps.stationList[i].lat);
            myIcon = new BMap.Icon("./images/network_icon2.png", new BMap.Size(40, 54));
            marker = new BMap.Marker(pt, {icon: myIcon});
            this._map.addOverlay(marker);
        }

        for (i = 0, n = nextProps.serviceList.length; i < n; i++) {
            pt = new BMap.Point(nextProps.serviceList[i].lng, nextProps.serviceList[i].lat);
            myIcon = new BMap.Icon("./images/network_icon1.png", new BMap.Size(40, 54));
            marker = new BMap.Marker(pt, {icon: myIcon});
            this._map.addOverlay(marker);
        }

    },
    componentWillReceiveProps(nextProps){
        if(nextProps.areaName!==this.state.areaName){
            this.setState({areaName:nextProps.areaName});
            this._map.centerAndZoom(nextProps.areaName,11);
        }
        if (nextProps.stationList.length !== 0 || nextProps.serviceList.length !== 0) {
            this.setMarker(nextProps);
        }
    },
    render(){
        return (
            <div className="map" id="map">

            </div>
        )
    }
});
exports['default'] = map;