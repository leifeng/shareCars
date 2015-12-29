var React = require('react');
var baseSelectMixin = require('../ajax/baseSelect.js').default;
var Point = React.createClass({
    mixins: [baseSelectMixin],
    getInitialState(){
        return {
            points: [],
            areaId: this.props.areaId
        }
    },
    componentWillMount(){
        this.areaStationSimple(this.props.areaId, (data)=> {
            this.setState({points: data});
        });
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.areaId != this.state.areaId) {
            this.areaStationSimple(nextProps.areaId, (data)=> {
                this.setState({points: data, areaId: nextProps.areaId});
            });
        }
    },
    render() {
        var height = {
            height: this.props.more ? 'auto' : '40'
        };
        var icon = this.props.more ? 'fa-minus-square-o' : 'fa-plus-square-o';
        var cls;
        var items = this.state.points.map(item=> {
            cls = (item.id === this.props.pointId) ? 'selected' : '';
            return (<a key={item.id} data-id={item.id} href="javascript:;" className={cls}>{item.name}</a>)
        });
        items.unshift(<a key="-1" data-id="" href="javascript:;" className={this.props.pointId?'':'selected'}>不限</a>);
        return (
            <div className="point" style={height}>
                <a className="more">更多<i className={"fa "+icon}></i></a>
                <label>网点：</label>{items}
            </div>
        )
    }
});
exports['default'] = Point;