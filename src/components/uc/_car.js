var React = require('react');
class Car extends React.Component {
    render() {
        return (
            <div className="carItem">
                <div>
                    <i className={"icon-electricity "+(this.props.data.currentSOC>20?"green":"orange")}>{this.props.data.currentSOC}%</i>
                </div>
                <div>
                    <dl>
                        <dt>{this.props.data.numberPlate}</dt>
                        <dd>续航里程：<span className="orange">{this.props.data.currentMileage}</span>km</dd>
                        <dd><i className="icon-position"></i>{this.props.data.startStation}</dd>
                    </dl>
                </div>
                <div className="btns">
                    <a className="yy" href="index.html">预约充电桩</a>
                    <a className="rc" data-id={this.props.data.rentNum}>还车</a>
                </div>
                <div className="state">
                    <dl>
                        <dt>已租</dt>
                        <dd>&nbsp;</dd>
                        <dd>起租时间：{this.props.data.startTime}</dd>
                    </dl>
                </div>
            </div>
        )
    }
}
exports['default'] = Car;