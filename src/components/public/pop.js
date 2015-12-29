var React = require('react');
var serviceMixin = require('../ajax/service.js').default;
var baseSelectMixin = require('../ajax/baseSelect.js').default;
var pop = React.createClass({
    mixins: [serviceMixin, baseSelectMixin],
    getInitialState(){
        return {
            t: 0,
            areaId: this.props.areaId,

            carScheduleTimes: 0,
            carScheduleDuration: 0,
            carBaseUnit: 0,
            carBaseUnitPrice: 0,

            pileScheduleTimes: 0,
            pileBaseUnit: 0,
            pileScheduleDuration: 0,
            pileBaseUnitPrice: 0
        }
    },
    componentWillMount(){
        this.priceScheme(this.state.areaId, (data)=> {
            this.setState({
                carScheduleTimes: data.carScheduleTimes,
                carScheduleDuration: data.carScheduleDuration,
                carBaseUnit: data.carBaseUnit,
                carBaseUnitPrice: data.carBaseUnitPrice,

                pileScheduleTimes: data.pileScheduleTimes,
                pileBaseUnit: data.pileBaseUnit,
                pileScheduleDuration: data.pileScheduleDuration,
                pileBaseUnitPrice: data.pileBaseUnitPrice
            })
        });
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.areaId != this.state.areaId) {
            this.setState({areaId: nextProps.areaId});
            this.priceScheme(nextProps.areaId, (data)=> {
                this.setState({
                    carScheduleTimes: data.carScheduleTimes,
                    carScheduleDuration: data.carScheduleDuration,
                    carBaseUnit: data.carBaseUnit,
                    carBaseUnitPrice: data.carBaseUnitPrice,

                    pileScheduleTimes: data.pileScheduleTimes,
                    pileBaseUnit: data.pileBaseUnit,
                    pileScheduleDuration: data.pileScheduleDuration,
                    pileBaseUnitPrice: data.pileBaseUnitPrice
                })
            });
        }
    },
    onChange(event){
        var target = event.target;
        this.setState({t: target.value});
    },
    confirm(){
        if (this.props.typee === 'car') {
            this.appointmentForCar(this.props.id, this.state.t, function (data) {
                alert(data);
            });
        } else {
            this.appointmentForPile(this.props.id, this.state.t, function (data) {
                alert(data);
            });
        }

    },
    render(){
        var style = {
            display: this.props.popHide ? 'none' : 'block'
        }, title, freeTimes, times = 0, freeDuration;

        if (this.props.typee === 'car') {
            title = '预约车';
            freeTimes = this.state.carScheduleTimes;
            freeDuration = this.state.carScheduleDuration;

        } else {
            title = '预约桩';
            freeTimes = this.state.pileScheduleTimes;
            freeDuration = this.state.pileScheduleDuration;
        }
        var money = this.state.t - freeDuration > 0 ? (this.state.t - freeDuration) * 0.5 : 0;
        var height = {
            height: document.body.clientHeight
        };
        return (
            <div style={style}>
                <div className="mask" style={height}></div>
                <div className="pop">
                    <div className="title">{title}<a onClick={this.props.handle}>x</a></div>
                    <div className="body">
                        <dl>
                            <dd>预约时长：<input type="text" value={this.state.t} onChange={this.onChange}/>分钟 <i>{money}</i>元
                            </dd>
                            <dd>当天免费预约次数：{freeTimes}次，剩余次数：{times}次</dd>
                            <dd>免费预约时长：{freeDuration}分钟，超出部分0.5元/分钟</dd>
                        </dl>
                        <a className="cancel" onClick={this.props.handle}>取消</a><a className="ok"
                                                                                   onClick={this.confirm}>确定</a>
                    </div>
                </div>
            </div>

        )
    }
});
exports['default'] = pop;