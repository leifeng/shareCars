var React = require('react');
var userManageMixin = require('../ajax/userManage.js').default;
import { Link} from 'react-router';
var logo = require('../../images/logo.png');
var Login = React.createClass({
    mixins: [userManageMixin],
    getInitialState(){
        return {
            userName: '',
            passWord: '',
            userMsg: '',
            pwdMsg: ''
        }
    },
    componentDidMount(){
        document.onkeydown = (e)=> {
            var event = e || window.event;
            if (event.keyCode === 13) {
                this.onLogin();
                return false;
            }
        }
    },
    componentWillUnmount(){
        document.onkeydown = null;
    },
    onChange(event){
        var newState = {};
        var target = event.target;
        newState[target.name] = target.value;
        this.setState(newState);
    },
    onLogin(){
        this.state.userMsg = '';
        this.state.pwdMsg = '';
        if (this.state.userName === '') {
            this.setState({userMsg: '请输入手机号或用户名'});
            return
        }
        if (this.state.passWord === '') {
            this.setState({pwdMsg: '请输入密码'});
            return
        }
        this.login(this.state.userName, this.state.passWord, function (flag, data) {
            if (flag === 1) {
                var s = location.search;
                if (s.indexOf('cb=')!==-1) {
                    location.href = decodeURIComponent(s.substr(4));
                } else {
                    location.href = 'index.html';
                }
            } else {
                alert(data.msg)
            }
        });
    },
    render() {
        return (
            <div className="login">
                <div className="logo">
                    <img src={logo}/>
                </div>
                <h1>登录</h1>

                <div className="panel">
                    <label>手机号/会员名<i>{this.state.userMsg}</i></label>
                    <input type="text" placeholder="请输入手机号或会员号" value={this.state.userName} onChange={this.onChange}
                           name="userName"/>
                    <label>密码<i>{this.state.pwdMsg}</i></label>
                    <input type="password" value={this.state.passWord} onChange={this.onChange} name="passWord"/>
                    <a className="login-btn" onClick={this.onLogin}>立即登录</a>

                    <div><input type="checkbox"/>自动登录<Link to="/forget/byMobile">忘记密码?</Link></div>
                    <Link to="/reg/mobile" className="reg-btn">免费注册</Link>
                </div>
            </div>
        )
    }
});
exports['default'] = Login;