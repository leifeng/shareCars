var React = require('react');
class CarAppointment extends React.Component {
    render() {
        return (
            <div className="carItem">
                <div>
                    <i className={"icon-electricity "+(this.props.data.electricity>20?"green":"orange")}>{this.props.data.electricity}%</i>
                </div>
                <div>
                    <dl>
                        <dt>{this.props.data.numberPlate}</dt>
                        <dd>续航里程：<span className="orange">{this.props.data.mileage}</span>km</dd>
                        <dd><i className="icon-position"></i>{this.props.data.address}</dd>
                    </dl>
                </div>
                <div className="btns">
                    <a className="qx" data-id={this.props.data.id} data-type="car">取消预约</a>
                </div>
                <div className="state">
                    <dl>
                        <dt>已预约</dt>
                        <dd>&nbsp;</dd>
                        <dd>截至时间：{this.props.data.endTime}</dd>
                    </dl>
                </div>
            </div>
        )
    }
}
exports['default'] = CarAppointment;