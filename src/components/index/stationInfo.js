var React = require('react'),
    baseSelectMixin = require('../ajax/baseSelect.js').default;
var StationInfo = React.createClass({
    mixins: [baseSelectMixin],
    getInitialState(){
        return {
            list: [],
            idleNum: 0,
            pileTotal: 0,
            stationId: '',
            address:'',
            name:''
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.stationId !== this.state.stationId) {
            this.chargingStation(nextProps.stationId, (data)=> {
                this.setState({
                    list: data.carList,
                    idleNum: data.station.idleNum,
                    pileTotal: data.station.pileTotal,
                    stationId: data.station.id,
                    address:data.station.address,
                    name:data.station.name
                });

            });

        }
    },
    onClick(){
        this.props.handle(360, 0);
    },
    onPop(event){
        var target = event.target;
        if (target.nodeName === 'A') {
            let vin = target.getAttribute('data-vin');
            if (vin) {
                this.props.setVin(vin);
            }
            let stationId = target.getAttribute('data-id');
            if (stationId) {
                this.props.setStationId(stationId);
            }
        }

    },
    render() {
        var list = this.state.list.map((item)=> {
            var color = item.electricity - 0 >= 20 ? 'green' : 'orange';
            return (
                <div className="item-car" key={item.vin}>
                    <div>
                        <i className={"icon-home_electricity "+color}>
                            {item.electricity}%
                        </i>
                    </div>
                    <div>
                        <dl>
                            <dt>{item.numberPlate}</dt>
                            <dd>续航里程{item.mileage}km</dd>
                            <dd><a data-vin={item.vin}>预约</a></dd>
                        </dl>
                    </div>
                </div>
            )
        });
        return (
            <div className="stationInfo">
                <div className="title">
                    <a onClick={this.onClick}><i className="fa fa-reply"></i></a>
                    <strong>{this.state.name}</strong>
                    <address><i className="icon-home_position"></i>{this.state.address}</address>
                </div>
                <div className="infoList" onClick={this.onPop}>
                    {list}
                    <div className="item-pile">
                        <div>
                            <i className={"icon-home_pile "+(this.state.idleNum>0?"green":"gray")}>
                                {this.state.idleNum}个
                            </i>
                        </div>
                        <div>
                            <dl>
                                <dt></dt>
                                <dt>共{this.state.pileTotal}个充电桩</dt>
                                <dd><a data-id={this.state.stationId} className={this.state.idleNum===0?"disable":""}>预约</a></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
exports["default"] =StationInfo;