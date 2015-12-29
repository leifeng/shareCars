var React = require('react'),
    baseSelectMixin = require('../ajax/baseSelect.js').default,
    StationList = require('./stationList.js').default,
    StationInfo = require('./stationInfo.js').default,
    PopY = require('../public/_popYY').default,
    PopCb = require('../public/_popCb').default,
    Login = require('../public/Login').default,
    Map = require('./map.js').default,
    MapSize = require('./mapSize.js').default,
    Tween = require('../public/tween.js').default,
    serviceMixin = require('../ajax/service').default,
    Cookies = require('cookies-js');

var MapPanel = React.createClass({
    mixins: [baseSelectMixin, serviceMixin],
    getInitialState(){
        return {
            stationList: [],
            carList: [],
            vin: '',
            stationId: '',
            popHide: true,
            popCbHide: true,
            loginHide: true,
            flag: 1,
            categoryId: 1,
            areaCode: this.props.areaCode,

            baiduMap: null,
            mapHide: true,

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
        var cookie;
        var areaId = this.state.areaCode;
        if (Cookies('www_evcoming_com_area_code')) {
            cookie = decodeURIComponent(Cookies('www_evcoming_com_area_code'));
            areaId = cookie.split('|')[0];
        }
        this.setState({areaCode: areaId});
        this.mapItems(areaId, (data)=> {
            this.setState({stationList: data.stationList, carList: data.carList});
        });
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.areaCode !== this.state.areaCode) {
            this.mapItems(nextProps.areaCode, (data)=> {
                this.setState({stationList: data.stationList, carList: data.carList, areaCode: nextProps.areaCode});
                this.panel.scrollLeft = 0;
            });
        }
    },
    changeScroll(start, end) {
        var b = start, c = end - start, d = 100, t = 0;
        var time = setInterval(()=> {
            if (t < d) {
                t++;
                this.panel.scrollLeft = Math.ceil(Tween.Quart.easeOut(t, b, c, d));
            } else {
                clearInterval(time);
            }
        }, 10);
    },
    onChangeID(id){
        this.setState({stationId: id});
    },
    setMap(map){
        this.setState({baiduMap: map});
    },
    setMapStation(id){
        this.setState({stationId: id, mapHide: false});
        this.panel.scrollLeft = 360;
    },
    setMapHide(bool){
        this.setState({mapHide: bool});
    },
    setVin(vin){
        this.setState({vin: vin, categoryId: 1});
        this.getRule(1);
    },
    setStationId(id){
        this.setState({stationId: id, categoryId: 2});
        this.getRule(2);
    },
    setPopHide(){
        this.setState({popHide: true});
    },
    onClosePopCb(){
        this.setState({popCbHide: true});
    },
    onClosePopLogin(){
        this.setState({loginHide: true});
    },
    getRule(categoryId){
        this.appointmentRule(this.state.areaCode, categoryId, (flag, data)=> {
            if (flag === 1) {
                this.setState({
                    flag: flag,
                    popCbHide: true,
                    popHide: false,
                    loginHide: true,
                    rule: data
                })
            } else if (flag === -1) {
                this.setState({
                    flag: flag,
                    loginHide: false,
                    popCbHide: true
                });
            } else {
                this.setState({
                    flag: flag,
                    loginHide: true,
                    popCbHide: false
                });
            }
        });
    },
    render() {
        var style = {
            'display': this.state.mapHide ? 'none' : 'block'
        };
        var id = '';
        if (this.state.categoryId == 1) {
            id = this.state.vin;
        } else {
            id = this.state.stationId;
        }
        return (
            <div>
                <div className="mapPanel">
                    <div className="shadow"></div>
                    <div className="searchPanel" ref={(ref)=>{this.panel=ref}} style={style}>
                        <div className="stationPanel-w2">
                            <StationList handle={this.changeScroll} onChangeID={this.onChangeID}
                                         stationList={this.state.stationList} address={this.props.address}
                                         baiduMap={this.state.baiduMap}/>
                            <StationInfo handle={this.changeScroll} stationId={this.state.stationId}
                                         setVin={this.setVin}
                                         setStationId={this.setStationId}/>
                        </div>
                    </div>
                    <Map carList={this.state.carList} stationList={this.state.stationList} address={this.props.address}
                         setMap={this.setMap} setMapStation={this.setMapStation} vinHandle={this.setVin}
                         isHide={this.state.mapHide}/>
                    <MapSize hideHandle={this.setMapHide} hide={this.state.mapHide}/>


                </div>
                <PopY isHide={this.state.popHide} closeHandle={this.setPopHide} data={this.state.rule}
                      categoryId={this.state.categoryId} id={id}/>
                <PopCb flag={this.state.flag} popCbHide={this.state.popCbHide} onClosePopCb={this.onClosePopCb}/>
                <Login loginHide={this.state.loginHide} onClosePopLogin={this.onClosePopLogin} parent={this.props.parent}/>
            </div>

        )
    }
});
exports['default'] = MapPanel;

