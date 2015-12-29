var React = require('react');
var popLogin = React.createClass({
    render(){
        var display = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-login">
                    <div className="title">提示</div>
                    <div className="body">
                        登录超时,请重新<a href={"user.html?cb="+encodeURIComponent(location.href)}>登录</a>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default']=popLogin;