var React = require('react'),
    baseSelectMixin = require('../ajax/baseSelect.js').default,
    serviceMixin = require('../ajax/service').default,
    PopCb = require('../public/_popCb').default,
    PopY = require('./../public/_popYY').default,
    Cookies = require('cookies-js');
import {  Link } from 'react-router';

var ResultList = React.createClass({
    mixins: [baseSelectMixin, serviceMixin],
    getInitialState(){
        return {
            id: '',
            popHide: true,
            areaId: this.props.areaId,
            startMoney: 0,
            popCbHide: true,
            flag: 1,
            rule: {
                scheduleNum: 0,
                freeNumber: 0,
                freeTime: 0,
                unitTime: 0,
                unitPrice: 0
            }
        }
    },

    componentDidMount(){
        var cookie;
        var areaId = '';
        var list = [];
        if (Cookies('www_evcoming_com_area_code')) {
            cookie = decodeURIComponent(Cookies('www_evcoming_com_area_code'));
            areaId = cookie.split('|')[0];
        }

        if (Cookies('areaList')) {
            list = JSON.parse(decodeURIComponent(Cookies('areaList')));
            areaId = this.state.areaId || list[0].areaCode;
            this.setState({areas: list, areaId: areaId});
            setTimeout(()=> {
                this.priceScheme(this.state.areaId, (data)=> {
                    this.setState({
                        startMoney: data.pickUpTime
                    })
                });
            }, 30);
        }
        else {
            this.rentAreaSimple((data)=> {
                list = data;
                areaId = this.state.areaId || list[0].areaCode;
                this.setState({areas: list, areaId: areaId});
                Cookies.set('areaList', encodeURIComponent(JSON.stringify(data)));
                setTimeout(()=> {
                    this.priceScheme(this.state.areaId, (data)=> {
                        this.setState({
                            startMoney: data.pickUpTime
                        })
                    });
                }, 30);
            });
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.areaId != this.state.areaId) {
            this.setState({   areaId: nextProps.areaId});
            this.priceScheme(nextProps.areaId, (data)=> {
                this.setState({
                    startMoney: data.pickUpTime
                })
            });
        }
    },
    onClick(event){
        var target = event.target;
        if (target.nodeName === 'A'&&target.className.indexOf('disable')===-1) {
            var id = target.getAttribute('data-id');
            this.setState({id: id});
            this.getRule();
        }
    },
    setPopHide(){
        this.setState({popHide: true});
    },
    getRule(){
        this.appointmentRule(this.state.areaId, this.props.categoryId, (flag, data)=> {
            if (flag === 1) {
                this.setState({
                    flag: flag,
                    popCbHide: true,
                    popHide: false,
                    rule: data
                })
            } else {
                this.setState({
                    flag: flag,
                    popCbHide: false
                });
            }
        });
    },
    onClosePopCb(){
        this.setState({popCbHide: true});
    },
    render() {
        var something = '';
        var list = [];

        if (this.props.categoryId - 0 === 1) {
            something = '车';

            list = this.props.resultList.map((item, index)=> {
                var color = item.electricity - 0 >= 20 ? 'green' : 'orange';
                return (
                    <div key={index} className="item">
                        <div>
                            <i className={'icon-home_electricity '+color}>{item.electricity}%</i>
                        </div>
                        <div className="second">
                            <dl>
                                <dt><Link
                                    to={'/carInfo/vin/'+item.vin+'/num/'+item.numberPlate}>{item.numberPlate}</Link>
                                </dt>
                                <dd>续航里程：<span className="orange">{item.mileage}</span>Km</dd>
                                <dd><i className="icon-line_position"></i>{item.address}</dd>
                            </dl>
                        </div>
                        <div className="money">
                            起步时间：<em>{this.state.startMoney}分钟</em>
                        </div>

                        <div className="lastDiv">
                            <a data-id={item.vin} className="yyBtn">预约</a>
                        </div>
                    </div>
                )
            });
        }
        else {

            something = '充电桩';
            list = this.props.resultList.map((item, index) => {
                var color = item.idleNum - 0 > 0 ? 'green' : 'gray';
                var linkState = item.idleNum - 0 > 0 ? '' : 'disable';
                return (
                    <div key={index} className="item">
                        <div>
                            <i className={'icon-home_pile '+color}>{item.idleNum}个</i>
                        </div>
                        <div>
                            <dl>
                                <dt>{item.name}</dt>
                                <dd>共 <span className="orange">{item.pileTotal}</span> 个充电桩</dd>
                                <dd><i className="icon-line_position"></i>{item.address}</dd>
                            </dl>
                        </div>
                        <div className="lastDiv">
                            <a data-id={item.id} className={"yyBtn "+linkState}>预约</a>
                        </div>
                    </div>
                )
            });
        }
        return (
            <div>
                <PopY isHide={this.state.popHide} closeHandle={this.setPopHide} data={this.state.rule}
                      categoryId={this.props.categoryId} id={this.state.id}/>
                <PopCb flag={this.state.flag} popCbHide={this.state.popCbHide} onClosePopCb={this.onClosePopCb}/>

                <div className="resultList">
                    <div className="tip">目前为您找到以下<a>{something}</a></div>
                    <div onClick={this.onClick} className="list">
                        {list}
                    </div>
                </div>
            </div>

        )
    }
});
exports['default'] = ResultList;
