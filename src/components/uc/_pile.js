var React = require('react');
class Pile extends React.Component {
    render() {
        return (
            <div className="pileItem">
                <div>
                    <i className="icon-pile"></i>
                </div>
                <div>
                    <dl>
                        <dt>{this.props.data.stationName}</dt>
                        <dd>您预约的是<span className="orange">{this.props.data.pileInSerialNum}</span>号桩</dd>
                        <dd><i className="icon-position"></i>{this.props.data.address}</dd>
                    </dl>
                </div>
                <div className="btns">
                    <a className="qx" data-id={this.props.data.id} data-type="pile">取消预约</a>
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
exports['default']= Pile;