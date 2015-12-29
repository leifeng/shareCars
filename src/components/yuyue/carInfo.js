var React = require('react');
var Info = require('./info.js').default;
var BBs = require('./bbs.js').default;
import {Link} from 'react-router';
var CarInfo = React.createClass({
    getInitialState(){
        return {
            vin: this.props.params.vin,
            num: this.props.params.num
        }
    },
    render() {
        return (
            <div>
                <div className="carInfo content">
                    <div className="nav"><a href="index.html">首页</a> > <Link to="/appointment">在线预约</Link> > 车</div>
                    <Info vin={this.state.vin} num={this.state.num}/>
                    <BBs vin={this.state.vin}/>
                </div>
            </div>
        )
    }
});
exports['default'] = CarInfo;