var React = require('react');
var StationList = React.createClass({
    onClick(event){
        var target=event.target;
        if(target.nodeName==='A'){
            var id=target.getAttribute('data-id');
            var lng=target.getAttribute('data-lng');
            var lat=target.getAttribute('data-lat');
            var map =this.props.baiduMap;
            map.centerAndZoom(new BMap.Point(lng, lat), 17);
            this.props.onChangeID(id);
            this.props.handle(0, 360);
        }
    },

    render() {
        var list = this.props.stationList.map((item)=> {
            return (
                <div className="item" key={item.id}>
                    <dl>
                        <dt>{item.name}</dt>
                        <dd>空闲车辆：{item.rentVehicleNum} 可用桩：{item.idleNum}</dd>
                        <dd><i className="icon-home_position"></i>{item.address}</dd>
                    </dl>
                    <a data-id={item.id} data-lat={item.lat} data-lng={item.lng}>查看详情</a>
                </div>
            )
        });
        return (
            <div className="stationList">
                <div className="title">
                    <strong>{this.props.address}区域</strong>
                </div>
                <div className="list" onClick={this.onClick}>
                    {list}
                </div>
            </div>
        )
    }
});
exports["default"] = StationList;