var React = require('react'),
    StationList = require('./stationList.js').default,
    StationInfo = require('./stationInfo.js').default,
    Map = require('./map.js').default,
    MapSize = require('./mapSize.js').default,
    Tween = require('../public/tween.js').default;
var SearchPanel = React.createClass({
    getInitialState(){
        return {
            stationId: '',
            baiduMap: null,
            mapHide: true,
            areaCode: this.props.areaCode
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.areaCode !== this.state.areaCode) {
            this.setState({areaCode: nextProps.areaCode});
            this.panel.scrollLeft = 0;
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
    setMapHide(bool){
        this.setState({mapHide: bool});
    },
    render() {
        var style = {
            'display': this.state.mapHide ? 'none' : 'block'
        };
        return (
            <div>
                <div className="searchPanel" ref={(ref)=>{this.panel=ref}} style={style}>
                    <div className="stationPanel-w2">
                        <StationList handle={this.changeScroll} onChangeID={this.onChangeID}
                                     stationList={this.props.stationList} address={this.props.address}
                                     baiduMap={this.state.baiduMap}/>
                        <StationInfo handle={this.changeScroll} stationId={this.state.stationId}
                                     setVin={this.props.setVin}
                                     setStationId={this.props.setStationId}/>
                    </div>
                </div>
                <Map carList={this.props.carList} stationList={this.props.stationList} address={this.props.address}
                     setMap={this.setMap} hideHandle={this.setMapHide} vinHandle={this.props.setVin}
                     isHide={this.state.mapHide}/>
                <MapSize hideHandle={this.setMapHide} hide={this.state.mapHide}/>
            </div>
        )
    }
});
exports["default"] = SearchPanel;