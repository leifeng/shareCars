var React = require('react');
var baseSelect = require('../ajax/baseSelect').default;
var serviceMixin = require('../ajax/service').default;
var popCount = React.createClass({
    mixins: [baseSelect, serviceMixin],
    getDefaultProps(){
        return {
            tabs: [{name: '租车', i: 1}, {name: '预约车', i: 2, n: 1}, {name: '预约桩', i: 3, n: 2}]
        }
    },
    getInitialState(){
        return {
            isHide: this.props.isHide,
            minutes: 0,
            type: 1,
            n: 1,
            normalPayAmount: 0,
            consumeTotalAmount: 0,
            consumeGiveAmount: 0,
            consumeAccountAmount: 0,
            consumeGiveMinutes: 0,
            flag: 0,
            rule: {
                scheduleNum: 0,
                freeNumber: 0,
                freeTime: 0,
                unitTime: 0,
                unitPrice: 0
            }
        }
    },
    onChange(event){
        this.setState({minutes: event.target.value});
    },
    getRule(n){
        this.appointmentRule(this.props.areaId, n, (flag, data)=> {
            if (flag === 1) {
                this.setState({
                    flag: flag,
                    rule: data
                });

            } else {
                this.setState({
                    flag: flag
                });
            }
        });
    },
    onClick(event){
        var target = event.target;
        var id = parseInt(target.getAttribute('data-id'));
        var n = parseInt(target.getAttribute('data-n'));
        this.setState({
            type: id,
            minutes: 0,
            n: n,
            normalPayAmount: 0,
            consumeTotalAmount: 0,
            consumeGiveAmount: 0,
            consumeAccountAmount: 0,
            consumeGiveMinutes: 0
        });
        if (n) {
            this.getRule(n);
        }

    },
    countHandle(){
        this.simulationAmount(this.state.minutes, this.state.type, this.props.areaId, this.props.vin, (data)=> {
            this.setState({
                normalPayAmount: data.normalPayAmount,
                consumeTotalAmount: data.consumeTotalAmount,
                consumeGiveAmount: data.consumeGiveAmount,
                consumeAccountAmount: data.consumeAccountAmount,
                consumeGiveMinutes: data.consumeGiveMinutes
            })
        });
    },
    render(){
        var tabs = this.props.tabs.map((item) => {
            if (item.i === this.state.type) {
                return (<a key={item.i} data-id={item.i} data-n={item.n} className="selected">{item.name}</a>)
            } else {
                return (<a key={item.i} data-id={item.i} data-n={item.n}>{item.name}</a>)
            }

        });
        var txt = this.state.type === 1 ? '租车' : '预约';
        var txt2 = '';
        if (this.props.flag === -1) {
            txt2 = '注：由于您未登录，免费预约次数将不会计算在内。'
        } else if (this.props.flag === -2) {
            txt2 = '注：由于您未开通汽车共享业务，免费预约次数将不会计算在内。'
        }
        var display1 = {
            display: this.state.type === 1 ? 'block' : 'none'
        };
        var display2 = {
            display: (this.state.type !== 1 && this.props.flag === 1) ? 'block' : 'none'
        };
        var display3 = {
            display: (this.state.type !== 1 && this.props.flag !== 1) ? 'block' : 'none'
        };
        var freeNumber = this.state.rule.freeNumber - this.state.rule.scheduleNum > 0 ? this.state.rule.freeNumber - this.state.rule.scheduleNum : 0;
        var style = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={style}>
                <div className="mask" style={height}></div>
                <div className="pop pop-count">
                    <div className="title"><a className="close" onClick={this.props.closeCountHandle}><i
                        className="fa fa-times"></i></a></div>
                    <div className="body">
                        <div className="tab" onClick={this.onClick}>
                            {tabs}
                        </div>
                        <div>
                            <ul>
                                <li>车牌号：{this.props.numberPlate}</li>
                                <li>{txt}时长：<input type="text" value={this.state.minutes} onChange={this.onChange}/>分钟<a
                                    onClick={this.countHandle} className="count">计算</a></li>
                            </ul>
                            <ul>
                                <li>
                                    消费总金额：<em>{this.state.consumeTotalAmount}</em>应付金额：<em>{this.state.normalPayAmount}</em>
                                </li>
                                <li>扣账户金额：<em>{this.state.consumeAccountAmount}</em>
                                    扣代金券金额：<em>{this.state.consumeGiveAmount}</em></li>

                                <li style={display1}>扣代时券时长：<em>{this.state.consumeGiveMinutes}</em></li>
                                <li style={display1}>注：此计算结果仅以当前时间进行推算，受价格变化、优惠活动、优惠券、异常还车等因素的影响，实际费用会有不同。<br/>如未登录，代金券和代时券将不会计算在内。
                                </li>

                                <li style={display2}>当天免费预约次数：{this.state.rule.freeNumber}，剩余次数：{freeNumber}</li>
                                <li style={display2}>免费预约时长：{this.state.rule.freeTime}分钟，超出部分{this.state.rule.unitPrice}元/{this.state.rule.unitTime}分钟</li>
                                <li style={display3}>{txt2}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = popCount;