var React = require('react'),
    ReactDom = require('react-dom'),
    MapPanel = require('./mapPanel.js').default,
    Banner = require('./banner.js').default,
    Cookies = require('cookies-js'),
    baseSelect = require('../ajax/baseSelect').default,
    Header = require('../public/header.js').default,
    Footer = require('../public/footer.js').default;
var Index = React.createClass({
    mixins: [baseSelect],
    getInitialState() {
        return {
            areaCode: '',
            address: '',
            userName: '',
            list: []
        }
    },
    componentWillMount() {
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
            this.setState({list: list, address: name, areaCode: code});
        } else {
            this.rentAreaSimple((data)=> {
                list = data;
                code = code || list[0].areaCode;
                name = name || list[0].areaName;
                this.setState({list: data, address: name, areaCode: code});
                Cookies.set('areaList', encodeURIComponent(JSON.stringify(data)), { expires: 1800 });
            });
        }
    },

    changeCode(code, name) {
        this.setState({areaCode: code, address: name});
    },

    changeUserName(name) {
        this.setState({userName: name})
    },

    render() {
        return (
            <div>

                <Header parent={this} index={1} userName={this.state.userName} list={this.state.list}
                        address={this.state.address}/>

                <div className="index">
                    <MapPanel areaCode={this.state.areaCode} address={this.state.address} parent={this}/>
                    <Banner/>
                </div>
                <Footer/>
            </div>
        )
    }
});

ReactDom.render(<Index/>, document.getElementById('main'));
