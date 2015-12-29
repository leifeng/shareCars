var React = require('react');
var Cookies = require('cookies-js');
var baseSelect = require('../ajax/baseSelect').default;
var areaCard = React.createClass({
    mixins: [baseSelect],
    getInitialState(){
        return {
            areaIndex: 0,
            areas: []
        }
    },
    componentWillMount(){
        if (Cookies('areaList')) {
            var areas = JSON.parse(decodeURIComponent(Cookies('areaList')));
            this.setState({areas: areas});
            this.props.setAreaCode(areas[0].areaCode);
        } else {
            this.rentAreaSimple((data)=> {
                this.setState({areas: data});
                Cookies.set('areaList', encodeURIComponent(JSON.stringify(data)));
                this.props.setAreaCode(data[0].areaCode);
            });
        }

    },
    onClick(event){
        var target = event.target;
        var node = null;
        var parent = target.parentNode;
        if (target.className.indexOf('item') !== -1) {
            node = target;
        } else if (parent.className.indexOf('item') !== -1) {
            node = parent;
        } else if (parent.parentNode.className.indexOf('item') !== -1) {
            node = parent.parentNode;
        }
        if (node) {
            var index = node.getAttribute('data-index');
            var code = node.getAttribute('data-code');
            this.setState({areaIndex: parseInt(index)});
            this.props.setAreaCode(code);
        }
    },
    render(){
        var list = this.state.areas.map((item, index)=> {
            if (index === this.state.areaIndex) {
                return (
                    <div className="item icon-network_bg_down" data-code={item.areaCode} data-index={index} key={index}>
                        <div className="nothing"><i className="icon-network_icon4"></i>{item.areaName}汽车共享</div>

                    </div>
                )
            } else {
                return (
                    <div className="item icon-network_bg_nor" data-code={item.areaCode} data-index={index} key={index}>
                        <div className="nothing"><i className="icon-network_icon4"></i>{item.areaName}汽车共享</div>

                    </div>
                )
            }

        });
        return (
            <div className="card" onClick={this.onClick}>
                {list}
            </div>
        )
    }
});
exports['default'] = areaCard;