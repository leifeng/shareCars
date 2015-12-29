var React = require('react');
var ReactDom = require('react-dom');
var Footer = require('../public/footer.js').default;
var Header = require('../public/header.js').default;
var Search = require('./search.js').default;
var SideList = require('./sideList.js').default;
var Map = require('./map.js').default;
var Cookies = require('cookies-js');
var baseSelect = require('../ajax/baseSelect.js').default;
var Index = React.createClass({
    mixins: [baseSelect],
    getInitialState() {
        return {
            tabIndex: 0,
            stationList: [],
            serviceList: [],
            city:'',
            list:[],
            areaCode:'',
            areaName:'',
            map:null
        }
    },
    componentWillMount(){
        var list = [];
        var code = 0;
        var name = '';
        var cookie = '';

        if (Cookies('www_evcoming_com_area_code')) {
            cookie = decodeURIComponent(Cookies('www_evcoming_com_area_code'));
            code = cookie.split('|')[0];
            name = cookie.split('|')[1];
        }
        if (Cookies('areaList')) {
            list = JSON.parse(decodeURIComponent(Cookies('areaList')));
            code = code || list[0].areaCode;
            name = name || list[0].areaName;
            this.setState({list: list, areaName: name, areaCode: code});
        } else {
            this.rentAreaSimple((data)=> {
                list = data;
                code = code || list[0].areaCode;
                name = name || list[0].areaName;
                this.setState({list: data, areaName: name, areaCode: code});
                Cookies.set('areaList', encodeURIComponent(JSON.stringify(data)), {expires: 1800});
            });
        }
    },
    componentDidMount(){
        this.getData(this.state.areaCode,this.state.areaName,'')
    },
    setTabIndex(event) {
        var target = event.target;
        if (target.nodeName === 'A') {
            var index = target.getAttribute('data-index');
            this.setState({tabIndex: index});
        }

    },

    getData(code,name,str) {
        this.setState({areaCode:code,areaName:name});
        this.siteList(code,str,str, (servicelist, stationlist)=> {
            this.setState({stationList: stationlist, serviceList: servicelist});
        });
    },
    setMap(map){
        this.setState({map: map});
    },
    render() {
        return (
            <div>
                <Header index={3}/>

                <div className="point content">
                    <Search getData={this.getData} list={this.state.list} areaName={this.state.areaName} setCode={this.setCode} areaCode={this.state.areaCode}/>

                    <div className="mapPanel">
                        <SideList tabIndex={this.state.tabIndex} setTabIndex={this.setTabIndex}
                                  stationList={this.state.stationList} serviceList={this.state.serviceList}
                                  map={this.state.map}/>
                        <Map stationList={this.state.stationList} serviceList={this.state.serviceList}
                             setMap={this.setMap}  areaName={this.state.areaName}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
});
ReactDom.render(<Index/>, document.getElementById('main'));