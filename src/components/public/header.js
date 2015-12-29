var React = require('react');
var baseSelect = require('../ajax/baseSelect.js').default;
var userManageMixix = require('../ajax/userManage').default;
var tool = require('../public/tools').default;
var Cookies = require('cookies-js');
var logo = require('../../images/logo.png');
var Header = React.createClass({
    mixins: [baseSelect, userManageMixix, tool],
    getDefaultProps(){
        return {
            navs: [
                {name: '首页', link: 'index.html', index: 1},
                {name: '在线预约', link: 'yy.html', index: 2},
                {name: '网点分布', link: 'point.html', index: 3},
                {name: '会员中心', link: 'uc.html', index: 4},
                {name: '帮助中心', link: 'help.html', index: 5}
            ]
        }
    },
    getInitialState(){
        return {
            address: '',
            isHide: true,
            list: [],
            userName: '',
            isIndexHide: false
        }
    },
    componentWillMount(){

        if (!this.props.parent) {
            this.setState({isIndexHide: true});
        } else {
            this.setState({list:this.props.list,address: this.props.address});
        }

        if (Cookies('www_evcoming_com_user_name')) {
            this.setState({userName: Cookies('www_evcoming_com_user_name')});
        }
    },
    componentDidMount(){
        if (this.props.parent) {
            this.on(document.body, 'click', (e)=> {
                var event = e || window.event;
                var target = event.target || event.srcElement;
                if (target.nodeName !== 'A') {
                    this.setState({isHide: true})
                }
            });
        }
    },
    componentWillUnmount(){
        document.body.onclick = null;
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.list){
            this.state.list=nextProps.list;
        }
        if (Cookies('www_evcoming_com_user_name')) {
            this.state.userName=Cookies('www_evcoming_com_user_name');
        }
        this.setState({address: nextProps.address});
    },
    onClick(){
        this.setState({isHide: !this.state.isHide})
    },
    onChange(event){
        var target = event.target;
        var code, name;
        if (target.nodeName === 'A') {
            code = target.getAttribute('data-id');
            name = target.innerHTML;
            this.setState({address: name, isHide: true});
            if (this.props.parent) {
                this.props.parent.changeCode(code, name);
            }
        }
    },
    logOut(){
        var href = location.pathname;
        if (href.indexOf('uc.html') !== -1) {
            href = '/zd/index.html';
        }
        this.logout(href, function () {
            setTimeout(function () {
                location.href = href;
            }, 100);
        });
    },
    render() {
        var list = this.state.list.map(function (item) {
            return (<a key={item.areaCode} data-id={item.areaCode}>{item.areaName}</a>)
        });
        var display = {
            display: this.state.isHide ? 'none' : 'block'
        };
        var state = <div className="state"><a
            href={"user.html?cb="+encodeURIComponent(location.pathname+location.hash)}>登录</a> | <a
            href="user.html#/reg/mobile">免费注册</a></div>;

        if (this.state.userName !== '') {
            state = <div className="state"><a href="uc.html">{this.state.userName }</a> | <a href="javascript:;"
                                                                                             onClick={this.logOut}>退出</a>
            </div>;
        }
        var isIndexDisplay = {
            visibility: this.state.isIndexHide ? 'hidden' : 'visible'
        };

        return (
            <div className="header">
                <div className="content">
                    <div className="logo">
                        <a href="index.html"><img src={logo}/></a>
                    </div>

                    <div className="headerSelectDown" style={isIndexDisplay}>
                        <label onClick={this.onClick}>{this.state.address}<i className="fa fa-angle-down"></i></label>

                        <div className="list" style={display} onClick={this.onChange}>
                            {list}
                        </div>
                    </div>

                    <div className="nav">
                        {this.props.navs.map((item)=> {
                            if (this.props.index === item.index) {
                                return <a key={item.index} href={item.link} className="active">{item.name}</a>
                            } else {
                                return <a key={item.index} href={item.link}>{item.name}</a>
                            }

                        })}
                    </div>
                    {state}
                </div>
            </div>
        )
    }
});
exports["default"] = Header;
