var React = require('react');
var baseSeletMixin = require('../ajax/baseSelect').default;
var Cookies = require('cookies-js');


var popMap = React.createClass({
    mixins: [baseSeletMixin],
    getInitialState(){
        return {
            areas: [],
            list: [],
            areaCode: '',
            areaName: ''
        }
    },
    componentWillMount(){
        if (Cookies('areaList')) {
            let list = JSON.parse(decodeURIComponent(Cookies('areaList')));
            this.setState({areas: list, areaCode: list[0].areaCode, areaName: list[0].areaName});
        }
        else {
            this.rentAreaSimple((data)=> {
                this.setState({areas: data, areaCode: data[0].areaCode, areaName: data[0].areaName});
                Cookies.set('areaList', encodeURIComponent(JSON.stringify(data)), {expires: 1800});
            });
        }
    },
    componentDidMount(){
        var map = new BMap.Map("map");
        this.setState({map: map});
        function openInfo(content, opts, e) {
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            var infoWindow = new BMap.InfoWindow(content, opts);
            map.openInfoWindow(infoWindow, point);
        }

        map.centerAndZoom(this.state.areaName, 11);
        this.timer = setTimeout(()=> {
            clearTimeout(this.timer);
            this.addMarker(this.state.areaCode);
        }, 30);
        $('#map').on('click', (e)=> {
            var id;
            if (e.target.className.indexOf('mapYYBtn') !== -1) {
                id = e.target.getAttribute('data-id');
            }

        });
    },
    componentWillUnmount(){
        clearTimeout(this.timer);
    },
    addMarker(areaCode){
        this.state.map.clearOverlays();
        this.mapItems(areaCode, (data)=> {
            this.state.map.centerAndZoom(this.state.areaName, 11);
            var piles = data.stationList;
            for (var i = 0; i < piles.length; i++) {
                var point = new BMap.Point(piles[i].lng, piles[i].lat);
                var marker = new BMap.Marker(point);
                (function (marker, i, map) {
                    var opts = {
                        width: 250,
                        height: 100,
                        title: piles[i].name,
                        enableMessage: false
                    };
                    var content = "<div>" +
                        "<div>地址：" + piles[i].address + "</div>" +
                        "<div><a class='yyBtn mapYYBtn' data-id='" + piles[i].id + "'>预约</a></div>" +
                        "</div>";

                    marker.addEventListener("click", (e)=> {
                            var p = e.target;
                            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                            var infoWindow = new BMap.InfoWindow(content, opts);
                            map.openInfoWindow(infoWindow, point);
                        }
                    );
                })(marker, i, this.state.map);
                this.state.map.addOverlay(marker);
            }
        });
    },
    onSelect(event){
        var target = event.target;
        var name = '';
        for (var i = 0; i < target.length; i++) {
            var opt = target.options[i];
            if (opt.selected) {
                name = opt.text;
            }
        }
        this.setState({areaCode: target.value, areaName: name});
        this.timer = setTimeout(()=> {
            clearTimeout(this.timer);
            this.addMarker(target.value);
        }, 30);

    },
    render(){
        var display = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-map">
                    <div className="title">选择充电桩<a className="close" onClick={this.props.closeHandle}><i
                        className="fa fa-times"></i></a></div>
                    <div className="body">
                        <select value={this.areaCode} onChange={this.onSelect}>
                            {this.state.areas.map(function (item) {
                                return <option value={item.areaCode} key={item.areaCode}>{item.areaName}</option>
                            })}
                        </select>

                        <div id="map" className="map">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

exports['default'] = popMap;