var React = require('react');
var ClassNames = require('classnames');

var SideList = React.createClass({

    onClick(event){
        var target = event.target;
        var node = null;
        if (target.className === 'name') {
            node = target
        } else if (target.parentNode.className === "name") {
            node = target.parentNode;
        }
        if (node) {
            var lat = node.getAttribute('data-lat');
            var lng = node.getAttribute('data-lng');
            var point = new BMap.Point(lng, lat);
            this.props.map.centerAndZoom(point, 17);
        }
    },
    render(){
        var tabClassName1 = ClassNames({
            'icon-network_btn_down1': this.props.tabIndex == 1,
            'icon-network_btn_nor1': this.props.tabIndex == 0
        });
        var tabClassName2 = ClassNames({
            'icon-network_btn_down2': this.props.tabIndex == 0,
            'icon-network_btn_nor2': this.props.tabIndex == 1
        });
        var ul1 = {
            display: this.props.tabIndex == 0 ? 'block' : 'none'
        };
        var ul2 = {
            display: this.props.tabIndex == 1 ? 'block' : 'none'

        };
        var list1 = [], list2 = [];

        list1 = this.props.serviceList.map(function (item) {
            return (
                <li key={item.name}>
                    <div className="name" data-lat={item.lat} data-lng={item.lng}><i
                        className="icon-network_icon3"></i>{item.name}</div>
                    <div>联系方式：{item.tel}</div>
                    <div>地址：{item.address}</div>
                </li>
            )
        });

        list2 = this.props.stationList.map(function (item) {
            return (
                <li key={item.id}>
                    <div className="name" data-lat={item.lat} data-lng={item.lng}><i
                        className="icon-network_icon3"></i>{item.name}</div>
                    <div>桩数量：{item.pileTotal}</div>
                    <div>地址：{item.address}</div>
                </li>
            )
        });

        return (
            <div className="sideList">
                <div className="title" onClick={this.props.setTabIndex}>
                    <a className={tabClassName1} data-index="0"></a>
                    <a className={tabClassName2} data-index="1"></a>
                </div>
                <ul style={ul1} onClick={this.onClick}>
                    {list1}
                </ul>
                <ul style={ul2} onClick={this.onClick}>
                    {list2}
                </ul>
            </div>
        )
    }
});
exports['default'] = SideList;