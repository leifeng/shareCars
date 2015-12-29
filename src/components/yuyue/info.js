var React = require('react');
var baseSelectMixin = require('../ajax/baseSelect.js').default;
var serviceMixin = require('../ajax/service').default;
var PopYY = require('../public/_popYY.js').default;
var PopCount = require('../public/_popCount').default;
var PopCb = require('../public/_popCb').default;

var PriceType = React.createClass({
    getDefaultProps(){
        return {
            priceLimitList: {
                1: '分钟',
                2: '小时',
                3: '天'
            }
        }
    },
    getInitialState(){
        return {
            priceScheme: null
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.priceScheme) {
            this.setState({priceScheme: nextProps.priceScheme})
        }
    },
    render(){
        var txt = null;
        if (this.state.priceScheme) {
            let priceScheme = this.state.priceScheme;
            let rentPriceRuleList = priceScheme.rentPriceRuleList;
            let intervalPriceList = priceScheme.intervalPriceList;
            let rentPriceRuleList_ = [];
            let intervalPriceList_ = [];
            //封顶价
            let priceLimitList = priceScheme.priceLimitList.map((item, index)=> {
                return <li
                    key={index}>{item.limitValue} {this.props.priceLimitList[item.unitType]}封顶价{item.limitPrice}元</li>
            });
            if (priceScheme.priceType === 1) {
                if (priceScheme.rentPriceRuleList.length === 1) {
                    //1小时内 单阶梯价
                    txt = <ul className="priceList">
                        <li>单价：{priceScheme.carBaseUnitPrice}/分钟</li>
                        <li>封顶价：
                            <ul>
                                {priceLimitList}
                            </ul>
                        </li>
                    </ul>
                }
                else {
                    //1小时内 多阶梯价
                    for (let i = 0; i < rentPriceRuleList.length; i++) {
                        if (i === 0) {
                            rentPriceRuleList_.push(
                                <div key={i}>0-{rentPriceRuleList[i].unitTime}分钟段{rentPriceRuleList[i].unitPrice}元/分钟</div>
                            );
                        } else {
                            rentPriceRuleList_.push(
                                <div key={i}>{rentPriceRuleList[i - 1].unitTime}-{rentPriceRuleList[i].unitTime}分钟段{rentPriceRuleList[i].unitPrice}元/分钟</div>
                            );
                        }

                    }

                    txt = <ul className="priceList">
                        <li>1小时内阶梯价：{rentPriceRuleList_}</li>
                        <li>封顶价：
                            <ul>
                                {priceLimitList}
                            </ul>
                        </li>
                    </ul>
                }
            } else {
                for(let i=0;i<intervalPriceList.length;i++){
                    if(intervalPriceList[i].stepPriceList.length===1){
                        intervalPriceList_.push(<li  key={i}>{intervalPriceList[i].startTime}至{intervalPriceList[i].endTime}&nbsp;&nbsp;&nbsp;&nbsp; 单价：{intervalPriceList[i].stepPriceList[0].unitPrice}元/分钟 </li>)
                    }else{
                        let temp = [];
                        for (let x = 0; x < intervalPriceList[i].stepPriceList.length; x++) {
                            if (x === 0) {
                                temp.push(
                                    <span
                                        key={x}>0-{intervalPriceList[i].stepPriceList[x].unitTime}分钟段{intervalPriceList[i].stepPriceList[x].unitPrice}元/分钟</span>);

                            } else {
                                temp.push(
                                    <span
                                        key={x}>，{intervalPriceList[i].stepPriceList[x - 1].unitTime}-{intervalPriceList[i].stepPriceList[x].unitTime}分钟段{intervalPriceList[i].stepPriceList[x].unitPrice}元/分钟</span>);
                            }
                        }
                        intervalPriceList_.push(<li key={i}>{intervalPriceList[i].startTime}至{intervalPriceList[i].endTime} {temp}</li>)
                    }
                }
                txt = <ul className="priceList">
                    {intervalPriceList_}
                    <li>封顶价：
                        <ul>
                            {priceLimitList}
                        </ul>
                    </li>
                </ul>
            }
        }
        return (
            <div>
                计费规则说明：
                {txt}
            </div>
        )
    }
});


var Info = React.createClass({
    mixins: [baseSelectMixin, serviceMixin],
    getInitialState(){
        return {
            numberPlate: '',
            img: 'http://10.10.11.108/zd/react/images/line_tu.png',
            electricity: 0,
            mileage: 0,
            registerDate: '',
            baiduLng: 0,
            baiduLat: 0,
            address: '',
            pickUpTime: 0,
            popYYHide: true,
            popCbHide: true,
            popCountHide: true,
            infoPanelIsHide: true,
            priceScheme: null,
            flag: 1,
            vin: '',
            areaId: '',
            rule: {
                scheduleNum: 0,
                freeNumber: 0,
                freeTime: 0,
                unitTime: 0,
                unitPrice: 0
            }
        }
    },
    componentWillMount(){
        this.carDetail(this.props.vin, this.props.num, (car)=> {
            this.priceScheme(car.areaId, (data)=> {
                this.setState({
                    priceScheme: data,
                    numberPlate: car.numberPlate,
                    img: 'http://10.10.11.108/zd/react/images/line_tu.png',
                    electricity: car.electricity,
                    mileage: car.mileage,
                    baiduLng: car.baiduLng,
                    baiduLat: car.baiduLat,
                    address: car.address,
                    areaId: car.areaId,
                    vin: car.vin,
                    pickUpTime: data.pickUpTime,
                    registerDate: car.registerDate
                });
            });

        });

    },

    onClick(event){
        var target = event.target;
        if (target.className === 'yyBtn') {
            this.getRule(()=> {
                this.setState({popYYHide: false});
            });
        } else if (target.className === 'zc') {
            this.setState({popCountHide: false});
        }
    },
    getRule(cb){
        this.appointmentRule(this.state.areaId, 1, (flag, data)=> {
            if (flag === 1) {
                this.setState({
                    flag: flag,
                    popCbHide: true,
                    rule: data
                });
                cb();
            } else {
                this.setState({
                    flag: flag,
                    popCbHide: false
                });
            }
        });
    },
    closeYYHandle(){
        this.setState({popYYHide: true});
    },
    closeCBHandle(){
        this.setState({popCbHide: true});
    },
    closeCountHandle(){
        this.setState({popCountHide: true});
    },
    onMouseEnter(){
        this.setState({infoPanelIsHide: false})
    },
    onMouseLeave(){
        this.setState({infoPanelIsHide: true})
    },
    render() {
        var display = {
            display: this.state.infoPanelIsHide ? 'none' : 'block'
        };
        return (
            <div>
                <PopYY isHide={this.state.popYYHide} closeHandle={this.closeYYHandle} data={this.state.rule}
                       categoryId={1} id={this.state.vin}/>
                <PopCb flag={this.state.flag} popCbHide={this.state.popCbHide} onClosePopCb={this.closeCBHandle}/>
                <PopCount flag={this.state.flag} isHide={this.state.popCountHide} numberPlate={this.state.numberPlate}
                          closeCountHandle={this.closeCountHandle} areaId={this.state.areaId} vin={this.state.vin}/>

                <div className="info">
                    <div className="carImg icon-line_tu"></div>
                    <div className="detail">
                        <ul>
                            <li className="numberPlate">{this.state.numberPlate}<em
                                className="hour">起步时间：{this.state.pickUpTime}分钟</em></li>
                            <li className="electricity">电量：<em>{this.state.electricity}%</em></li>
                            <li className="mileage">续航里程：<em>{this.state.mileage}km</em></li>
                            <li className="map"><img width="466" height="216"
                                                     src={"http://api.map.baidu.com/staticimage?width=466&height=216&zoom=14&markerStyles=-1,http://10.10.11.108/zd/react/images/line_icon.png,-1,23,25&markers="+this.state.baiduLng+","+this.state.baiduLat}/>

                                <div><i className="icon-line_position"></i>{this.state.address}</div>
                            </li>
                            <li onClick={this.onClick}>
                                <a className="zc">租车计算<i className="icon-info" onMouseEnter={this.onMouseEnter}
                                                         onMouseLeave={this.onMouseLeave}></i>

                                    <div className="showInfoPanel" style={display}>
                                        <div className="info-title">租车价格说明</div>
                                        <div className="info-body">
                                            <PriceType priceScheme={this.state.priceScheme}/>
                                        </div>
                                        <div className="info-footer"></div>
                                    </div>
                                </a>
                                <a className="yyBtn">预约</a></li>
                        </ul>
                    </div>
                </div>
                <div className="configure">
                    <div className="title">车辆配置</div>
                    <div>
                        <ul className="config">
                            <li><i className="icon-line_icon1"></i>自动挡</li>
                            <li><i className="icon-line_icon2"></i>自助取车</li>
                            <li><i className="icon-line_icon3"></i>最高车速80Km</li>
                            <li><i className="icon-line_icon4"></i>{this.state.registerDate}上线</li>
                            <li><i className="icon-line_icon5"></i>有导航仪</li>
                            <li><i className="icon-line_icon6"></i>180Km续航里程</li>
                            <li><i className="icon-line_icon7"></i>2人座</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = Info;