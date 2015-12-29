var React = require('react');
var popCb = React.createClass({
    getDefaultProps(){
        return {
            code: {
                '1': '',
                '0': '后台数据错误，请联系管理员',
                '-1': '未登陆或登录超时,请重新',
                '-2': '未开通汽车共享业务，请先'

            }
        }
    },
    getInitialState(){
        return {
            isHide: true
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({isHide: nextProps.popCbHide});
    },
    render(){
        var flag = this.props.flag, url = '', txt = '', display = {}, aHide = {};
        display = {
            display: this.state.isHide ? 'none' : 'block'
        };
        aHide = {
            display: 'inline-block'
        };
        if (flag === -1) {
            url = 'user.html';
            txt = '登录';
        } else if (flag === -2) {
            url = 'openService.html';
            txt = '开通';
        } else if (flag === 0) {
            aHide = {
                display: 'none'
            }
        }

        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-cb">
                    <div className="title">提示<a className="close" onClick={this.props.onClosePopCb}><i className="fa fa-times"></i></a></div>
                    <div className="body">
                        {this.props.code[this.props.flag]}<a
                        href={url+"?cb="+encodeURIComponent(location.href)} style={aHide}>{txt}</a>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = popCb;